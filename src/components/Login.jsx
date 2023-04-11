import { useState } from 'react';
import { Link, Form } from 'react-router-dom';
import classes from './Main.module.css';

export function Login(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const passwordHandler = (ev) => {
		setPassword(ev.target.value);
	};

	const loginHandler = (ev) => {
		setUsername(ev.target.value);
	};

	const submitDummyHandler = () => {
		const user = { username: username, password: password };
		props.loginHandler(user);
	};

	return (
		<div className={classes.mainDiv}>
			<h1>Login</h1>
			<Form
				className={classes.smallDiv}
				action="/"
			>
				<label
					htmlFor="username"
					className={classes.textDecorated}
				>
					Username:
				</label>
				<input
					type="text"
					name="username"
					onChange={loginHandler}
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
					onChange={passwordHandler}
				/>
				<Link
					className={classes.button}
					onClick={submitDummyHandler}
				>
					Submit
				</Link>
				<Link
					className={classes.button}
					onClick={props.registerHandler}
				>
					Register
				</Link>
			</Form>
		</div>
	);
}
