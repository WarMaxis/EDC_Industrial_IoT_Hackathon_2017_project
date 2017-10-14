import React, { Component } from 'react';

class MapCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coordX: props.x,
			coordY: props.y
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			coordX: nextProps.x,
			coordY: nextProps.y
		});
	}

	render() {
		return (
			<div className="card" style={{ maxWidth: 100 + '%' }}>
				<div className="card-body">
					<h4 className="card-title">Położenie drona:</h4>
					<p className="card-text">Współrzędna X: {this.state.coordX} m</p>
					<p className="card-text">Współrzędna Y: {this.state.coordY} m</p>
				</div>
			</div>
		);
	}
}

export default MapCard;
