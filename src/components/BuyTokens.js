import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import EntboxContract from '../../build/contracts/EntboxContract.json';
import Web3 from 'web3'

import CreateTokenForm from './CreateToken.js';
import BuyTokenForm from './BuyTokensForm.js';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

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
			userAddress: '',
			idText: '',
			showBuyForm: false,
			showCreateForm: false
	};

		this.handleBuy = this.handleBuy.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
	}

	handleBuy() {
		this.setState({showBuyForm: true});
		this.setState({showCreateForm: false});
	}

	handleCreate() {
		this.setState({showBuyForm: false});
		this.setState({showCreateForm: true});
	}

	componentWillMount() {
		var self = this
		const provider = new Web3.providers.HttpProvider('http://localhost:8545')
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
			<div>
				<Paper style={styles.paper} zDepth={1} >
					
					<RaisedButton onClick={this.handleBuy} label="Buy tokens" primary={false} style={styles.button} />
					<RaisedButton onClick={this.handleCreate} label="Create tokens" primary={false} style={styles.button} />
					<Divider/>
					{this.state.showBuyForm ? <BuyTokenForm /> : null}
					{this.state.showCreateForm ? <CreateTokenForm /> : null}
				</Paper>
			</div>
		);
	}
};

export default BuyTokens
