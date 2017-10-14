import React, { Component } from 'react';

class AzimuthCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			azimuth: props.azimuth,
			circleDegree: 'p' + Math.floor(this.props.azimuth / 360 * 100)
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			azimuth: nextProps.azimuth,
			circleDegree: 'p' + Math.floor(nextProps.azimuth / 360 * 100)
		});
	}

	render() {
		let circleStyle = {
			transform: 'translateX(-50%)',
			left: '50%'
		};

		return (
			<div className="card" style={{ maxWidth: 100 + '%' }}>
				<div className="card-body text-center">
					<h4 className="card-title card-title-margin-bottom">Azymut drona:</h4>
					<div
						style={circleStyle}
						className={'c100 green ' + this.state.circleDegree}
					>
						<span>{this.state.azimuth}&deg;</span>
						<div className="slice">
							<div className="bar" />
							<div className="fill" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AzimuthCard;
