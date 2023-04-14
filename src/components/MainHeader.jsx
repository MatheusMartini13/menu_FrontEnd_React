import { Link } from 'react-router-dom';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import classes from './MainHeader.module.css';

function MainHeader({ newProductHandler, isAuth }) {
	const navigate = useNavigate();

	const mainMenuHandler = () => {
		navigate('/');
	};

	return (
		<header className={classes.header}>
			<h1
				className={classes.logo}
				onClick={mainMenuHandler}
			>
				<MdOutlineRestaurantMenu />
				Matt - Menu
			</h1>
			{isAuth && (
				<p>
					<Link
						onClick={newProductHandler}
						className={classes.button}
					>
						<MdOutlineRestaurantMenu size={18} />
						New Product
					</Link>
				</p>
			)}
		</header>
	);
}

export default MainHeader;
