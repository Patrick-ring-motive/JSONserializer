var globalObject = window || self || global || globalThis || frames || this;
globalObject.globalObject = globalObject;

globalObject.generateId = function(str) {


  return (str + new Date().getTime() + "" + performance.now()).replaceAll('.', '');


};

globalObject.evalAsync = function(src) {
  return new Promise(function(resolve, reject) {
    let s;
    s = document.createElement('script');
    s.innerHTML = src;
    s.type = 'text/javascript';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}



globalObject.JSON.deserializeAsync = async function(str) {
  if (!globalObject.JSONMap) {
    globalObject.JSONMap = new Map();
  }
  const idJSON = generateId("JSON");

  const scriptEval =
    `var ` + idJSON + `=` + str + `;                    
globalObject.JSONMap.set("`+ idJSON + `",` + idJSON + `);`
    ;

  await evalAsync(scriptEval);

  let deserial = globalObject.JSONMap.get(idJSON);
  globalObject.JSONMap.delete(idJSON);


  return JSON.parse(JSON.stringify(deserial));

};

globalObject.JSON.deserialize = function(str) {
  if (!globalObject.JSONMap) {
    globalObject.JSONMap = new Map();
  }
  const idJSON = generateId("JSON");

  const scriptEval =

    `var ` + idJSON + `=` + str + `;                    
globalObject.JSONMap.set("`+ idJSON + `",` + idJSON + `);`;
  try {
    eval?.(scriptEval);
  } catch (e) {
    try {
      eval(scriptEval);
    } catch (e) {
      return JSON.parse(str);
    }
  }
  let deserial = globalObject.JSONMap.get(idJSON);

  globalObject.JSONMap.delete(idJSON);

  return JSON.parse(JSON.stringify(deserial));

};

globalObject.JSON.serialize = function(object1){

const descriptors1 = Object.getOwnPropertyDescriptors(object1);


// Expected output: true

let desc = {};

let props = Object.keys(descriptors1);

for(let i=0;i<props.length;i++){
  let newdesc={};
  newdesc.value=object1[props[i]];
  newdesc.writeable=true;
  newdesc.configurable=true;
  newdesc.enumerable=true;
  
desc[props[i]]=newdesc;


}

let out=Object.create(
  Object.getPrototypeOf(descriptors1),desc
);
return JSON.stringify(out);
};
