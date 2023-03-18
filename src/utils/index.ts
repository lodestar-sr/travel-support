export const queryObjSerialize = (obj: any) => {
  let str = [];
  for (const p in obj)
    if (obj.hasOwnProperty(p) && obj[p]) {
      if (Array.isArray(obj[p])) {
          str.push(
            encodeURIComponent(p) + "=" + encodeURIComponent(obj[p].join(',')) 
          );
      } else {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
  return str.join("&");
};
