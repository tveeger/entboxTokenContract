import React, { Component } from 'react';
import Form from 'muicss/lib/react/form';
import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';
import Container from 'muicss/lib/react/container';

class SellTokens extends Component {
		constructor(props) {
		super(props);

		this.state = {value: '', address: ''};

		this.handleInputChangeVal = this.handleInputChangeVal.bind(this);
		this.handleInputChangeAddr = this.handleInputChangeAddr.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChangeVal(event) {
		this.setState({value: event.target.value});
	}

	handleInputChangeAddr(event) {
		this.setState({address: event.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		alert('A new value was submitted: ' + this.state.value + ' and ' + this.state.address);
	}
	
	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Container fluid={true}>
					<h2>Sell Tokens</h2>
					<p>Some text here...</p>
					<Input ref="tokenAmount" type="text" label="Amount of tokens" value={this.state.value} onChange={this.handleInputChangeVal} floatingLabel={true} required={true} />
					<Input ref="toAccount" type="text" label="Account address" value={this.state.address} onChange={this.handleInputChangeAddr} floatingLabel={true} required={true} />
					<Button type="submit" onClick={this.handleSubmit} color="primary" variant="raised">Submit</Button>
				</Container>
			</Form>
		);
	}
};

export default SellTokens
