import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import websiteAdd from './../assets/globals';

class AddWebsiteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            website_name: "",
            website_hostname: "",
            website_env: "",
        };
    }
    addWebsite() {
        console.log("AddWebsite");
    }

    setFieldName = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add New Website
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-md-4">
                            <TextField
                                required
                                id="required-name"
                                label="Enter Name"
                                className="form-control"
                                variant="outlined"
                                name="website_name"
                                onChange={this.setFieldName}
                            />
                        </div>
                        <div class="col-md-5">
                            <TextField
                                required
                                id="required-hostname"
                                label="Enter Hostname"
                                className="form-control"
                                variant="outlined"
                                name="website_hostname"
                                onChange={this.setFieldName}
                            />
                        </div>
                        <div class="col-md-3">
                            <TextField
                                required
                                id="required-env"
                                label="Enter Environment"
                                className="form-control"
                                variant="outlined"
                                name="website_env"
                                onChange={this.setFieldName}
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        console.log("Website name = " + this.state.website_name)
                        console.log("Website host = " + this.state.website_hostname)
                        console.log("Website env = " + this.state.website_env)
                    }}>Save Website</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddWebsiteModal;