import React, { Component } from 'react';

class StatusCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			battery: props.battery,
			time: props.time
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			battery: nextProps.battery,
			time: nextProps.time
		});
	}

	render() {
		let batteryStatusWidth = this.state.battery + '%',
			batteryStatusColor = null,
			batteryMessage = 'Wszystkie systemy sprawne',
			alertColor = 'alert alert-success',
			alertStatus = 'OK';

		if (this.state.battery >= 50) {
			batteryStatusColor =
				'progress-bar bg-success progress-bar-striped progress-bar-animated';
		} else if (this.state.battery > 15) {
			batteryStatusColor =
				'progress-bar bg-warning progress-bar-striped progress-bar-animated';
		} else {
			batteryStatusColor =
				'progress-bar bg-danger progress-bar-striped progress-bar-animated';
			batteryMessage = 'UWAGA! Niski poziom baterii drona!';
			alertColor = 'alert alert-danger';
			alertStatus = 'CRITICAL!';
		}

		return (
			<div className="card" style={{ maxWidth: 100 + '%' }}>
				<div className="card-body">
					<h1>Status:</h1>
					<div className={alertColor} role="alert">
						<h4 className="alert-heading">{alertStatus}</h4>
						<hr />
						<p>Dron w ruchu</p>
						<hr />
						<p className="mb-0">{batteryMessage}</p>
					</div>
					<h4 className="card-title">Poziom naładowania baterii:</h4>
					<div className="progress">
						<div
							className={batteryStatusColor}
							role="progressbar"
							style={{ width: batteryStatusWidth }}
						>
							{this.state.battery}%
						</div>
					</div>
					<h4 className="card-title">Częstotliwość odświeżania danych:</h4>
					<span className="badge badge-pill badge-success status-text">
						{this.state.time} s
					</span>
				</div>
			</div>
		);
	}
}

export default StatusCard;
