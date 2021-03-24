# TestCoCosCI make by Chinh Dep Zaj

# This CI tool was builded by Github Actions
Link result: https://congchinh262.github.io/TestCoCosCI/web-desktop/
* ### Setup steps:
    * Add new runner on Github
    * Add new workflow on Github Actions
    * Setup workflow
      * Setup job
      * Setup runs on platform (in this case I'm using self-hosted)
      * Setup step:
        * Check-out my repo is under $GITHUB_WORKSPACE
        * Build CoCos app by using CLI
        * Deploy to github page by using githubpage deploy action
    * Adding deploy.js file to deploy to github page

### Documents:
Github actions documentation: https://github.com/features/actions
Publish Cocos App with command line: https://docs.cocos.com/creator/manual/en/publish/publish-in-command-line.html
Github page deploy action: https://github.com/JamesIves/github-pages-deploy-action
