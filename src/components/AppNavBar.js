import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { IconButton, Typography, AppBar } from "@material-ui/core";
import logo from '../assets/images/logo(1).png';
import AppNavBarDrawer from "./AppNavBarDrawer";

const styles = {
  root: {
    flexGrow: 1
  },
  barRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "85%"
  },
  menuButton: {
    display: "flex"
  }
};

class AppNavBar extends Component {
  state = {
    openDrawer: false
  };
  handleDrawer = () => {
    this.setState({
      openDrawer: !this.state.openDrawer
    });
  };
  render() {
    return (
      <div style={styles.root}>
        <AppBar position="static" >
          <Toolbar style={styles.bar}>
            <IconButton onClick={this.handleDrawer}>
              <MenuIcon color="black" aria-label="Menu" />
            </IconButton>

            <img src={logo} height="3%" width="6%" style={{ margin: "0.5%", marginTop: "1%" }} alt="Digiflux Logo" />
            {/* <Typography variant="title" color="inherit" className={styles.root}>
              Price Calculation
            </Typography> */}
            <div style={styles.barRight}>
              <IconButton style={styles.menuButton} color="black">
                <AccountCircle />
              </IconButton>
              <a href="https://www.digiflux.io">
                <Typography color="black">
                  By Digiflux IT Solutions
                </Typography>
              </a>
            </div>
          </Toolbar>
        </AppBar>
        <AppNavBarDrawer
          drawerState={this.state.openDrawer}
          changeDrawerAction={this.handleDrawer}
        />
      </div>
    );
  }
}

export default AppNavBar;