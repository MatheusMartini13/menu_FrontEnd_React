import { MdOutlineRestaurantMenu } from 'react-icons/md';
import classes from './Loading.module.css';

export function Loading() {
	return (
		<div className={classes.loadDiv}>
      <h1>Loading...</h1>
			<MdOutlineRestaurantMenu className={classes.logo} />
      <p>Please wait while we load the data.</p>
		</div>
	);
}
