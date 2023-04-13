import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classes from './Main.module.css';

export function EditContent({
	product,
	allProductsHandler,
	EditingModeHandler,
	token,
	categoryList,
	setOneProduct,
}) {
	const [name, setName] = useState(product.name);
	const [price, setPrice] = useState(product.price);
	const [quantity, setQuantity] = useState(product.qty);
	const [category0, setCategory0] = useState(product.categories[0].name);
	const [category1, setCategory1] = useState(product.categories[1].name);

	const saveEditProductHandler = async () => {
		const dataFetch = await fetch(
			'https://matt-menu.onrender.com/product/' + product._id,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify({
					name: name,
					price: price,
					quantity: 14,
					categories: [category0, category1],
				}),
			},
		);

		if (!dataFetch) {
			alert('Edit Problem!');
			return null;
		}

		const result = await dataFetch.json();
		const newProduct = result?.product;

		if (!newProduct) {
			alert('Product no found!');
			return null;
		}

    newProduct.categories = [{ name: category0 }, {name: category1 }]
		setOneProduct(newProduct);

		EditingModeHandler();
	};

	return (
		<div className={classes.mainDiv}>
			<>
				<div className={classes.itemContainer}>
					<div className={classes.imageContainer}></div>
					<div className={classes.editContainer}>
						<div className={classes.titleContainer}>
							<input
								type="text"
								defaultValue={name}
								onInput={(ev) => {
									setName(ev.target.value);
								}}
							/>
						</div>
						<div className={classes.infosContainer}>
							<p>
								Categories:{' '}
								<select
									className={classes.categories}
									name="category0"
									defaultValue={category0}
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
												<option value={category.name}>{category.name}</option>
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
												<option value={category.name}>{category.name}</option>
											);
										})}
								</select>
							</p>
							<p>
								Price:{' '}
								<input
									type="number"
									defaultValue={price}
									onInput={(ev) => {
										setPrice(ev.target.value);
									}}
								/>
							</p>
							<p>
								Quantity:{' '}
								<input
									type="number"
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
							onClick={saveEditProductHandler}
						>
							Salvar
						</Link>
					</div>
				</div>
				<Link
					className={classes.button}
					onClick={allProductsHandler}
				>
					Voltar
				</Link>
			</>
		</div>
	);
}
