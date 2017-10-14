import React, { Component } from 'react';

class AzimuthCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			azimuth: props.azimuth
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			azimuth: nextProps.azimuth
		});
	}

	render() {
		return (
			<div className="card" style={{ maxWidth: 100 + '%' }}>
				<div className="card-body">
					<h4 className="card-title">Azymut drona:</h4>
					<p className="card-text">{this.state.azimuth} stopni</p>
					<p className="card-text">&nbsp;</p>
				</div>
			</div>
		);
	}
}

export default AzimuthCard;
