//TODO optimizations , documentation
//TODO find a way to simply provide an option to 'exposeChildStyles: true' instead of manually adding it on the top level
export const exposeStyles = ({ merge, replace }) => {
  const keysRef = new Set();
  const mergeKeys = {};
  const replaceKeys = {};
  let tempObj = {};

  if (merge || replace) {
    //separate merge and replace keys, throw if a duplicate is found
    try {
      if (merge) {
        //merge keys
        Object.keys(merge).forEach((key) => {
          if (keysRef.has(key)) {
            throw new Error(
              `@Shared/api/styles: Duplicate key. You can't merge and replace the same key: ${key}. `
            );
          }
          mergeKeys[key] = true;
          keysRef.add(key);
        });
        //no duplicates were found, merge to return obj
        tempObj = { ...tempObj, ...merge };
      }

      if (replace) {
        //replace keys
        Object.keys(replace).forEach((key) => {
          if (keysRef.has(key)) {
            throw new Error(
              `@Shared/api/styles: Duplicate key. You can't merge and replace the same key: ${key}. `
            );
          }
          replaceKeys[key] = true;
          keysRef.add(key);
        });
        tempObj = { ...tempObj, ...replace };
      }
    } catch (err) {
      return console.error(err);
    }
  } else {
    throw new Error(`@Shared/api/styles: No merge or replace keys were found.`);
  }

  return (props = null) => {
    const returnObj = { ...tempObj };

    if (props) {
      const { classes } = props;

      if (classes) {
        for (let [key, val] of Object.entries(classes)) {
          if (mergeKeys[key]) {
            //merge classnames
            returnObj[key] = val ? `${returnObj[key]} ${val}` : merge[key]; //merge by appending the class
          } else if (replaceKeys[key]) {
            //replace classnames
            returnObj[key] = val ? `${val}` : replace[key]; //replace the class, not merge
          } else {
            if (process.env.NODE_ENV !== "production") {
              console.error(`@Shared/api/styles: the key ${key} provided to the classes prop is not implemented in this component.
                You can only override one of the following: ${[
                  ...keysRef,
                ].join()}.`);
            }
          }
        } //end for loop
      } //end if classes
    } //end if props

    return returnObj;
  };
};
