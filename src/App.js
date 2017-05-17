import React, { Component } from 'react';

import Home from './components/Home.js';
import Terms from './components/Terms.js';
import About from './components/About.js';
import Charity from './components/Charity.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyBottomNavigation from './components/materialUI/MyBottomNavigation.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import DonutIcon from 'material-ui/svg-icons/navigation/donut-small';
import LoyaltyIcon from 'material-ui/svg-icons/navigation/loyalty';

import './css/font-awesome.css'
import './css/oswald.css'
import './css/frente.css'
import './css/open-sans.css'
import './css/App.css'

const styles = {
	title: {
		cursor: 'pointer',
	},
	verticon: {
		color: '#dddddd'
	}
};

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: 3,
			valueSingle: '1',
			openMenu: false,
			showHome: true,
			showAbout: false,
			showTerms: false,
			showCharity: false
		}
		this.handleChange = (event, index, value) => this.setState({value});
		this.handleChangeSingle = this.handleChangeSingle.bind(this);
		this.handleHome = this.handleHome.bind(this);
		this.handleAbout = this.handleAbout.bind(this);
		this.handleTerms = this.handleTerms.bind(this);
		this.handleCharity = this.handleCharity.bind(this);
	}

	handleHome() {
		this.setState({showHome: true});
		this.setState({showAbout: false, showTerms: false, showCharity: false});
		this.setState({valueSingle: '1'})
	}

	handleAbout() {
		this.setState({showAbout: true});
		this.setState({showHome: false, showTerms: false, showCharity: false});
		this.setState({valueSingle: '2'})
	}

	handleTerms() {
		this.setState({showTerms: true});
		this.setState({showHome: false, showAbout: false, showCharity: false});
		this.setState({valueSingle: '3'})
	}

	handleCharity() {
		this.setState({showCharity: true});
		this.setState({showHome: false, showAbout: false, showTerms: false});
		this.setState({valueSingle: '4'})
	}

	handleChangeSingle = (event, value) => {
		this.setState({
			valueSingle: value,
		});
		console.log('changed to: ' + value);
	};

	handleOpenMenu = () => {
		this.setState({
			openMenu: true,
		});
	}

	componentWillMount() {
		injectTapEventPlugin(); //Material-UI
	}

	render() {
		return (
		<div className="App">
			<header>
				<MuiThemeProvider>
					<AppBar
				title={<span style={styles.title} className="appbarTitle">Entbox</span>}
				onTitleTouchTap={this.handleHome}>
			<IconMenu
				iconButtonElement={
					<IconButton touch={true}>
						<MoreVertIcon style={styles.verticon} />
					</IconButton>
				}
			>
				<MenuItem onClick={this.handleAbout} value="2" primaryText="About" leftIcon={<DonutIcon/>} />
				<MenuItem onClick={this.handleTerms} value="3" primaryText="Terms" leftIcon={<RefreshIcon/>} />
				<MenuItem onClick={this.handleCharity} value="4" primaryText="Charities" leftIcon={<LoyaltyIcon/>} />
			</IconMenu>
			</AppBar>
				</MuiThemeProvider>
			</header>

			<main className="">
				<div>
					<MuiThemeProvider>
						<div>
							{this.state.showHome ? <Home /> : null}
							<Paper style={styles.paper} zDepth={3} >
								{this.state.showAbout ? <About /> : null}
								{this.state.showTerms ? <Terms /> : null}
								{this.state.showCharity ? <Charity /> : null}
							</Paper>
						</div>
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

