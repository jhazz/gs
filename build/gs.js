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
            loadWasm(wasmPath) {
                return __awaiter(this, void 0, void 0, function* () {
                    let env = {
                        INIT_64K_PAGECOUNT: 1,
                        MAX_64K_PAGECOUNT: 256,
                        X_BUFFER_SIZE: 5000,
                        xprintf: () => {
                            var xp = this.staticTop, r = [], r2;
                            env.xdumpFrom(xp, r);
                            r2 = r[0];
                            if (typeof r2[0] == "string") {
                                console.log(r2[0].replace(/\{\$\d\}/g, function (x) {
                                    return "" + r2[parseInt(x.substr(2, x.length - 3), 10)];
                                }));
                            }
                        },
                        xdump: () => {
                            var xp = this.staticTop, r = [];
                            env.xdumpFrom(xp, r);
                            console.log(r);
                        },
                        xdumpFrom: (xp, res) => {
                            var buf = new DataView(this.e.memory.buffer);
                            var xt, s = '', t, offs, l, i, c, sa = [], nextResult = [];
                            if (xp == 0) {
                                xp = this.staticTop;
                            }
                            for (; xp < env.X_BUFFER_SIZE;) {
                                xt = buf.getUint8(xp++);
                                switch (xt) {
                                    case 0 /* eoa */:
                                        return xp;
                                    case 3 /* staticString */:
                                        offs = buf.getUint32(xp, true);
                                        xp += 4;
                                        l = buf.getUint32(offs, true);
                                        offs += 4;
                                        if ((offs + (l << 1)) > this.staticTop) {
                                            res.push("ERROR! Static string is over HEAP_BASE " + offs + ",+" + l + " > " + this.staticTop);
                                            break;
                                        }
                                        sa.length = 0;
                                        for (i = 0; i < l; i++) {
                                            c = buf.getUint16(offs, true);
                                            offs += 2;
                                            sa.push(c);
                                        }
                                        res.push(String.fromCharCode.apply(0, sa));
                                        break;
                                    case 6 /* u32 */:
                                        res.push(buf.getUint32(xp, true));
                                        xp += 4;
                                        break;
                                    case 5 /* u16 */:
                                        res.push(buf.getUint16(xp, true));
                                        xp += 2;
                                        break;
                                    case 4 /* u8 */:
                                        res.push(buf.getUint8(xp));
                                        xp += 1;
                                        break;
                                    case 7 /* f32 */:
                                        res.push(buf.getFloat32(xp, true));
                                        xp += 4;
                                        break;
                                    case 1 /* array */:
                                        nextResult = [];
                                        res.push(nextResult);
                                        xp = env.xdumpFrom(xp, nextResult);
                                        break;
                                }
                            }
                        }
                    };
                    this.imports = {
                        "gs.as": env,
                        'memory': new WebAssembly.Memory({ initial: env['INIT_64K_PAGECOUNT'], maximum: env['MAX_64K_PAGECOUNT'] }),
                        'table': new WebAssembly.Table({ initial: 2, element: "anyfunc" })
                    };
                    this.resultObject = yield WebAssembly.instantiateStreaming(fetch(wasmPath), this.imports);
                    this.e = this.resultObject.instance.exports; // Shortcut access to exported const
                    this.staticTop = this.e.getHeapBase();
                    return this;
                });
            }
        }
        gs.Module = Module;
    })(gs = exports.gs || (exports.gs = {}));
});
//# sourceMappingURL=gs.js.map