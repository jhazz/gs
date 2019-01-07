var amd=(moduleName,modulePath,callback)=>{
  amd.modules[moduleName]={callback:callback};
  let s=document.createElement("script");
  s.setAttribute("src", modulePath);
  s.setAttribute("type", "text/javascript");
  document.getElementsByTagName("head")[0].appendChild(s);
}

amd.modules={};

var define=(moduleName,callArgs,fn)=>{
  let m=window.amd.modules[moduleName];
  if(!m) m=window.amd.modules[moduleName]={};
  m.callArgs=callArgs;
  m.fn=fn;
  m.exports={};
  m.fn(()=>{console.log("Chain AMD loadind not supporting");}, m.exports);
  if(!!m.callback) m.callback.call(m,m.exports);
}