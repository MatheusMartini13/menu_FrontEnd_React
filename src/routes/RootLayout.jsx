//imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import MainHeader from '../components/MainHeader';
import { Login } from '../components/Login';
import { ItemList } from '../components/ItemList';
import { Register } from '../components/Register';
import { OneItem } from '../components/OneItem';

export function RootLayout() {
	const navigate = useNavigate();
	const [isAuth, setIsAuth] = useState(false);
	const [token, setToken] = useState('Bearer ');
	const [productsList, setProductsList] = useState({});
	const [oneProduct, setOneProduct] = useState(false);
	const [categoryList, setCategoryList] = useState('');

	function registerHandler() {
		setIsAuth('registering');
	}

	const returnHandler = () => {
		setIsAuth(false);
	};

	const productsHandler = () => {
		setIsAuth('auth');
	};

	const categoriesHandler = async () => {
		const dataFetch = await fetch('https://matt-menu.onrender.com/category', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		if (!dataFetch) {
			alert('Server Error.');
			return navigate('/');
		}

		const categoryData = await dataFetch.json();
		setCategoryList(categoryData.categories)
	};

	const checkProductHandler = async (productId) => {
		const productData = await fetch(
			'https://matt-menu.onrender.com/product' + productId,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			},
		);

		if (!productData) {
			alert('This product was not found!');
			return navigate('/');
		}

		const product = await productData.json();
		const newProduct = product.product;
		setOneProduct(newProduct);
		return newProduct;
	};

	const allProductsHandler = () => {
		setOneProduct(false);
	};

	const getProductsHandler = async () => {
		if (token === 'Bearer ') {
			returnHandler();
			return null;
		}

		const result = await fetch('https://matt-menu.onrender.com/product', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});

		if (!result) {
			alert('Authentication Problem, please login again!');
			token = 'Bearer ';
			returnHandler();
			return null;
		}
		const productsData = await result.json();
		setProductsList(productsData);
	};

	async function loginHandler(user) {
		const resData = await fetch('https://matt-menu.onrender.com/auth/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ',
			},
		});
		const data = await resData.json();
		if (!data.token) {
			alert(
				'Ocorreu um erro no login. Tente outras credenciais ou se registre.',
			);
			returnHandler();
			return;
		}
		setToken('Bearer ' + data.token);
		productsHandler();
		navigate('/');
	}

	return (
		<>
			<MainHeader />
			{!isAuth && (
				<Login
					loginHandler={loginHandler}
					registerHandler={registerHandler}
				/>
			)}

			{isAuth === 'registering' && <Register returnHandler={returnHandler} />}

			{isAuth === 'auth' && oneProduct === false && (
				<ItemList
					getProductsHandler={getProductsHandler}
					getOneProduct={checkProductHandler}
					products={productsList}
					categoriesHandler={categoriesHandler}
				/>
			)}

			{isAuth === 'auth' && oneProduct !== false && (
				<OneItem
					product={oneProduct}
					setOneProduct = {setOneProduct}
					allProductsHandler={allProductsHandler}
					token={token}
					categoryList={categoryList}
				/>
			)}
		</>
	);
}

export const loader = async () => {};
