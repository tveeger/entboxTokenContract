import React, { Component } from 'react';
import EntboxContract from '../../build/contracts/EntboxContract.json';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Web3 from 'web3';

import BuyTokens from './BuyTokens.js';
import Donate from './Donate.js';
import Chat from './Chat.js';

import MyBottomNavigation from './materialUI/MyBottomNavigation.js';
import {Tabs, Tab} from 'material-ui/Tabs'
import Paper from 'material-ui/Paper';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const styles = {
  headline: {
    fontSize: 14,
    paddingTop: 6,
    marginBottom: 2,
    fontWeight: 400,
    color: '#666',
  	background: 'transparent true',
  	border: 0
  },
  paper: {
  	width: '100%',
	margin: 4,
	padding: 15,
	textAlign: 'left',
	display: 'inline-block',
	  	}
};

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tokenAddress: "No token yet...",
			userAddress: 'No user yet...',
			userBalance: 0,
			name: "",
			symbol: "",
			decimals: "",
			version: "",
			totalSupply: 0,
			creditTokens: 100,
			creditTokensLeft: 0,
			value: 3,
			valueSingle: '3',
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = (event, index, value) => this.setState({value});
		this.handleChangeSingle = this.handleChangeSingle.bind(this);
	}

	onActive(tab) {
		console.log('andere tab');
	}

	handleClick(e) {
		e.preventDefault();
		console.log('cliked something ' + this);
	}

	handleActive(tab) {
		//alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
	}

	handleChangeSingle = (event, value) => {
    this.setState({
      valueSingle: value,
    });
  };

	componentWillMount() {
		var self = this
		//injectTapEventPlugin(); //Material-UI
		const contract = require('truffle-contract')
		var myToken = contract(EntboxContract) //contract ABI(Token);
		var web3;

		if (typeof web3 !== 'undefined') {
			//const provider = new Web3.providers.HttpProvider('http://localhost:8444')
			web3 = new Web3(web3.currentProvider);
			myToken.setProvider(web3);
		} else {
			console.log('No web3? You should consider trying MetaMask!')
			//const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8444"));
			const provider = new Web3.providers.HttpProvider('http://localhost:8545');
			//console.log('provider: ' + myToken);
			myToken.setProvider(provider);
			web3 = new Web3(provider);
		}
		
		//var account = web3.personal.listAccounts[0];
		//web3.personal.unlockAccount(account,"password",15000); // unlock for a long time

		var myTokenInstance

		// Get accounts.
		web3.eth.getAccounts(function(error, accounts) {
			self.setState({userAddress: accounts[0]});
			myToken.deployed().then(function(instance) {
				myTokenInstance = instance;
				//console.log('test ' + myTokenInstance);
				myTokenInstance.name.call(function(error, result) {
					if (!error) {
						console.log('name: ' + result);
						self.setState({name: result});	
					}
				});
				myTokenInstance.symbol.call(function(error, result) {
					if (!error) {
						console.log('symbol: ' + result);
						self.setState({symbol: result});	
					}
				});
				myTokenInstance.decimals.call(function(error, result) {
					if (!error) {
						self.setState({decimals: result});	
					}
				});
				myTokenInstance.version.call(function(error, result) {
					if (!error) {
						self.setState({version: result});	
					}
				});
				
				return myTokenInstance.balanceOf(accounts[0])
			}).then(function(result) {
				self.setState({tokenAddress: myTokenInstance.address});
				var myUserBalance = web3.eth.getBalance(accounts[0]);

				self.setState({userBalance: web3.fromWei(myUserBalance.toNumber(), "ether")});
				//let MyContract = web3.eth.contract(JSON.parse(abi));
				console.log('token balance: ' + web3.eth.getBalance(myTokenInstance.address) );
			})
		});
	}

	render() {
		return (
		<div className="Home">
			<Tabs>
				<Tab label="My Funds" style={styles.headline}>
					<div className="mui--z2">
						<Paper style={styles.paper} zDepth={3} >
							<h2>My funds</h2>
							<p>
								The information below will show the state of your DET wallet. <br/>Click on the BUY tab to order some tokens.
								After you have successfully transferred some Euros, you will see below how many DETs you are able to create.
							</p>
							<br/>
							Token address: <strong>{this.state.tokenAddress}</strong><br/>
							My user address: <strong>{this.state.userAddress}</strong><br/>
							My balance: <strong>Ξ {this.state.userBalance} (Ether)</strong><br/>
							Token name: <strong>{this.state.name}</strong><br/>
							Token symbol: <strong>{this.state.symbol}</strong><br/>
							Total supply of DET: <strong>{this.state.totalSupply}</strong><br/>
							
						</Paper>
					</div>
				</Tab>

				<Tab label="Buy" style={styles.headline}>
					<div className="mui--z2">
						<Paper style={styles.paper} zDepth={3} >
							<BuyTokens/>
						</Paper>
					</div>
				</Tab>

				<Tab label="Donate" data-route="/donate" onActive={this.handleActive} style={styles.headline}>
					<div className="mui--z2">
						<Paper style={styles.paper} zDepth={3} >
							<Donate/>
						</Paper>
					</div>
				</Tab>

				<Tab label="Chat" style={styles.headline}>
					<div className="">
						<Paper style={styles.paper} zDepth={3} >
							<Chat/>
						</Paper>
					</div>
				</Tab>
			</Tabs>

		</div>
		);
	}
}

export default Home

