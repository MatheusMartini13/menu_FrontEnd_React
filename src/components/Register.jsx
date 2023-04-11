import { Link, Form } from 'react-router-dom';

import classes from './Main.module.css';

export function Register(props) {
	return (
		<div className={classes.mainDiv}>
			<h1>Register</h1>
			<Form className={classes.smallDiv}>
				<label
					htmlFor="username"
					className={classes.textDecorated}
				>
					Username:
				</label>
				<input
					type="text"
					name="username"
				/>

				<label
					htmlFor="password"
					className={classes.textDecorated}
				>
					Password:
				</label>
				<input
					type="password"
					name="password"
				/>
				<button className={classes.button}>Register</button>
				<Link
					className={classes.button}
					onClick={props.returnHandler}
				>
					Return
				</Link>
			</Form>
		</div>
	);
}
