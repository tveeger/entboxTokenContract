import React, { Component } from 'react';

const styles = {
	paper_content: {
		padding: 15,
		marginTop: 15,
		marginBottom: 15,
	}
};

class Terms extends React.Component {
	render() {
		return (
			<div style={styles.paper_content}>
				<h2>Terms</h2>
				<p>
					Usage of this app ....
				</p>
			</div>
		)
	}
}

export default Terms;