import React from 'react';

const Navbar = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		<span className="navbar-brand">CebulaDrone App</span>
		<button
			className="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span className="navbar-toggler-icon" />
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item dropdown">
					<a
						className="nav-item nav-link dropdown-toggle mr-md-2"
						href="#"
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
						<a className="dropdown-item" href="#">
							Konto
						</a>
						<a className="dropdown-item" href="#">
							Ustawienia
						</a>
						<div class="dropdown-divider" />
						<a className="dropdown-item" href="#">
							Wyloguj
						</a>
					</div>
				</li>
			</ul>
			<div class="btn-group">
				<button
					type="button"
					class="btn btn-outline-warning dropdown-toggle"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					Predator
				</button>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="#">
						Zwykły dron
					</a>
					<a class="dropdown-item" href="#">
						Mini spy
					</a>
					<a class="dropdown-item" href="#">
						Mavick
					</a>
				</div>
			</div>
		</div>
	</nav>
);

export default Navbar;
