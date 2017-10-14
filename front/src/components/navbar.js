import React, { Component } from 'react';

class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			drones: ['Predator', 'Zwykły dron', 'Mini spy', 'Mavick'],
			currentDrones: 'Predator'
		};
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<span className="navbar-brand">CebulaDrone App</span>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbar"
					aria-controls="navbar"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbar">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item dropdown">
							<a
								className="nav-item nav-link dropdown-toggle mr-md-2"
								href=""
								id="user-options"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Michał Milanowski
							</a>
							<div
								className="dropdown-menu dropdown-menu-left"
								aria-labelledby="user-options"
							>
								<a className="dropdown-item" href="">
									Konto
								</a>
								<a className="dropdown-item" href="">
									Ustawienia
								</a>
								<div className="dropdown-divider" />
								<a className="dropdown-item" href="">
									Wyloguj
								</a>
							</div>
						</li>
					</ul>
					<div className="btn-group">
						<button
							type="button"
							className="btn btn-outline-warning dropdown-toggle"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							{this.state.currentDrones}
						</button>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="">
								{this.state.drones[1]}
							</a>
							<a className="dropdown-item" href="">
								{this.state.drones[2]}
							</a>
							<a className="dropdown-item" href="">
								{this.state.drones[3]}
							</a>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
