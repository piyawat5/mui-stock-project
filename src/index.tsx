import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import reportWebVitals from "./reportWebVitals";
import { Middleware, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";
import { Provider, useDispatch } from "react-redux";

// redux
export const middlewares: Middleware[] = [thunk];

if (process.env.REACT_APP_IS_PRODUCTION !== "1") {
  middlewares.push(logger);
}

export const store = createStore(reducers, applyMiddleware(...middlewares));

// fix error useDispatch type;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
