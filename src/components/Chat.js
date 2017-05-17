import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import EntboxContract from '../../build/contracts/EntboxContract.json';
import Web3 from 'web3';
import Messages from './Messages.js';

import Identicon from 'react-identity-icon';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const contract = require('truffle-contract')
const entboxContract = contract(EntboxContract)
entboxContract.setProvider(provider)
const web3 = new Web3(provider);
const shh = web3.shh;


const styles = {
	button: {
  		margin: 12,
	},
	paper: {
		width: '97%',
		textAlign: 'left',
		display: 'inline-block',
	},
	showIdentityButton: {
		display: 'none',
	},
	hidden: {
		display: 'none',
	}
};

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			shhIdentity: '',
			shhIdentityText: 'First create an identity......',
			appName: 'Entbox',
			postText: '',
			hideNewIdentityButton: false,
			hideSubmitPostButton: true
		};
		this.handleInputChangeVal = this.handleInputChangeVal.bind(this);
		this.handleNewIdentity = this.handleNewIdentity.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleNewIdentity() {
		self = this;
		var myIdentity = self.state.shhIdentity;
		shh.hasIdentity(myIdentity, function(error, result) {
			if (result == false || result != '') {
				var myIdentity = shh.newIdentity();
				self.setState({shhIdentity: myIdentity});
				self.setState({shhIdentityText: 'A new identity is created. Now send your message'});
				self.setState({hideNewIdentityButton: true});
				self.setState({hideSubmitPostButton: false});

				styles.showIdentityButton.display = 'inline-block';

				console.log('new id ' + myIdentity + ', ' + self.props);
			} else {
				self.setState({shhIdentityText: 'Identity already created'});
				console.log('My old and current id ' + self.state.shhIdentity + ', result: ' + result);
			}
		});
	}

	handleInputChangeVal(event) {
		this.setState({postText: event.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		var self = this
		//self.setState({postText: postText});
		
		var message = {
		  "from": self.state.shhIdentity,
		  "topics": [web3.fromAscii(self.state.appName)],
		  "payload": web3.fromAscii(self.state.postText),
		  "ttl": 100,
		  "priority": 1000
		};
		shh.post(message, function(error, result) {
			if (!error) {
				//console.log('posted a message: ' + JSON.stringify(message));
			}
		});
	}
	
	componentWillMount() {
		var self = this;
		if (shh) {
			var myIdentity = this.state.shhIdentity;
			var appName = self.state.appName;
			self.setState({appName: appName});
			//var topic = web3.fromAscii(appName);
			var topic = web3.fromAscii(self.state.postText);
		}
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<Paper style={styles.paper} zDepth={1} >
						<h2>Chat</h2>
						<div>
							<RaisedButton type="button" onClick={this.handleNewIdentity} label="New Identity" primary={true} style={styles.button} disabled={this.state.hideNewIdentityButton} />
							{this.state.shhIdentityText}
						</div>
						<div style={styles.showIdentityButton}>
							<Identicon hash={this.state.shhIdentity} size="40" />
						</div>
						<div className="">
							<TextField onChange={this.handleInputChangeVal} floatingLabelText="Your text here" />
							<RaisedButton type="submit" onClick={this.handleSubmit} label="Submit" primary={true} style={styles.button} disabled={this.state.hideSubmitPostButton} />
						</div>
						<Divider />
						<Messages/>
					</Paper>
				</div>
			</form>
		);
	}
};

export default Chat
