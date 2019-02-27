import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import isMobileDevice from "../utils/utils";

class PositionedSnackbar extends React.Component {
  state = {
    open: false,
    vertical: "bottom",
    horizontal: "right"
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({ open: !isMobileDevice() }));
    }, 1000);
  }

  handleClick = state => () => {
    this.setState({ open: true, ...state });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              This app is best viewed on a mobile device
            </span>
          }
        />
      </div>
    );
  }
}

export default PositionedSnackbar;
