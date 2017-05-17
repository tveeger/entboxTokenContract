import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import EntboxContract from '../../build/contracts/EntboxContract.json';
import Web3 from 'web3';
import Identicon from 'react-identity-icon';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const contract = require('truffle-contract')
const entboxContract = contract(EntboxContract)
entboxContract.setProvider(provider)
const web3 = new Web3(provider);
var shh = web3.shh;

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

class Messages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			appName: 'Entbox',
			topics: '0x456e74626f78',
			posts: [],
			shhIdentity2: '',
			postText: '',
			tst: '',
			postAmount: 0
		};
		this.componentWillMount = this.componentWillMount.bind(this);
	}

	componentWillMount() {
		var self = this;
		var data;
		if (shh) {
			var appName = self.state.appName;
			var posts = [];
			
			//var f = shh.filter({ topics: [ null ] });
			var f = shh.filter({ topics: [ appName ] });
			f.watch(function(error, result){
				if (!error) {
					var postAmount = posts.length;
					if (postAmount < 20) {
						var payload = web3.toAscii(result.payload);
						var message = reqListener(payload);
						posts = self.state.posts.slice();
						posts.push({'id': postAmount , 'payload': payload, 'ttl': result.ttl, 'from': result.from, 'to': result.to, 'topics': [result.topics], 'priority': result.priority});
						self.setState({ posts: posts });
					}
					self.setState({postAmount: postAmount});
				}
				//console.log('sp2 ' + self.state.posts[0].payload );
			});

			function reqListener(e, res) {
				//data = JSON.parse(res.message);
				//console.log(data);
				//return data;
			}
		}
	}

	render() {
		return (
			<div>
				<h4>Messages</h4>
				<p>About {this.state.postAmount} found... so far</p>
				<List>
					{this.state.posts.map(function(item){
						return <ListItem key={item.id} primaryText={item.payload}><Identicon hash={item.from} size="40" /></ListItem>
					})}
				</List>
			</div>
		);
	}
	

};

export default Messages
