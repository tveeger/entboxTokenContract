import React, { Component } from 'react';
import EntboxContract from '../build/contracts/EntboxContract.json';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Web3 from 'web3';

import CreateToken from './components/CreateToken.js';
import BuyTokens from './components/BuyTokens.js';
import Donate from './components/Donate.js';
import Chat from './components/Chat.js';
import Terms from './components/Terms.js';
import About from './components/About.js';
import Register from './components/Register.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAppbar from './components/materialUI/MyAppbar';
import MyBottomNavigation from './components/materialUI/MyBottomNavigation.js';

import './css/font-awesome.css'
import './css/oswald.css'
import './css/frente.css'
import './css/open-sans.css'
import './css/App.css'

import {Tabs, Tab} from 'material-ui/Tabs'
import Paper from 'material-ui/Paper';

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
	padding: 10,
	textAlign: 'left',
	display: 'inline-block',
  	}
};

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			address: "0x123...",
			userAddress: '0x123...',
			userBalance: 0,
			name: "MyToken",
			symbol: "DET",
			version: "0",
			totalSupply: 0,
			creditTokens: 100,
			creditTokensLeft: 0
		}
		this.handleClick = this.handleClick.bind(this);
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

	componentWillMount() {
		var self = this
		const contract = require('truffle-contract')
		var myToken = contract(EntboxContract) //contract ABI(Token);
		var web3;

		injectTapEventPlugin(); //Material-UI

		if (typeof web3 !== 'undefined') {
			//const provider = new Web3.providers.HttpProvider('http://localhost:8444')
			web3 = new Web3(web3.currentProvider);
			myToken.setProvider(web3);
		} else {
			console.log('No web3? You should consider trying MetaMask!')
			//const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8444"));
			const provider = new Web3.providers.HttpProvider('http://localhost:8444');
			myToken.setProvider(provider);
			web3 = new Web3(provider);
		}
		
		//var account = web3.personal.listAccounts[0];
		//web3.personal.unlockAccount(account,"password",15000); // unlock for a long time

		var myTokenInstance
		var tokenAddress

		// Get accounts.
		web3.eth.getAccounts(function(error, accounts) {
			self.setState({userAddress: accounts[0]});
			myToken.deployed().then(function(instance) {
			myTokenInstance = instance
			return myTokenInstance.balanceOf(accounts[0])
			}).then(function(result) {
				tokenAddress = myTokenInstance.address;
				self.setState({address: tokenAddress});
				var myUserBalance = web3.eth.getBalance(accounts[0]);
				self.setState({userBalance: web3.fromWei(myUserBalance.toNumber(), "ether")});
				//let MyContract = web3.eth.contract(JSON.parse(abi));
				//console.log('test ' + MyContract);
			})
		});
	}

	render() {
		return (
		<div className="App">
			<header>
				<MuiThemeProvider>
					<MyAppbar />
				</MuiThemeProvider>
			</header>

			<main className="">
			  <div>
				<MuiThemeProvider>
					<Paper style={styles.paper} zDepth={3} >
					<Tabs>
					  <Tab label="My Funds" style={styles.headline}>
						<div className="mui--z2">
							<h2>My funds</h2>
							<p>
								The information below will show the state of your DET wallet. <br/>Click on the BUY tab to order some tokens.
								After you have successfully transferred some Euros, you will see below how many DETs you are able to create.
							</p>
							<br/>
							Token address: <strong>{this.state.address}</strong><br/>
							My user address: <strong>{this.state.userAddress}</strong><br/>
							My balance: <strong>Ξ {this.state.userBalance} (Ether)</strong><br/>
							Token name: <strong>{this.state.name}</strong><br/>
							Token symbol: <strong>{this.state.symbol}</strong><br/>
							Total supply of DET: <strong>{this.state.totalSupply}</strong><br/>
							<CreateToken/>
						</div>
					  </Tab>

					  <Tab label="Buy" style={styles.headline}>
						<div className="mui--z2">
							<BuyTokens/>
						</div>
					  </Tab>

					  <Tab label="Donate" data-route="/donate" onActive={this.handleActive} style={styles.headline}>
						<div className="mui--z2">
							<Donate/>
						</div>
					  </Tab>

					  <Tab label="Chat" style={styles.headline}>
						<div className="">
							<Chat/>
						</div>
					  </Tab>

					</Tabs>
					</Paper>
					</MuiThemeProvider>
				
			  </div>
			</main>

			<footer>
				<MuiThemeProvider><MyBottomNavigation/></MuiThemeProvider>
			</footer>
			
		</div>
		);
	}
}

export default App

