import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<div>
			<div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
				<h1 className="text-center">Welcome to the Homepage</h1>
				<p className="text-center">This is the main page of our application.</p>
				<div>
					<span></span>
					<Link to="/home">
						<button className="btn btn-secondary ms-3 px-4">User Home</button>
					</Link>

					<Link to="/home">
						<button className="btn btn-secondary ms-3 px-4">User Home</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
