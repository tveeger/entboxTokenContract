import React, { Component } from 'react';
import EntboxContract from '../../build/contracts/EntboxContract.json';
import Web3 from 'web3'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
	button: {
  		margin: 12,
	},
	paper: {
		width: '97%',
		textAlign: 'left',
		display: 'inline-block',
		padding: 15,
	}
};

class CreateToken extends Component {
		constructor(props) {
		super(props);

		this.state = {
			address: "0x123...",
			name: "Digital European Token",
			symbol: "DET",
			version: "0.01",
			totalSupply: 0,
			creditTokens: 100,
			creditTokensLeft: 0
		}

		this.handleInputChangeCreateTokenAmount = this.handleInputChangeCreateTokenAmount.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChangeCreateTokenAmount(event) {
		var buyTokens = event.target.value;
		
		var creditLeft = this.state.creditTokens - buyTokens;
		this.setState({creditTokensLeft: creditLeft});
	}

	handleSubmit(e) {
		e.preventDefault();
		var orderedAmount = this.state.creditTokens - this.state.creditTokensLeft;
		alert('You just orderes: ' + orderedAmount + ' tokens');
	}

	componentWillMount() {
		var self = this
		const provider = new Web3.providers.HttpProvider('http://localhost:8545')
		const contract = require('truffle-contract')
		const simpleStorage = contract(EntboxContract)
		simpleStorage.setProvider(provider)
		const web3RPC = new Web3(provider)
		self.setState({creditTokensLeft: self.state.creditTokens});
		// Declaring this for later so we can chain functions on SimpleStorage.
		var myTokenInstance
		var tokenAddress

		// Get accounts.
		web3RPC.eth.getAccounts(function(error, accounts) {
			//console.log(accounts)
			simpleStorage.deployed().then(function(instance) {
			myTokenInstance = instance
			//return myTokenInstance.set(1, {from: accounts[0]})
			}).then(function(result) {
				tokenAddress = myTokenInstance.address;
				self.setState({address: tokenAddress});
				/*tokenAddress.getBalance(function(err, result3) {
						console.log(err, result3.valueOf());
					});*/
				//console.log('res: ' + tokenAddress);
			// Get the value from the contract to prove it worked.
			return myTokenInstance.totalSupply.call(accounts[0])
			}).then(function(result) {
			// Update state with the result.
			//console.log('state2: ' + result.c[0]);
			return self.setState({ storageValue: result.c[0] })
			})
		});
	}
	
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<h2>Create new tokens</h2>
					<p>You have enough funds to buy {this.state.creditTokensLeft} DETs. </p>
					<TextField defaultValue="" onChange={this.handleInputChangeCreateTokenAmount} floatingLabelText="Amount of tokens" /><br/>
					<RaisedButton type="submit" onClick={this.handleSubmit} label="Click me" primary={true} style={styles.button} />
				</div>
			</form>
		);
	}
};

export default CreateToken
