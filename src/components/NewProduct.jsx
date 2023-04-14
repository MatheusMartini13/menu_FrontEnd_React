import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './NewProduct.module.css';

export function NewProduct({ newProductHandler, categoryList, token }) {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [quantity, setQuantity] = useState('');
	const [category0, setCategory0] = useState('hamburguer');
	const [category1, setCategory1] = useState('beef burguer');

	async function createProductHandler() {
		const product = {
			name: name,
			price: price,
			quantity: quantity,
			categories: [category0, category1],
		};

		const productData = await fetch('https://matt-menu.onrender.com/product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			body: JSON.stringify(product),
		});

		const result = await productData.json();
		result?.message ? alert(result.message) : console.log('No message');
		newProductHandler()
	}

	return (
		<>
			<div className={classes.background}></div>
			<dialog
				open
				className={classes.modal}
			>
				<div className={classes.mainDiv}>
					<>
						<div className={classes.itemContainer}>
							<div className={classes.imageContainer}></div>
							<div className={classes.editContainer}>
								<div className={classes.infosContainer}>
									<p>
										Name:{' '}
										<input
											name={'name'}
											type="text"
											defaultValue={name}
											onInput={(ev) => {
												setName(ev.target.value);
											}}
										/>
									</p>
									<p>
										Categories:{' '}
										<select
											className={classes.categories}
											name="category0"
											defaultValue={'hamburguer'}
											onChange={(ev) => {
												setCategory0(ev.target.value);
											}}
										>
											{categoryList
												.filter((category) => {
													return !category.parent;
												})
												.map((category) => {
													return (
														<option
															key={category.name}
															value={category.name}
														>
															{category.name}
														</option>
													);
												})}
										</select>{' '}
										<select
											className={classes.categories}
											name="category1"
											defaultValue={category1}
											onChange={(ev) => {
												setCategory1(ev.target.value);
											}}
										>
											{categoryList
												.filter((category) => {
													return category?.parent?.name === category0;
												})
												.map((category) => {
													return (
														<option
															key={category.name}
															value={category.name}
														>
															{category.name}
														</option>
													);
												})}
										</select>
									</p>
									<p>
										Price:{' '}
										<input
											name={'price'}
											type="text"
											defaultValue={price}
											onInput={(ev) => {
												setPrice(ev.target.value);
											}}
										/>
									</p>
									<p>
										Quantity:{' '}
										<input
											name={'quantity'}
											type="text"
											defaultValue={quantity}
											onInput={(ev) => {
												setQuantity(ev.target.value);
											}}
										/>
									</p>
								</div>
							</div>
							<div className={classes.buttonContainer}>
								<Link
									className={classes.button}
									onClick={createProductHandler}
								>
									Save
								</Link>
							</div>
						</div>
						<Link
							className={classes.button}
							onClick={newProductHandler}
						>
							Cancel
						</Link>
					</>
				</div>
			</dialog>
		</>
	);
}
