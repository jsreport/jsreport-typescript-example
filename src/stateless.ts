import JsReport from 'jsreport'
import { promisify } from 'util'
import fs from 'fs'

const writeFileAsync = promisify(fs.writeFile)

const jsreport = JsReport({
    // we skip the config file, that is used by other examples
    // now we have a stateless jsreport intance
    loadConfig: false,
    logger: {
        silent: true
    }
})

async function example() {
    await jsreport.init()

    const result = await jsreport.render({
        template: {
            content: 'foo',
            name: 'content',
            engine: 'none',
            recipe: 'chrome-pdf',
            pdfOperations: [{
                type: 'merge',
                template: <any>{// need a fix in the pdf utils types to make template partial
                    content: 'header',
                    engine: 'none',
                    recipe: 'chrome-pdf'
                }
            }],
            chrome: {
                marginTop: '3cm'
            }
        }
    })

    await writeFileAsync('out.pdf', result.content)
    await jsreport.close()
}

example().catch((e) => {
    console.error(e)
    process.exit(1)
})
