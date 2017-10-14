import React, { Component } from 'react';

class HeightCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			height: props.height,
			altitude: props.altitude
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			height: nextProps.height,
			altitude: nextProps.altitude
		});
	}

	render() {
		return (
			<div className="card" style={{ maxWidth: 100 + '%' }}>
				<div className="card-body">
					<h4 className="card-title">Wysokość drona:</h4>
					<p className="card-text">Wysokość względna: {this.state.height} m</p>
					<p className="card-text">
						Wysokość bezwzględna: {this.state.altitude} m n.p.m.
					</p>
				</div>
			</div>
		);
	}
}

export default HeightCard;
