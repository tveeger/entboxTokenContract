import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const styles = {
	paper_content: {
		padding: 15,
		marginTop: 15,
		marginBottom: 15,
	}
};

class About extends React.Component {
	render() {
		return (
			<div style={styles.paper_content}>
				<h2>About...</h2>
				<p>
					Chains of Freedom is a foundation based in The Netherlands...
				</p>
			</div>
		)
	}
}

export default About;