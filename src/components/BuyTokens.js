import React, { Component } from 'react';
import EntboxContract from '../../build/contracts/EntboxContract.json';
import Web3 from 'web3'

import TextField from 'material-ui/TextField';
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

class BuyTokens extends Component {
		constructor(props) {
		super(props);

		this.state = {
			value: '',
			userAddress: '',
			idText: ''
	};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		var euros = this.state.value;
		var self = this
		const provider = new Web3.providers.HttpProvider('http://localhost:8444')
		const contract = require('truffle-contract')
		const simpleStorage = contract(EntboxContract)
		simpleStorage.setProvider(provider)
		const web3RPC = new Web3(provider)

		web3RPC.eth.getAccounts(function(error, accounts) {
			self.setState({userAddress: accounts[0]});
			var coinbase = self.userAddress;
			var hash = web3RPC.sha3(coinbase + euros);
			self.setState({idText: hash});
		});
	}
	
	componentWillMount() {
		var self = this
		const provider = new Web3.providers.HttpProvider('http://localhost:8444')
		const contract = require('truffle-contract')
		const simpleStorage = contract(EntboxContract)
		simpleStorage.setProvider(provider)
		const web3RPC = new Web3(provider)

		web3RPC.eth.getAccounts(function(error, accounts) {
			var hash = web3RPC.sha3("Some string to be hashed");
			self.setState({userAddress: accounts[0]});
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<Paper style={styles.paper} zDepth={1} >
						<h2>Buy DETs</h2>
						<p>Fill in how many Euros you want to convert into DETs, you will be given a code.</p>
						
						<TextField name="tokenAmount" onChange={this.handleChange} floatingLabelText="Amount of Euros" /><br/>
						<RaisedButton type="submit" onClick={this.handleSubmit} label="Submit" primary={true} style={styles.button} />
						<p>After you filled in the amount of Euros you want to transfer, you will find a code underneath. </p>
						<br/>Copy this code and paste it into the comment area in your banktransfer.<br/> Within an hour you will find a confirmation about your new funds. My Funds, you can convert this into DETs.
						IBAN number:<strong>BUNQNL2A12345678</strong><br/>
						ID-Text: <h2>{this.state.idText}</h2>
					</Paper>
				</div>
			</form>
		);
	}
};

export default BuyTokens
