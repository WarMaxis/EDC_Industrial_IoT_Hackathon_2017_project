import React, { Component } from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';

import DroneCard from './components/drone_card';
import StatusCard from './components/status_card';
import MapCard from './components/map_card';
import HeightCard from './components/height_card';
import AzimuthCard from './components/azimuth_card';
import PitchRollCard from './components/pitch_roll_card';
import CrashButton from './components/crash_button';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			X: 0,
			Y: 0,
			Altitude: 0,
			Height: 0,
			Azimuth: 0,
			Pitch: 0,
			Roll: 0,
			Battery: 0,
			Time: 1
		};
	}

	componentDidMount() {
		this.timer();
	}

	timer = () => {
		setInterval(() => {
			let dataJson;

			fetch('https://backend-cebula.run.aws-usw02-pr.ice.predix.io/getData')
				.then(function(response) {
					return response.json();
				})
				.then(body => {
					dataJson = body;

					this.setState({
						X: dataJson.X.toFixed(2),
						Y: dataJson.Y.toFixed(2),
						Altitude: dataJson.Altitude.toFixed(2),
						Height: dataJson.Height.toFixed(2),
						Azimuth: dataJson.Azimuth.toFixed(2),
						Pitch: dataJson.Pitch.toFixed(2),
						Roll: dataJson.Roll.toFixed(2),
						Battery: dataJson.Battery.toFixed(0)
					});
				})
				.catch(function(error) {
					console.log('Pobieranie danych się zepsuło!', error);
				});
		}, 1000);
	};

	render() {
		return (
			<div className="App">
				<Navbar />

				<div className="container">
					<div className="row section">
						<div className="col-md-6">
							<DroneCard />
						</div>
						<div className="col-md-6">
							<StatusCard battery={this.state.Battery} time={this.state.Time} />
						</div>
					</div>
					<div className="row section">
						<div className="col-md-6">
							<MapCard x={this.state.X} y={this.state.Y} />
						</div>
						<div className="col-md-6">
							<HeightCard
								height={this.state.Height}
								altitude={this.state.Altitude}
							/>
						</div>
					</div>
					<div className="row section">
						<div className="col-md-6">
							<AzimuthCard azimuth={this.state.Azimuth} />
						</div>
						<div className="col-md-6">
							<PitchRollCard pitch={this.state.Pitch} roll={this.state.Roll} />
						</div>
					</div>
				</div>

				<div className="row section justify-content-center">
					<CrashButton />
				</div>

				<Footer />
			</div>
		);
	}
}

export default App;
