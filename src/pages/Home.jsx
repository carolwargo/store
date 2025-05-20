import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<div>
			<div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100">
				<h1 className="text-center">Welcome to the Homepage</h1>
				<p className="text-center">This is the main page of our application.</p>
				<div>
					<Link to="/checkout">
						<button className="btn btn-primary px-4">Go to Checkout</button>
					</Link>

					<Link to="/shop">
						<button className="btn btn-secondary ms-3 px-4">Shop Now</button>
					</Link>
				</div>
			</div>
			    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to My Online Store
      </Typography>
      <Typography variant="h5" gutterBottom>
        Discover our amazing products!
      </Typography>
      <Button variant="contained" component={Link} to="/shop" sx={{ mt: 2 }}>
        Shop Now
      </Button>
    </Box>
		</div>
	);
}
