///<reference path="./webassembly.d.ts" />
///<reference path="./wasmtypes.d.ts" />
export type ExportedEntries = { [key: string]: object };

export namespace gs{

  export class Module {
    wasmModuleName:string;
    wasmPath:string;
    resultObject:WebAssembly.ResultObject;
    e:object;
    imports:object;

    constructor (name:string){
      this.wasmModuleName=name;
    }

    public async load(wasmPath:string, env?:object):Promise<Module>{
      if(!env) env={};
      if(!('INIT_64K_PAGECOUNT' in env)) env['INIT_64K_PAGECOUNT']=1;
      if(!('MAX_64K_PAGECOUNT' in env)) env['MAX_64K_PAGECOUNT']=256;
      if(!('X_BUFFER_SIZE' in env)) env['X_BUFFER_SIZE']=5000;
      env['logger']=(v:u32)=>{
        console.log('[GS.AS]',v);
      }
      this.imports={
        "gs.as":env,
        'memory': new WebAssembly.Memory({initial: env['INIT_64K_PAGECOUNT'], maximum:env['MAX_64K_PAGECOUNT']}),
        'table': new WebAssembly.Table({initial:2, element:"anyfunc"})
      };
      this.resultObject=await WebAssembly.instantiateStreaming(fetch(wasmPath),this.imports);
      this.e=this.resultObject.instance.exports; // Shortcut access to exported const
      return this;
    }
  }

}
