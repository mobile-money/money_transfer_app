import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import EntryPage from "./EntryPage";
import TransferPage from "./TransferPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={EntryPage} exact={true} />
        <Route path="/transfer/:mode" component={TransferPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
