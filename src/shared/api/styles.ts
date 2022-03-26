//TODO optimizations , documentation
//TODO find a way to simply provide an option to 'exposeChildStyles: true' instead of manually adding it on the top level
//https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? // @ts-ignore
      `${NestedKeyOf<ObjectType[Key]>}` // don't return first level key
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type ExposeStylesProps = {
  merge?: { [key: string]: string };
  replace?: { [key: string]: string };
};

type ExposeStylesReturnProps<T extends object> = {
  [key: string]: any;
  classes?: Partial<Record<NestedKeyOf<T>, string>>;
};

export const exposeStyles = <T extends ExposeStylesProps>({ merge, replace }: T): ((props: ExposeStylesReturnProps<T>) => Record<NestedKeyOf<T>, string>) => {
  const keysRef = new Set();
  const mergeKeys: any = {};
  const replaceKeys: any = {};
  let tempObj: any = {};

  if (merge || replace) {
    //separate merge and replace keys, throw if a duplicate is found
    try {
      if (merge) {
        //merge keys
        Object.keys(merge).forEach((key) => {
          if (keysRef.has(key)) {
            throw new Error(`@Shared/api/styles: Duplicate key. You can't merge and replace the same key: ${key}. `);
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
            throw new Error(`@Shared/api/styles: Duplicate key. You can't merge and replace the same key: ${key}. `);
          }
          replaceKeys[key] = true;
          keysRef.add(key);
        });
        tempObj = { ...tempObj, ...replace };
      }
    } catch (err) {
      console.error(err);
      return tempObj;
    }
  } else {
    throw new Error(`@Shared/api/styles: No merge or replace keys were found.`);
  }

  return (props) => {
    const returnObj = { ...tempObj };

    const { classes } = props;

    if (classes) {
      for (let [key, val] of Object.entries(classes)) {
        if (mergeKeys[key] && merge) {
          //merge classnames
          returnObj[key] = val ? `${returnObj[key]} ${val}` : merge[key]; //merge by appending the class
        } else if (replaceKeys[key] && replace) {
          //replace classnames
          returnObj[key] = val ? `${val}` : replace[key]; //replace the class, not merge
        } else {
          if (process.env.NODE_ENV !== "production") {
            console.error(`@Shared/api/styles: the key ${key} provided to the classes prop is not implemented in this component.
                You can only override one of the following: ${Array.from(keysRef).join()}.`);
          }
        }
      } //end for loop
    } //end if classes

    return returnObj;
  };
};
