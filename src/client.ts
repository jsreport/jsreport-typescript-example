import Client from 'jsreport-client'
import JsReport from 'jsreport'

// demo for using remote jsreport client
// https://jsreport.net/learn/nodejs-client

async function render() {
    // initialize a jsreport server and for the demo purpose
    // this would be typically and existing remote instance
    const jsreport = JsReport()
    await jsreport.init()

    const client = Client('http://localhost:5488')

    console.log('Render anonymous template that is not stored in jsreport')
    let response = await client.render({
        template: {
            content: 'Hello {{message}}',
            engine: 'handlebars',
            recipe: 'html'
        },
        data: {
            message: 'from typescript client'
        }
    })
    console.log(`response status code: ${response.statusCode}`)
    let responseBuffer = await response.body()
    console.log(`response body: ${responseBuffer.toString()}`)

    console.log('Render template stored in jsreport')
    response = await client.render({
        template: {
            name: 'sample template'
        }
    })
    console.log(`response status code: ${response.statusCode}`)
    responseBuffer = await response.body()
    console.log(`response body: ${responseBuffer.toString()}`)

    await jsreport.close()
}

render().catch(console.error)
