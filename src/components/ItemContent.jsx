import { Link } from 'react-router-dom';
import classes from './Main.module.css';

export function ItemContent({
	product,
	allProductsHandler,
	EditingModeHandler,
	token,
}) {
	async function deleteHandler() {
		const deleteData = await fetch(
			'https://matt-menu.onrender.com/product' + product._id,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			},
		);
		if (!deleteData) {
			alert('Delete Problem!');
			return null;
		}
		const result = await deleteData.json();
		result?.message ? alert(result.message) : console.log('No message');
		allProductsHandler();
	}

	return (
		<div className={classes.mainDiv}>
			<>
				<div className={classes.itemContainer}>
					<div className={classes.imageContainer}></div>
					<div className={classes.editContainer}>
						<div className={classes.titleContainer}>
							<p>{product.name}</p>
						</div>
						<div className={classes.infosContainer}>
							<p>
								Categories:{' '}
								{product.categories.map((cat) => {
									return (
										<span key={product._id + cat.name}>
											{'| ' + cat.name + ' | '}
										</span>
									);
								})}
							</p>
							<p>Price: {product.price}</p>
							<p>Quantity: {product.qty}</p>
						</div>
					</div>
					<div className={classes.buttonContainer}>
						<Link
							className={classes.button}
							onClick={EditingModeHandler}
						>
							Edit
						</Link>
						<Link
							className={classes.button}
							onClick={deleteHandler}
						>
							Delete
						</Link>
					</div>
				</div>
				<Link
					className={classes.button}
					onClick={allProductsHandler}
				>
					Return
				</Link>
			</>
		</div>
	);
}
