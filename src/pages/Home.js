import React, { Component } from "react";
import { MenuItem } from "@material-ui/core";
import {
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import TextField from "@material-ui/core/TextField";
import data from "../components/data";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = {
  root: {
    margin: 30,
    padding: 10
  },
  manualBoxShadow: {
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.15)"
  }
};

class Home extends Component {
  state = {
    series: null,
    model: null,
    factory: null,
    extended: null,
    price: null,
    firstname: null,
    lastname: null,
    email: null,
    phoneno: null,
    gender: null,
    comments: null,
    isguaranteed: null,
    isPhNoValid: false,
    isemailValid: false
  };
  handleSubmit = () => {
    this.validate();
  };
  handleValidated = () => {
    if (this.state.isPhNoValid && this.state.isemailValid) {
      console.log(
        "data=======================================================================",
        this.state
      );
      alert("Successfully Sumbitted");
    }
  };
  handleChange = name => event => {
    console.log("name===", name, "====value====", event.target.value);
    let value = event.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        if (name === "factory") {
          let factoryobj = JSON.parse(value);
          data.factoryYear.map(fyoption => {
            if (factoryobj.id == fyoption.id) {
              this.setState(
                {
                  factory: fyoption,
                  extended: null,
                  price: null,
                  isguaranteed: null
                },
                () => {
                  this.calculatePrice();
                }
              );
            }
          });
        }
        if (name === "guarantee") {
          let guaranteeobj = JSON.parse(value);
          data.guaranteeYear.map(gyoption => {
            if (guaranteeobj.id == gyoption.id) {
              this.setState(
                {
                  guarantee: gyoption,
                  extended: null,
                  price: null
                },
                () => {
                  this.calculatePrice();
                }
              );
            }
          });
        }
        if (name === "extended") {
          let extendedobj = JSON.parse(value);
          data.extendedYear.map(eyoption => {
            if (extendedobj.id == eyoption.id) {
              this.setState(
                {
                  extended: eyoption,
                  price: null
                },
                () => {
                  this.calculatePrice();
                }
              );
            }
          });
        }
        if (name === "isguaranteed" && value === "no") {
          data.guaranteeYear.map(gyoption => {
            if (
              this.state.factory.id === gyoption.factoryid &&
              gyoption.name === 0
            ) {
              this.setState({ guarantee: gyoption }, () => {
                this.calculatePrice();
              });
            }
          });
        }
        if (name === "series") {
          this.setState({
            series: value,
            model: null,
            factory: null,
            extended: null,
            price: null,
            isguaranteed: ""
          });
        }
        if (name === "model") {
          this.setState({
            model: value,
            factory: null,
            extended: null,
            price: null,
            isguaranteed: null
          });
        }
      }
    );
    this.calculatePrice();
  };

  validate = () => {
    console.log(
      "validate presses=============================================="
    );
    if (this.state.phoneno) {
      let phno = this.state.phoneno.toString();
      var mat = phno.match(/\d{10}/);
      console.log(mat);

      if (this.state.email) {
        let mail = this.state.email.match(/\w+@\w+[.]{1}\w+/);
        if (mail && mail.input) {
          this.setState({ isemailValid: true }, () => {
            if (mat && mat.input && this.state.phoneno.length == 10) {
              this.setState({ isPhNoValid: true }, () => {
                this.handleValidated();
              });
            } else {
              this.setState({ isPhNoValid: false });
              alert("Please enter a valid Phone Number");
            }
          });
        } else {
          this.setState({ isemailValid: false });
          alert("Please enter a valid Email");
        }
      }
    }
  };

  calculatePrice = () => {
    data.price.map(priceoption => {
      if (
        this.state.extended &&
        this.state.extended.id === priceoption.extendedid
      ) {
        this.setState({ price: priceoption.name });
      }
    });
  };
  render() {
    return (
      <div style={styles.root}>
        <Card className="col-md-12 p-0">
          <CardHeader
            style={{
              backgroundColor: "#607d8b",
              color: "white",
              fontSize: "1.1em",
              textAlign: "center"
            }}
          >
            Calculate Price
          </CardHeader>
          <CardBody>
            <Card className="col-md-12 p-2" style={styles.manualBoxShadow}>
              <InputLabel htmlFor="name-multiple">Series</InputLabel>
              <TextField
                id="series"
                fullWidth
                style={{ marginBottom: 10 }}
                select
                value={this.state.series}
                onChange={this.handleChange("series")}
              >
                <MenuItem key="select" value="select">
                  Please Select
                </MenuItem>
                {data.series.map(option => (
                  <MenuItem key={option.id} value={option}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              {this.state.series && this.state.series !== "select" && (
                <div>
                  <InputLabel htmlFor="name-multiple">Model</InputLabel>
                  <TextField
                    id="model"
                    style={{ marginBottom: 10 }}
                    fullWidth
                    select
                    value={this.state.model}
                    onChange={this.handleChange("model")}
                  >
                    <MenuItem key="select" value="select">
                      Please Select
                    </MenuItem>
                    {data.model.map(option => {
                      if (this.state.series.id === option.seriesid) {
                        return (
                          <MenuItem key={option.id} value={option}>
                            {option.name}
                          </MenuItem>
                        );
                      }
                    })}
                  </TextField>
                </div>
              )}
              {this.state.model &&
                this.state.model !== "select" &&
                this.state.series &&
                this.state.series !== "select" && (
                  <div>
                    <FormControl component="fieldset">
                      <FormLabel>Factory Year</FormLabel>
                      <RadioGroup
                        aria-label="factory"
                        name="factory"
                        value={JSON.stringify(this.state.factory)}
                        onChange={this.handleChange("factory")}
                      >
                        {data.factoryYear.map(option => {
                          if (this.state.model.id === option.modelid) {
                            let optionstr = JSON.stringify(option);
                            return (
                              <FormControlLabel
                                value={optionstr}
                                control={<Radio />}
                                label={option.name}
                                // labelPlacement="start
                              />
                            );
                          }
                        })}
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              {this.state.model &&
                this.state.model !== "select" &&
                this.state.series &&
                this.state.series !== "select" &&
                this.state.factory && (
                  <div>
                    <FormControl component="fieldset">
                      <FormLabel>Guarantee?</FormLabel>
                      <RadioGroup
                        aria-label="isguaranteed"
                        name="isguaranteed"
                        value={this.state.isguaranteed}
                        onChange={this.handleChange("isguaranteed")}
                      >
                        <FormControlLabel
                          value="yes"
                          control={<Radio />}
                          label="Yes"
                          // labelPlacement="start"
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio />}
                          label="No"
                          // labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              {this.state.model &&
                this.state.model !== "select" &&
                this.state.series &&
                this.state.series !== "select" &&
                this.state.factory &&
                this.state.isguaranteed &&
                this.state.isguaranteed==="yes" && (
                  <div>
                    <FormControl component="fieldset">
                      <FormLabel>Guarantee Year</FormLabel>
                      <RadioGroup
                        aria-label="guarantee"
                        name="guarantee"
                        value={JSON.stringify(this.state.guarantee)}
                        onChange={this.handleChange("guarantee")}
                      >
                        {this.state.isguaranteed === "yes" &&
                          data.guaranteeYear.map(option => {
                            if (option.name != 0) {
                              if (this.state.factory.id === option.factoryid) {
                                let optionstr = JSON.stringify(option);
                                return (
                                  <FormControlLabel
                                    value={optionstr}
                                    control={<Radio />}
                                    label={option.name}
                                    // labelPlacement="start"
                                  />
                                );
                              }
                            }
                          })}
                        {this.state.isguaranteed === "no" && (
                          <FormControlLabel
                            value={JSON.stringify(this.state.guarantee)}
                            control={<Radio />}
                            label="0"
                            // labelPlacement="start"
                          />
                        )}
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              {this.state.model &&
                this.state.model !== "select" &&
                this.state.series &&
                this.state.series !== "select" &&
                this.state.factory &&
                this.state.guarantee && (
                  <div>
                    <FormControl component="fieldset">
                      <FormLabel>Extended Year</FormLabel>
                      <RadioGroup
                        aria-label="extended"
                        name="extended"
                        value={JSON.stringify(this.state.extended)}
                        onChange={this.handleChange("extended")}
                      >
                        {data.extendedYear.map(option => {
                          if (
                            this.state.guarantee &&
                            this.state.guarantee.id === option.guaranteeid
                          ) {
                            let optionstr = JSON.stringify(option);
                            return (
                              <FormControlLabel
                                value={optionstr}
                                control={<Radio />}
                                label={option.name}
                                // labelPlacement="start"
                              />
                            );
                          }
                        })}
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              {this.state.model &&
                this.state.model !== "select" &&
                this.state.series &&
                this.state.series !== "select" &&
                this.state.factory &&
                this.state.extended && (
                  <div className="mt-2 mb-2">
                    <span>Price: </span>
                    <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                      {this.state.price}
                    </span>
                  </div>
                )}
            </Card>
          </CardBody>
        </Card>
        {this.state.price && (
          <Card className="col-md-12 mt-2 p-0">
            <CardHeader
              style={{
                backgroundColor: "#607d8b",
                color: "white",
                fontSize: "1.1em",
                textAlign: "center"
              }}
            >
              Personal Information
            </CardHeader>
            <CardBody>
              <Card className="col-md-12 p-2" style={styles.manualBoxShadow}>
                <div>
                  <InputLabel htmlFor="name-multiple">First Name</InputLabel>
                  <TextField
                    id="firstname"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    value={this.state.firstname}
                    onChange={this.handleChange("firstname")}
                  />
                  <InputLabel htmlFor="name-multiple">Last Name</InputLabel>
                  <TextField
                    id="lastname"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    value={this.state.lastname}
                    onChange={this.handleChange("lastname")}
                  />
                  <InputLabel htmlFor="name-multiple">Email</InputLabel>
                  <TextField
                    id="email"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                  />
                  <InputLabel htmlFor="name-multiple">Phone Number</InputLabel>
                  <TextField
                    id="phoneno"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    value={this.state.phoneno}
                    onChange={this.handleChange("phoneno")}
                  />
                  <InputLabel htmlFor="name-multiple">gender</InputLabel>
                  <TextField
                    id="gender"
                    fullWidth
                    style={{ marginBottom: 10 }}
                    select
                    value={this.state.gender}
                    onChange={this.handleChange("gender")}
                  >
                    <MenuItem key="1" value="Male">
                      Male
                    </MenuItem>
                    <MenuItem key="2" value="Female">
                      Female
                    </MenuItem>
                    <MenuItem key="3" value="Other">
                      Other
                    </MenuItem>
                  </TextField>
                  <InputLabel htmlFor="name-multiple">Comments</InputLabel>
                  <TextField
                    id="comments"
                    fullWidth
                    multiline={true}
                    rows={3}
                    value={this.state.comments}
                    onChange={this.handleChange("comments")}
                  />

                  <Button
                    variant="contained"  color="secondary" 
                    onClick={this.handleSubmit}
                    disabled={
                      this.state.series == null ||
                      this.state.model == null ||
                      this.state.factory == null ||
                      this.state.guarantee == null ||
                      this.state.extended == null ||
                      this.state.price == null ||
                      this.state.firstname == null ||
                      this.state.lastname == null ||
                      this.state.email == null ||
                      this.state.phoneno == null ||
                      this.state.gender == null ||
                      this.state.comments == null
                    }
                  >
                    Submit
                  </Button>
                </div>
              </Card>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

export default Home;
