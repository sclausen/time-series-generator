function interpolate(str: string, object: Object): any {
  let matches = str.match(/{([^{}]*)}/);
  if (matches && object[matches[1]]) {
    return object[matches[1]];
  } else {
    return str;
  }
}

export function recursiveInterpolate(source, valueObj) {
  let copy = JSON.parse(JSON.stringify(source));
  function treeWalker(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        switch (typeof obj[key]) {
          case 'object':
            treeWalker(obj[key]);
            break;
          case 'string':
            var sup = interpolate(obj[key], valueObj);
            obj[key] = sup;
        }
      }
    }
  }
  treeWalker(copy);
  return copy;
};

export function missingValues(obj, values: string[]): string[] {
  let found = {};
  values.forEach(value => { found[value] = false; });
  function treeWalker(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        switch (typeof obj[key]) {
          case 'object':
            treeWalker(obj[key]);
            break;
          case 'string':
            if (values.indexOf(obj[key]) > -1) {
              found[obj[key]] = true;
            }
        }
      }
    }
  }
  treeWalker(obj);
  let missingValues = [];
  Object.keys(found).forEach(key => { if (found[key] === false) { missingValues.push(key); } });
  return missingValues;
};
