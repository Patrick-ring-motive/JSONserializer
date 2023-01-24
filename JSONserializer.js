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
