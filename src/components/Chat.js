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

class Chat extends Component {
		constructor(props) {
		super(props);

		this.state = {
			value: '',
			userAddress: '',
			idText: ''
	};
		this.handleInputChangeVal = this.handleInputChangeVal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChangeVal(event) {
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
		const web3 = new Web3(provider)
		
/*		const shh = web3.shh
		var appName = "EntBox";
		var myName = "Donna Lee";
		var myIdentity = shh.newIdentity();
		shh.post({
		  "from": myIdentity,
		  "topics": [ web3.fromAscii(appName) ],
		  "payload": [ web3.fromAscii(myName), web3.fromAscii("What is your name?") ],
		  "ttl": 100,
		  "priority": 1000
		});

		var replyWatch = shh.watch({
		  "topics": [ web3.fromAscii(appName), myIdentity ],
		  "to": myIdentity
		});

		replyWatch.arrived(function(m)
		{
			console.log("Reply from " + web3.toAscii(m.payload) + " whose address is " + m.from);
		});
*/		
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<Paper style={styles.paper} zDepth={1} >
						<h2>Chat</h2>
						<p>Connect to the world</p>
						<TextField onChange={this.handleInputChangeVal} floatingLabelText="Your text here" /><br/>
						<RaisedButton type="submit" onClick={this.handleSubmit} label="Submit" primary={true} style={styles.button} />
					</Paper>
				</div>
			</form>
		);
	}
};

export default Chat
