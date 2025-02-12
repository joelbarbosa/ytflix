import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@chakra-ui/react/preset";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);