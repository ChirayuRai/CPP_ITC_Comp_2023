import React from "react";
import ReactDOM from "react-dom/client";
//import { createRoot } from "react-dom";
import App from "./App";
import "./index.css";
import client from "./apollo-client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
//import { Switch, Route } from "react-router-dom";
//import "./styles/tailwind.css";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({ uri: "http://localhost:4000/" }),
// });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ApolloProvider client={client as ApolloClient<any>}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>
);
