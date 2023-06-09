import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Main.module.css';
import { ItemContent } from './ItemContent';
import { EditContent } from './EditItemContent';

export function OneItem({
	product,
	allProductsHandler,
	token,
	categoryList,
	setOneProduct,
}) {
	const [editingMode, setEditingMode] = useState(false);

	const EditingModeHandler = () => {
		if (editingMode) {
			setEditingMode(false);
		} else {
			setEditingMode(true);
		}
	};

	//

	return (
		<>
			{!editingMode && (
				<ItemContent
					product={product}
					allProductsHandler={allProductsHandler}
					EditingModeHandler={EditingModeHandler}
					token={token}
				/>
			)}
			{editingMode && (
				<EditContent
					setOneProduct={setOneProduct}
					product={product}
					allProductsHandler={allProductsHandler}
					EditingModeHandler={EditingModeHandler}
					token={token}
					categoryList={categoryList}
				/>
			)}
		</>
	);
}
