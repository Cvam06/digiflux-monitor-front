import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { LinearProgress } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from "react-select";

class SimpleAreaChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropDownLabel: "",
			fetchdata: [],
			name: "",
			hostname: "",
			isLoading: false,
			chartData: {
				labels: [],
				datasets: [{
					label: "",
					data: [],
					//backgroundColor:'green',
					backgroundColor: []
				}]
			}
		}
	}

	getDataFromtheServer = () => {
		console.log("In getData SimpleChart." + JSON.stringify(this.props.hostname.website_id))
		let hostname = this.props.hostname.website_id;
		fetch('http://localhost:5000/dataofone/' + this.props.hostname.website_id)
			.then(response => response.json())
			.then((responseJson) => {
				console.log("responseJson = " + responseJson)
				this.setState({ fetchdata: responseJson, name: responseJson[0].name, hostname: responseJson[0].hostname });
			}).then(() => {
				let chartData2 = { ...this.state.chartData }
				chartData2.datasets[0].label = this.state.hostname;
				let maxCount = Math.max.apply(Math, this.state.fetchdata.map(function (fetchdata) { return fetchdata.batch_no; }))
				const maxItter = Math.round(maxCount / 10);
				console.log("maxItter = ", maxItter);
				let tempLabels = [];
				let tempDataForChart = [];
				let tempBackground = [];
				let avgValue = 0;
				let finalValue = 0;
				this.state.fetchdata.map((fetched) => {
					if (fetched.batch_no % maxItter === 0) {
						let t = fetched.date_time.split(/[- :]/);
						//var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
						//console.log("d = ",t[2],"/",t[1]);
						let tempDate = t[2] + "/" + t[1];
						tempLabels.push(tempDate);
						if (fetched.status === "UP") {
							console.log("fetchedBatch = ", fetched.batch_no);
							avgValue = avgValue + 1;
							finalValue = avgValue / maxItter;
							console.log("finalValue === ", finalValue);
							tempDataForChart.push(finalValue);
							avgValue = 0;
							tempBackground.push("rgba(102, 187, 106,1.0)")
						}
						else {
							console.log("fetchedBatch = ", fetched.batch_no);
							avgValue = avgValue - 1;
							finalValue = avgValue / maxItter;
							console.log("finalValue === ", finalValue);
							tempDataForChart.push(finalValue);
							avgValue = 0;
							tempBackground.push("rgba(255, 0, 0, 0.7)")
						}
					}
					else {
						if (fetched.status === "UP") {
							avgValue = avgValue + 1;
						}
						else {
							avgValue = avgValue - 1;
						}
					}
				})
				chartData2.datasets[0].backgroundColor = tempBackground;
				chartData2.labels = tempLabels;
				chartData2.datasets[0].data = tempDataForChart;
				console.log("ChartData = ", chartData2);
				this.setState({ chartData: chartData2 });

			});
	}

	componentDidMount() {
		//fetch graphs data
		this.setState({ isLoading: true });
		this.getDataFromtheServer();
		this.setState({ isLoading: false });
	}

	limitOptions = [
		{ label: "Last one hour", key: 1 },
		{ label: "Last 12 hours", key: 2 },
		{ label: "Last 24 hours", key: 3 },
		{ label: "Last Week", key: 4 }
	]

	// const handleChange = name => event => {
	// 	setValues({ ...values, [name]: event.target.value });
	//   };


	labelChange = (event) => {
		this.setState({ dropDownLabel: event.target.value.label });
	}

	render() {
		if (this.state.isLoading || this.state.chartData.datasets[0].data.length === 0)
			return <LinearProgress color="secondary" />

		return (
			<div className="chart">
				<div className="text-center m-2">
					<h2> {this.state.name} </h2>
				</div>
				<div className="row">
					<div className="col-md-12 m-3">
						{/* <Select options = {this.limitOptions} defaultValue = {this.limitOptions[0]}/> */}
						<div className="col-md-8">
							<TextField
								id="select-period"
								select
								label="Select"
								value={this.limitOptions[0].label}
								SelectProps={{
									MenuProps: {
										className: "w-100",
									},
								}}
								onChange={this.labelChange}
								helperText="Please select the period of time."
								margin="normal"
								variant="outlined"
							>
								{this.limitOptions.map(option => (
									<MenuItem key={option.key} value={option.label}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</div>
					</div>
				</div>
				<Line
					data={this.state.chartData}
					options={{}}
				/>
			</div>
		)
	}
}

export default SimpleAreaChart;