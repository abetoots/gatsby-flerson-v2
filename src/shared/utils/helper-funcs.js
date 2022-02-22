export const updateObject = (oldState, newProperties) => {
  return {
    ...oldState,
    ...newProperties,
  };
};

export const uniqueRoutes = (array) => {
  //check if param is array
  if (!Array.isArray(array)) {
    return;
  }

  const s = new Set();
  const a = [];

  array.forEach((itm) => {
    if (itm.nest && Array.isArray(itm.nest)) {
      itm.nest.forEach((nestedItm) => {
        if (!s.has(nestedItm.path || nestedItm.key)) {
          s.add(nestedItm.path || nestedItm.key);
          a.push(nestedItm);
        }
      });
    }
    //check if Set does not have the value, then add them to Set and the array to be returned
    if (!s.has(itm.path || itm.key)) {
      s.add(itm.path || itm.key);
      a.push(itm);
    }
  });

  return a;
};

/**
 * Ensures that all values from a given array are unique
 * @returns An array containing the unique values
 * @param {Array} array
 */
export const uniqArray = (array) => {
  //check if param is array
  if (!Array.isArray(array)) {
    return;
  }

  const s = new Set();
  const a = [];

  array.forEach((itm) => {
    //check if Set does not have the value, then add them to Set and the array to be returned
    if (!s.has(itm)) {
      s.add(itm);
      a.push(itm);
    }
  });

  return a;
};

export const isFile = (x) =>
  x &&
  (Object.prototype.toString.call(x) === "[object File]" || x instanceof File);

export const isDate = (x) =>
  x &&
  (Object.prototype.toString.call(x) === "[object Date]" || x instanceof Date);

export const isFunction = (x) =>
  x &&
  (Object.prototype.toString.call(x) === "[object Function]" ||
    "function" === typeof x ||
    x instanceof Function);
