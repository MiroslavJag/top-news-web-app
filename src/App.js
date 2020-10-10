import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "components/pages/Home";
import Categories from "components/pages/Categories";
import Search from "components/pages/Search";
import Layout from "components/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/categories" component={Categories} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
