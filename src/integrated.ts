import JsReport from 'jsreport'
import express from 'express'
import http, { Server } from 'http'

const app = express()

app.get('/', (req, res) => {
    res.send(`
     <h1>Hello from express application</h1>
     <ul>
       <li><a href='/reporting'>Access jsreport studio embedded in express app</a></li>
       <li><a href='/report'>Render a custom anonymous report in the embedded jsreport instance</a></li>
       <li><a href='/report-stored'>Render a template stored in jsreport</a></li>
     </ul<
     `)
})

const reportingApp = express();
app.use('/reporting', reportingApp)

const server: Server = http.createServer(app)

const jsreport = JsReport(<any>{
    extensions: {
        express: { app: reportingApp, server: server },
    },
    appPath: "/reporting"
})

jsreport.init().then(() => server.listen(3000))

app.get('/report', async (req, res, next) => {
    try {
        const renderResponse = await jsreport.render({
            template: {
                content: 'Hello {{message}}',
                engine: 'handlebars',
                recipe: 'chrome-pdf'
            },
            data: {
                message: 'from typescript'
            }
        })
        renderResponse.stream.pipe(res)
    } catch (e) {
        next(e)
    }
})

app.get('/report-stored', async (req, res, next) => {
    try {
        const renderResponse = await jsreport.render({
            template: {
                name: '/stock report/main'
            }
        })
        renderResponse.stream.pipe(res)
    } catch (e) {
        next(e)
    }
})




