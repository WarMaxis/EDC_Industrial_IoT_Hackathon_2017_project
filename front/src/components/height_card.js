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
		let verticalChartHeight = (512 - this.state.height) * 100 / 512 + '%',
			verticalChartAltitude = (512 - this.state.altitude) * 100 / 512 + '%';

		return (
			<div className="card" style={{ maxWidth: 100 + '%' }}>
				<div className="card-body">
					<h4 className="card-title">Wysokość drona (MAX: 512 m):</h4>
					<div className="container">
						<div className="row">
							<div className="col">
								<div className="vertical-chart-container red">
									<div
										className="vertical-chart"
										style={{ height: verticalChartHeight }}
									/>
								</div>
								<p className="card-text">
									Wysokość względna:<br />
									{this.state.height} m
								</p>
							</div>
							<div className="col">
								<div className="vertical-chart-container blue">
									<div
										className="vertical-chart"
										style={{ height: verticalChartAltitude }}
									/>
								</div>
								<p className="card-text">
									Wysokość bezwzględna:<br />
									{this.state.altitude} m n.p.m.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HeightCard;
