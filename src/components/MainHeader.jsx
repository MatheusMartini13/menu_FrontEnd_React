import { Link } from 'react-router-dom';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import classes from './MainHeader.module.css';

function MainHeader() {
	const navigate = useNavigate();

	const mainMenuHandler = () => {
		navigate('/')
	}

	return (
		<header className={classes.header}>
			<h1
				className={classes.logo}
				onClick={mainMenuHandler}
			>
				<MdOutlineRestaurantMenu />
				Matt - Menu
			</h1>
			<p>
				<Link
					to="/"
					className={classes.button}
				>
					<MdOutlineRestaurantMenu size={18} />
					New Product
				</Link>
			</p>
		</header>
	);
}

export default MainHeader;
