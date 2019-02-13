///<reference path="./webassembly.d.ts" />
///<reference path="./wasmtypes.d.ts" />
export type ExportedEntries = { [key: string]: object };


export namespace gs{
  const enum xtype {
    eoa=0,
    array = 1,
    hashArray = 2,
    staticString = 3,
    u8 = 4,
    u16 = 5,
    u32 = 6,
    f32 = 7,
    pointer = 8,
  }
  type pointer = u32; // pointer to memory

  export class Module {
    wasmModuleName:string;
    wasmPath:string;
    resultObject:WebAssembly.ResultObject;
    e:any;
    imports:object;
    staticTop:pointer;


    constructor (name:string){
      this.wasmModuleName=name;
    }

    public async loadWasm(wasmPath:string):Promise<Module>{
      let env={
        INIT_64K_PAGECOUNT:1,
        MAX_64K_PAGECOUNT:256,
        X_BUFFER_SIZE:5000,
        xprintf:()=>{
          var xp:pointer=this.staticTop,r=[],r2;
          env.xdumpFrom(xp,r);
          r2=r[0];
          if(typeof r2[0]=="string"){
            console.log(r2[0].replace(/\{\$\d\}/g,function(x:any){
              return ""+r2[parseInt(x.substr(2,x.length-3),10)];
            }));
          }
        },
        xdump:()=>{
          var xp:pointer=this.staticTop,r=[];
          env.xdumpFrom(xp,r);
          console.log(r);
        },

        xdumpFrom:(xp:pointer,res:Array<any>):pointer=>{
          var buf=new DataView (this.e.memory.buffer);
          var xt:xtype, s='', t:u8, offs:u16, l:u32, i:u32, c:u16, sa:Array<u16>=[], nextResult:Array<any>=[];
          if (xp==0) {
            xp=this.staticTop;
          }
          for(; xp<env.X_BUFFER_SIZE ;){
            xt=buf.getUint8(xp++);
            switch(xt){
              case xtype.eoa:
                return xp;
              case xtype.staticString:
                offs=buf.getUint32(xp,true);
                xp+=4;
                l=buf.getUint32(offs,true);
                offs+=4;
                if((offs+(l<<1)) > this.staticTop){
                  res.push("ERROR! Static string is over HEAP_BASE "+offs+",+"+l+" > "+this.staticTop);
                  break;
                }
                sa.length=0;
                for(i=0;i<l;i++){
                  c=buf.getUint16(offs,true);
                  offs+=2;
                  sa.push(c)
                }
                res.push(String.fromCharCode.apply(0,sa));
                break;
              case xtype.u32:
                res.push(buf.getUint32(xp,true))
                xp+=4;
                break;
              case xtype.u16:
                res.push(buf.getUint16(xp,true))
                xp+=2;
                break;
              case xtype.u8:
                res.push(buf.getUint8(xp))
                xp+=1;
                break;
              case xtype.f32:
                res.push(buf.getFloat32(xp,true))
                xp+=4;
                break;
              case xtype.array:
                nextResult=[]
                res.push(nextResult);
                xp=env.xdumpFrom(xp,nextResult);
                break;
            }
          }
        }
      };
      
      this.imports={
        "gs.as":env,
        'memory': new WebAssembly.Memory({initial: env['INIT_64K_PAGECOUNT'], maximum:env['MAX_64K_PAGECOUNT']}),
        'table': new WebAssembly.Table({initial:2, element:"anyfunc"})
      };
      this.resultObject=await WebAssembly.instantiateStreaming(fetch(wasmPath),this.imports);
      this.e=this.resultObject.instance.exports; // Shortcut access to exported const
      this.staticTop=this.e.getHeapBase();
      return this;
    }
  }

}
