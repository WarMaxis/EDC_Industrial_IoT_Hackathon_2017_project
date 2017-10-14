import React from 'react';

import detonateImage from '.././images/detonate_image.jpg';

function CrashButton() {
	let test = () => {
		console.log('dupa');
	};

	return (
		<div className="jumbotron jumbotron-fluid">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="display-3 text-center">ROZBIJ DRONA!</h1>
						<button
							onClick={test}
							type="button"
							className="btn btn-danger btn-lg btn-block"
							data-toggle="modal"
							data-target="#Modal"
						>
							OKEEJ!
						</button>
					</div>
				</div>
			</div>

			<div
				className="modal fade"
				id="Modal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
				data-backdrop="static"
				data-keyboard="false"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<img
										src={detonateImage}
										alt="boom!"
										style={{ width: 100 + '%' }}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CrashButton;
