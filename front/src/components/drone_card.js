import React, { Component } from 'react';

import droneImage from '.././images/drone_predator_image.jpg';

class DroneCard extends Component {
	render() {
		return (
			<div className="card" style={{ maxWidth: 100 + '%' }}>
				<img className="card-img-top" src={droneImage} alt="Predator" />
				<div className="card-body">
					<h4 className="card-title">Predator</h4>
					<p className="card-text">
						Dron bojowy wyjątkowo łatwy w sterowaniu :-)
					</p>
				</div>
			</div>
		);
	}
}

export default DroneCard;
