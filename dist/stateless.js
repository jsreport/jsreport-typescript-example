"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsreport_1 = __importDefault(require("jsreport"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const writeFileAsync = util_1.promisify(fs_1.default.writeFile);
const jsreport = jsreport_1.default({
    // we skip the config file, that is used by other examples
    // now we have a stateless jsreport intance
    loadConfig: false,
    logger: {
        silent: true
    }
});
async function example() {
    await jsreport.init();
    const result = await jsreport.render({
        template: {
            content: 'foo',
            name: 'content',
            engine: 'none',
            recipe: 'chrome-pdf',
            pdfOperations: [{
                    type: 'merge',
                    template: {
                        content: 'header',
                        engine: 'none',
                        recipe: 'chrome-pdf'
                    }
                }],
            chrome: {
                marginTop: '3cm'
            }
        }
    });
    await writeFileAsync('out.pdf', result.content);
    await jsreport.close();
}
example().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=stateless.js.map