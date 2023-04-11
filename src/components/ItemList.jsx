import { useEffect } from 'react';
import { Link, Form } from 'react-router-dom';
import classes from './Main.module.css';

export function ItemList({ products, getProductsHandler, getOneProduct }) {
	useEffect(() => {
		getProductsHandler();
	}, []);

	const productArray = products.products;

	return (
		<div className={classes.mainDiv}>
			{productArray && (
				<>
					{productArray.map((prod) => {
						return (
							<div
								className={classes.itemContainer}
								onClick={() => getOneProduct(prod._id)}
								key={prod._id}
							>
								<div className={classes.imageContainer}></div>
								<div className={classes.infoContainer}>
									<div className={classes.titleContainer}>
										<p>{prod.name}</p>
									</div>
									<div className={classes.infosContainer}>
										<p>
											Categories:{' '}
											{prod.categories.map((cat) => {
												return (
													<span key={cat._id + prod._id}>
														{'| ' + cat.name + ' | '}
													</span>
												);
											})}
										</p>
										<p>Price: {prod.price}</p>
										<p>Quantity: {prod.qty}</p>
									</div>
								</div>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
}
