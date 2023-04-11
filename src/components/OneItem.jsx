import { useEffect, useState } from 'react';
import { Link, Form } from 'react-router-dom';
import classes from './Main.module.css';

export function OneItem({ product, allProductsHandler }) {
	return (
		<div className={classes.mainDiv}>
			<>
				<div className={classes.itemContainer}>
					<div className={classes.imageContainer}></div>
					<div className={classes.infoContainer}>
						<div className={classes.titleContainer}>
							<p>{product.name}</p>
						</div>
						<div className={classes.infosContainer}>
							<p>
								Categories:{' '}
								{product.categories.map((cat) => {
									return (
										<span key={cat._id + product._id}>
											{'| ' + cat.name + ' | '}
										</span>
									);
								})}
							</p>
							<p>Price: {product.price}</p>
							<p>Quantity: {product.qty}</p>
						</div>
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
