import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { client } from "./apollo/client";
import { ApolloProvider } from "@apollo/client";
import { Provider, defaultTheme, Button } from "@adobe/react-spectrum";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider theme={defaultTheme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
