import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
	button: {
  		margin: 12,
	},
	paper: {
		width: '97%',
		textAlign: 'left',
		display: 'inline-block',
	}
};

class Donate extends Component {
		constructor(props) {
		super(props);

		this.state = {
			value: '1', 
			address: '', 
			charity: ''
		};

		this.handleInputChangeVal = this.handleInputChangeVal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (event, index, value) => this.setState({charity: value});

	handleInputChangeVal(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		alert('A new value was submitted: ' + this.state.value + ' and ' + this.state.charity);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<Paper style={styles.paper} zDepth={1} >
						<h2>Make a donation</h2>
						<p>Some text here...</p>
						<SelectField floatingLabelText="Charity" value={this.state.charity} onChange={this.handleChange}>
							<MenuItem value={"0x72F54c4f85E9AfD28c99bda38BC2658bDA7c9dec"} primaryText="Green Peace " />
							<MenuItem value={"0x64F6daBe00230845c49a09209aA22b4A7a1F6eB2"} primaryText="Amnesty International " />
							<MenuItem value={"0x2F444660159c8C1cD010A94BB3915DA5F2e4C66D"} primaryText="Sea Shepard " />
							<MenuItem value={"0xaa09871458d3eB067A0733aAf6e9c8046Ed80d84"} primaryText="War Child " />
						</SelectField><br/>
						<TextField onChange={this.handleInputChangeVal} floatingLabelText="Amount of tokens" /><br/>
						<RaisedButton type="submit" onClick={this.handleSubmit} label="Submit" primary={true} style={styles.button} />
					</Paper>
				</div>
			</form>
		);
	}
};

export default Donate
