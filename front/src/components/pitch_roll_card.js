import React, { Component } from 'react';

class PitchRollCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pitch: props.pitch,
			roll: props.roll
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			pitch: nextProps.pitch,
			roll: nextProps.roll
		});
	}

	render() {
		return (
			<div className="card" style={{ maxWidth: 100 + '%' }}>
				<div className="card-body">
					<h4 className="card-title">Pochylenie i przechylenie drona:</h4>
					<p className="card-text">
						Pochylenie (pitch): {this.state.pitch} stopni
					</p>
					<p className="card-text">
						Przechylenie (roll): {this.state.roll} stopni
					</p>
				</div>
			</div>
		);
	}
}

export default PitchRollCard;
