
import { _decorator, Component, Prefab, instantiate, SpriteFrame, Node, Layout,
        UITransform, Sprite, Button, EventHandler, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GridGenerate')
export class GridGenerate extends Component {
    @property({type: Prefab})
    private HorizontalLine: Prefab = null;
    @property({type: Prefab})
    private VerticalLine: Prefab = null; 
    @property({type: SpriteFrame})
    private Player1: SpriteFrame = null; //Player1 tương ứng với X
    @property({type: SpriteFrame})
    private Player2: SpriteFrame = null; //Player2 tương ứng với O
    @property({type: Node})
    private MainMenu: Node = null; // Menu lúc bắt đầu game
    @property({type: Node})
    private PauseMenu: Node = null; // Menu khi end game (có người chơi dành chiến thắng)
    @property({type: Node})
    private UIContainer: Node = null;// Giao diện game khi chơi
    @property({type: Node})
    private HorizontalLinesList: Node = null;// Dùng để chứa các đường nằm ngang của game
    @property({type: Node})
    private VerticalLinesList: Node = null;// Dùng để chứa các đường nằm dọc của game
    @property({type: Node})
    private TableCellsList: Node = null;// Dùng để chứa các ô cờ của game
    @property({type: Node})
    private MessageGameLabel: Node = null;// Dùng để thông báo lượt đi của người chơi
    @property({type: Node})
    private PauseMenuLabel: Node = null;// Dùng để thông báo người thắng khi game end
    @property({type: Node})
    private PlayGameButton: Node[] = [];
    @property({type: Node})
    private BackToMenuButton: Node = null;

    ValueCellsList:number[][] = [];// lưu giá trị của các ô trong bàn cờ, dùng để check game end, có 3 giá trị là 0,1,2 mặc định là 0, 1 là của player1, 2 là của player2
    isPlayer1Turn:boolean = true;// dùng để kiểm tra là turn của player 1 hay 2
    rows:number = 20;// số dòng của bàn cờ
    columns:number = 20;// số cột của bàn cờ
    
    onLoad () {
        this.createGame(this.rows, this.columns);

        // thêm click handle vào các button play game
        this.PlayGameButton.forEach((each) => {
            each.getComponent(Button)?.node.on('click', this.playGameClick);
        })

        // thêm click handle vào button back to menu
        this.BackToMenuButton.getComponent(Button)?.node.on('click', this.backToMenuClick);
    }

    start () {
        this.startGame();
    }

    backToMenuClick = () => {
        // dùng để ẩn hoặc hiện các menu
        this.PauseMenu.active = false;
        this.UIContainer.active = false;
        this.MainMenu.active = true;
    }

    playGameClick = () => {
        this.startGame();

        // mặc định là player1 đi trước
        this.isPlayer1Turn = true;
        this.MessageGameLabel.getComponent(Label)!.string = "This is Player 1 turn";
        
        // dùng để ẩn hoặc hiện các menu
        this.PauseMenu.active = false;
        this.UIContainer.active = true;
        this.MainMenu.active = false;
    }

    // hàm này dùng để khởi tạo giá trị cho các node, tạo các dòng và cột cho bàn cờ 
    createGame = (rows: number, columns: number) => {
        //width và height là kích thước của bàn cờ, mặc định là 600 và 600
        const width = this.TableCellsList.getComponent(UITransform)?.contentSize.width;
        const height = this.TableCellsList.getComponent(UITransform)?.contentSize.height;

        if (height !== undefined && width !== undefined ) {
            //chỉnh cellSize cho ô cờ tương ứng với kích thước của bàn cờ
            this.TableCellsList.getComponent(Layout)!.resizeMode = Layout.ResizeMode.CHILDREN;
            this.TableCellsList.getComponent(Layout)!.cellSize.set(width/columns - 6, height/rows - 6);
            this.TableCellsList.getComponent(Layout)!.updateLayout();

            //chỉnh spacing cho các đường nằm ngang và dọc trong bàn cờ
            this.HorizontalLinesList.getComponent(Layout)!.spacingY = height/rows - 2;
            this.HorizontalLinesList.getComponent(Layout)!.updateLayout();

            this.VerticalLinesList.getComponent(Layout)!.spacingX = width/columns - 2;
            this.VerticalLinesList.getComponent(Layout)!.updateLayout();
        }

        //add các đường nằm ngang vào HorizontalLinesList
        for(let i=0;i<rows+1;i++){
            const HorizontalLine = instantiate(this.HorizontalLine);

            if (width !== undefined) {
                HorizontalLine.getComponent(UITransform)!.width = width;
            }
            
            this.HorizontalLinesList.addChild(HorizontalLine);
        }
        
        //add các đường theo chiều dọc vào VerticalLinesList
        for(let j=0;j<columns+1;j++) {
            const VerticalLine = instantiate(this.VerticalLine);

            if (height !== undefined) {
                VerticalLine.getComponent(UITransform)!.height = height;
            }
            
            this.VerticalLinesList.addChild(VerticalLine);
        }
        
    }

    // hàm dùng để tạo ra các ô trong bàn cờ, được gọi khi game bắt đầu
    startGame = () => {
        // remove toàn bộ các child node của TableCellsList, dùng khi restart game
        this.TableCellsList.removeAllChildren();

        for(let i=0;i<this.rows;i++){

            this.ValueCellsList[i] = [];

            for(let j=0;j<this.columns;j++) {

                const node = new Node();// tạo node mới tương ứng với 1 ô cờ trong bàn cờ
                node.layer = 2**25;// set layer cho node này, 25 tương ứng với UI_2D
                // thêm component button và click handle vào trong node này
                node.addComponent(Button).node.on('click', () => this.tableCellClick(i*this.columns+j));
                
                this.TableCellsList.addChild(node);//add node mới tạo vào TableCellsList

                //set giá trị mặc định (tương đương 0) cho các ô cờ
                this.ValueCellsList[i][j] = 0;

            }
        }
    }

    //hàm được gọi khi có ô cờ được click
    tableCellClick (index: number) {
        //const index:number = +customEventData; //index là vị trí của node trong TableCellsList, vì customEventData là kiểu string nên phải chuyển sang kiểu number để xử lý
        const x = Math.floor(index / this.columns); //x là vị trí dòng trong ValueCellsList
        const y = index % this.columns; //y là vị trí cột trong ValueCellsList
        
        // kiểm tra xem ô mà người chơi chọn đã được đánh dấu chưa, nếu chưa thì mới đuôc chọn
        if(this.ValueCellsList[x][y] === 0) {
            // kiểm tra xem đây là turn của player1 hay player2
            if(this.isPlayer1Turn === true) {
                this.TableCellsList.children[index].addComponent(Sprite).spriteFrame = this.Player1;
                this.ValueCellsList[x][y] = 1;
            } else {
                this.TableCellsList.children[index].addComponent(Sprite).spriteFrame = this.Player2;
                this.ValueCellsList[x][y] = 2;
            }

            // kiểm tra game kết thúc hay chưa sau mỗi turn của người chơi
            this.checkGameEnd(x,y);

            // đổi lượt chơi mỗi khi kết thúc turn
            this.isPlayer1Turn = !this.isPlayer1Turn;

            // hiển thị turn của người chơi
            if(this.isPlayer1Turn === true) {
                this.MessageGameLabel.getComponent(Label)!.string = "This is Player 1 turn";
            } else {
                this.MessageGameLabel.getComponent(Label)!.string = "This is Player 2 turn";
            }
        }

    }

    // hàm kiểm tra game end
    checkGameEnd (clickIndexX: number, clickIndexY: number) {
        // x, y là vị trí mà người chơi đánh dấu 
        const x = clickIndexX, y = clickIndexY;

        // ở đây có 4 giá trị count, tương ứng kiểm tra theo hàng dọc, hàng ngang và 2 đường chéo
        let count1 = 0, count2 = 0, count3 = 0, count4 = 0;
        // checkValue là để so sánh với ValueCellsList, nếu player1 thì giá trị là 1, player2 thì giá trị là 2
        let checkValue = 1;

        if(this.isPlayer1Turn === false) {
            checkValue = 2;
        }
        
        for(let i=-4; i<5; i++) {
            if(this.ValueCellsList[x+i] !== undefined) {
                // kiểm tra end game theo chiều dọc
                if(this.ValueCellsList[x+i][y] !== undefined) {
                    if(this.ValueCellsList[x+i][y] === checkValue) {
                        count1++;
                    } else {
                        count1 = 0;
                    }
                }

                // kiểm tra end game theo chiều ngang
                if(this.ValueCellsList[x][y+i] !== undefined) {
                    if(this.ValueCellsList[x][y+i] === checkValue) {
                        count2++;
                    } else {
                        count2 = 0;
                    }
                }

                // kiểm tra end game theo 2 đường chéo
                if(this.ValueCellsList[x+i][y+i] !== undefined) {
                    if(this.ValueCellsList[x+i][y+i] === checkValue) {
                        count3++;
                    } else {
                        count3 = 0;
                    }
                }

                if(this.ValueCellsList[x+i][y-i] !== undefined) {
                    if(this.ValueCellsList[x+i][y-i] === checkValue) {
                        count4++;
                    } else {
                        count4 = 0;
                    }
                }
            }


            // nếu có 5 ô liên tiếp thì game kết thúc, thông báo người chiến thắng
            if (count1 === 5 || count2 === 5 || count3 === 5 || count4 === 5) {
                if(this.isPlayer1Turn === true) {
                    this.MessageGameLabel.getComponent(Label)!.string = "Game is end, player 1 won !!!";
                    this.PauseMenuLabel.getComponent(Label)!.string = "Game is end, player 1 won !!!";
                } else {
                    this.MessageGameLabel.getComponent(Label)!.string = "Game is end, player 2 won !!!";
                    this.PauseMenuLabel.getComponent(Label)!.string = "Game is end, player 2 won !!!";
                }

                // dùng để ẩn hoặc hiện các menu
                this.PauseMenu.active = true;
                this.UIContainer.active = true;
                this.MainMenu.active = false;

                return true;
            }
        }
        
        return false;
    }
}