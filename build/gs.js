var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("gs", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var gs;
    (function (gs) {
        class Module {
            constructor(name) {
                this.wasmModuleName = name;
            }
            load(wasmPath, env) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!env)
                        env = {};
                    if (!('INIT_64K_PAGECOUNT' in env))
                        env['INIT_64K_PAGECOUNT'] = 1;
                    if (!('MAX_64K_PAGECOUNT' in env))
                        env['MAX_64K_PAGECOUNT'] = 256;
                    if (!('X_BUFFER_SIZE' in env))
                        env['X_BUFFER_SIZE'] = 5000;
                    env['logger'] = (v) => {
                        console.log('[GS.AS]', v);
                    };
                    this.imports = {
                        "gs.as": env,
                        'memory': new WebAssembly.Memory({ initial: env['INIT_64K_PAGECOUNT'], maximum: env['MAX_64K_PAGECOUNT'] }),
                        'table': new WebAssembly.Table({ initial: 2, element: "anyfunc" })
                    };
                    this.resultObject = yield WebAssembly.instantiateStreaming(fetch(wasmPath), this.imports);
                    this.e = this.resultObject.instance.exports; // Shortcut access to exported const
                    return this;
                });
            }
        }
        gs.Module = Module;
    })(gs = exports.gs || (exports.gs = {}));
});
//# sourceMappingURL=gs.js.map