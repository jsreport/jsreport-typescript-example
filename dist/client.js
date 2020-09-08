"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsreport_client_1 = __importDefault(require("jsreport-client"));
const jsreport_1 = __importDefault(require("jsreport"));
// demo for using remote jsreport client
// https://jsreport.net/learn/nodejs-client
async function render() {
    // initialize a jsreport server and for the demo purpose
    // this would be typically and existing remote instance
    const jsreport = jsreport_1.default();
    await jsreport.init();
    const client = jsreport_client_1.default('http://localhost:5488');
    console.log('Render anonymous template that is not stored in jsreport');
    let response = await client.render({
        template: {
            content: 'Hello {{message}}',
            engine: 'handlebars',
            recipe: 'html'
        },
        data: {
            message: 'from typescript client'
        }
    });
    console.log(`response status code: ${response.statusCode}`);
    let responseBuffer = await response.body();
    console.log(`response body: ${responseBuffer.toString()}`);
    console.log('Render template stored in jsreport');
    response = await client.render({
        template: {
            name: 'sample template'
        }
    });
    console.log(`response status code: ${response.statusCode}`);
    responseBuffer = await response.body();
    console.log(`response body: ${responseBuffer.toString()}`);
    await jsreport.close();
}
render().catch(console.error);
//# sourceMappingURL=client.js.map