import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.querySelector("#root")!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
