import React from "react";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import TransferPage from "./components/TransferPage";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <TransferPage />
      </div>
    );
  }
}

export default App;
