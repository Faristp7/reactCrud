import React from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import AuthWrapper from "./pages/AuthWrapper";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

export default function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <AuthWrapper/>
        </Provider>
      </BrowserRouter>

  );
}
