import { useState } from "react";
//TODO comments
//TODO toRemove seems more of a use case than toReset
//TODO toRemove should 'remove' or reset it to an EMPTY value instead of toReset resetting it to the initial value
export const initForm = (inputs) => {
  let initialState = {};
  inputs.forEach((input) => {
    initialState[input.key] = input.initialValue;
  });

  const useFormState = () => {
    const [state, setState] = useState(initialState);

    const updater = (stateKey, value, toReset = null) => {
      if (!stateKey) {
        return console.error(
          `@Shared/api/form: you forgot to provide the current input's key`
        );
      }
      if (toReset) {
        if (Array.isArray(toReset)) {
          let valuesToReset = {};
          toReset.forEach((key) => {
            valuesToReset[key] = initialState[key];
          });
          setState((prevState) => ({
            ...prevState,
            [stateKey]: value,
            ...valuesToReset,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            [stateKey]: value,
            [toReset]: initialState[toReset],
          }));
        }
      } else {
        setState((prevState) => ({ ...prevState, [stateKey]: value }));
      }
    };

    return [state, updater];
  };

  return useFormState;
};
