import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const styles = {
	paper_content: {
		padding: 15,
		marginTop: 15,
		marginBottom: 15,
	}
};

class Charity extends React.Component {
	render() {
		return (
			<div style={styles.paper_content}>
				<h2>Charities</h2>
				<p>
					If you are an charity executive and like to add your organization to our list, 
					please mail us at info@chainsoffreedom.org.
				</p>
			</div>
		)
	}
}

export default Charity