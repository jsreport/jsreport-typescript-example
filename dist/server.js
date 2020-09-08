"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsreport_1 = __importDefault(require("jsreport"));
// a simple server initialization, the application is then availible on port 5488 
const jsreport = jsreport_1.default();
jsreport.beforeRenderListeners.add('my listener', (req, res) => {
    console.log('my custom listener');
});
jsreport.init().catch((e) => {
    console.trace(e);
    process.exit(1);
});
//# sourceMappingURL=server.js.map