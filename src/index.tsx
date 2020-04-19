import React, { memo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Root } from "./Root";
import * as serviceWorker from "./serviceWorker";
import { useSink } from "./utils/utils";

const apiURL = "/api";

const Index = memo(() => {
  const ResolvedRoot = useSink(() => Root({ apiURL }), []);
  return <ResolvedRoot />;
});

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
