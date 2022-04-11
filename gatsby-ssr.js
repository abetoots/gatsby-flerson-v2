/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "typeface-dosis";
import "typeface-open-sans";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const wrapRootElement = ({ element }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>;
};
