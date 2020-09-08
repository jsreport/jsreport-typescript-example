import JsReport from 'jsreport'

// a simple server initialization, the application is then availible on port 5488 
const jsreport = JsReport()

jsreport.beforeRenderListeners.add('my listener', (req, res) => {
    console.log('my custom listener')
})

jsreport.init().catch((e) => {
    console.trace(e)
    process.exit(1)
})




