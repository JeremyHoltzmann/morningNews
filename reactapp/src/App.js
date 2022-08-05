import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScreenHome from "./ScreenHome";
import ScreenMyArticle from "./ScreenMyArticles";
import ScreenSource from "./ScreenSource";
import ScreenArticlesBySource from "./ScreenArticlesBySource";

import articleList from "./reducer/article.reducer";
import token from "./reducer/user.reducer";
import language from "./reducer/sourceLanguage.reduce";

import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux";

const store = createStore(combineReducers({ articleList, token, language }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenHome}></Route>
          <Route
            exact
            path="/screenMyArticles"
            component={ScreenMyArticle}
          ></Route>
          <Route exact path="/screenSource" component={ScreenSource}></Route>
          <Route
            exact
            path="/screenMyArticlesBySource/:id"
            component={ScreenArticlesBySource}
          ></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
