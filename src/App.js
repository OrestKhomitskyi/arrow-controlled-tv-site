import React from "react";
import { Provider } from "react-redux";

import createReduxStore from "./redux/store";

import Categories from "./components/categories";
import Movies from "./components/movies";
import Overview from "./components/overview";

import "./assets/stylesheet/global.sass";
import "@fortawesome/fontawesome-free";
import "./App.sass";
import Dashboard from "./components/dashboard";

const store = createReduxStore();
const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
      <Overview />
    </Provider>
  );
};

export default App;
