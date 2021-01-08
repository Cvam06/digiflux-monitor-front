import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppNavBar from './components/AppNavBar';
import SimpleAreaChart from './components/SimpleAreaChart';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import AddWebsiteModal from './components/AddWebsiteModal';
import { websiteAdd, apiCallHost } from './assets/globals';


//A small piece of code to customize your theme
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#2C2F4B',
      contrastText: '#fff'
    },
    secondary: {
      main: '#607c8a',
    }
  }
});

class App extends Component {

  state = {
    statusTableRow: [],
    isLoading: false,
    showAddWebsiteModal: false
  }



  getDataFromtheServer = () => {
    this.setState({ isLoading: true });
    console.log("api Call = " + apiCallHost + 'websites')
    fetch(apiCallHost + 'getlatest')
      .then(response => response.json())
      .then(data => this.setState({ statusTableRow: data, isLoading: false }, () => {
        console.log("data ========> ", this.state.statusTableRow)
      }))
  }
  componentDidMount = () => {
    this.getDataFromtheServer();
    setInterval(() => {
      console.log('Calling..');
      this.getDataFromtheServer();
    }, 60000);
  }

  showAddWebsiteModal = () => {
    this.setState({ showAddWebsiteModal: true });
    console.log("status ==== ", this.state.showAddWebsiteModal);
  }

  hideAddWebsiteModal = () => {
    console.log("Website name = " + websiteAdd.name);
    this.setState({ showAddWebsiteModal: false });
  }

  render() {


    const charts = this.state.statusTableRow.map((row) => {
      console.log("in charts", row);
      return <div className="col-md-5 m-2">
        <Paper>
          <SimpleAreaChart
            hostname={row}
          />
        </Paper>
      </div>
    })

    return (
      <MuiThemeProvider theme={theme} style="align-items: center">
        <AppNavBar />

        <div className="row">
          <div className="col-md-10 m-4">

            <Paper>

              {
                this.state.isLoading &&
                <LinearProgress color="secondary" />
              }

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Hosting Name</TableCell>
                    <TableCell>Environment</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>

                </TableHead>
                <TableBody>

                  {this.state.statusTableRow.map(row => (
                    <TableRow key={row.website.name}>
                      <TableCell> {row.website.name} </TableCell>
                      <TableCell> {row.website.hostname} </TableCell>
                      <TableCell> {row.website.env} </TableCell>
                      <TableCell> {row.status} </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} className="text-center"> <button type="button" class="btn btn-info center-block" onClick={this.showAddWebsiteModal}> + Add New Website </button> </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
        <div className="row ml-2">
          {charts}
        </div>
        <AddWebsiteModal
          show={this.state.showAddWebsiteModal}
          onHide={this.hideAddWebsiteModal}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
