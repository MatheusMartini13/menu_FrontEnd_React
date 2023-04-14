//imports
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import MainHeader from '../components/MainHeader';
import { Login } from '../components/Login';
import { ItemList } from '../components/ItemList';
import { Register } from '../components/Register';
import { OneItem } from '../components/OneItem';
import { NewProduct } from '../components/NewProduct';
import { Loading } from '../components/Loading';

export function RootLayout() {
	const navigate = useNavigate();
	const [isAuth, setIsAuth] = useState(false);
	const [token, setToken] = useState('Bearer ');
	const [productsList, setProductsList] = useState({});
	const [oneProduct, setOneProduct] = useState(false);
	const [categoryList, setCategoryList] = useState('');
	const [newProduct, setNewProduct] = useState('');
	const [isFetching, setIsFetching] = useState(false);

	async function newProductHandler() {
		if (!newProduct) {
			setNewProduct(true);
		} else {
			await getProductsHandler(token);
			setNewProduct(false);
		}
	}

	function registerHandler() {
		setIsAuth('registering');
	}

	const returnHandler = () => {
		setIsAuth(false);
	};

	const productsHandler = () => {
		setIsAuth('auth');
	};

	const categoriesHandler = async (token) => {
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
		setCategoryList(categoryData.categories);
	};

	const checkProductHandler = async (productId) => {
		setIsFetching(true);
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
		setIsFetching(false);
		return newProduct;
	};

	const allProductsHandler = async () => {
		setIsFetching(true);
		await getProductsHandler(token);
		setOneProduct(false);
		setIsFetching(false);
	};

	const getProductsHandler = async (authToken) => {
		if (authToken === 'Bearer ') {
			returnHandler();
			return null;
		}

		const result = await fetch('https://matt-menu.onrender.com/product', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authToken,
			},
		});

		if (!result) {
			alert('Authentication Problem, please login again!');
			setToken('Bearer ');
			returnHandler();
			return null;
		}
		const productsData = await result.json();
		setProductsList(productsData);
	};

	async function loginHandler(user) {
		setIsFetching(true);
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
		const receivedToken = 'Bearer ' + data.token;
		setToken(receivedToken);

		productsHandler();
		await getProductsHandler(receivedToken);
		await categoriesHandler(receivedToken);
		setIsFetching(false);
	}

	return (
		<>
			<MainHeader
				newProductHandler={newProductHandler}
				isAuth={isAuth}
			/>
			{isFetching && <Loading />}
			{!isAuth && (
				<Login
					loginHandler={loginHandler}
					registerHandler={registerHandler}
				/>
			)}

			{isAuth === 'registering' && <Register returnHandler={returnHandler} />}

			{isAuth === 'auth' && oneProduct === false && (
				<ItemList
					getOneProduct={checkProductHandler}
					products={productsList}
				/>
			)}

			{isAuth === 'auth' && oneProduct !== false && (
				<OneItem
					product={oneProduct}
					setOneProduct={setOneProduct}
					allProductsHandler={allProductsHandler}
					token={token}
					categoryList={categoryList}
				/>
			)}

			{newProduct && (
				<NewProduct
					newProductHandler={newProductHandler}
					categoryList={categoryList}
					token={token}
				/>
			)}
		</>
	);
}

export const loader = async () => {};
