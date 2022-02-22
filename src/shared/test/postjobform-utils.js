import React, { useMemo } from "react";

import { render as rtlRender } from "@testing-library/react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { EditorsContext } from "@Index/pages/post-job";

const render = (ui, options) => rtlRender(ui, { wrapper: Wrapper, ...options });

const Wrapper = ({ children }) => {
  const jobDescEditor = useMemo(() => withReact(createEditor()), []);
  const howToApplyEditor = useMemo(() => withReact(createEditor()), []);
  return (
    <EditorsContext.Provider
      value={{
        jobDescEditor: jobDescEditor,
        howToApplyEditor: howToApplyEditor,
      }}
    >
      {children}
    </EditorsContext.Provider>
  );
};

export * from "@testing-library/react";
export { render };
