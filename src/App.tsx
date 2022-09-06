import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppRouter } from './components/AppRouter';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { useAppSelector } from './hooks/redux';
import { authSlice } from './store/reducers/auth';
import './styles.scss';

const App: FC = () => {
	const { changeAuth, changeUsername, changeIsLoading } = authSlice.actions;
	const { isLoading } = useAppSelector((state) => state.authReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		const username = localStorage.getItem("username");
		if (username) {
			dispatch(changeIsLoading(true));
			dispatch(changeAuth(true));
			dispatch(changeUsername(username));
			dispatch(changeIsLoading(false));
		};
	}, []);

	return (
		<div className="App">
			{isLoading ? <Loader /> : (
				<>
					<Header />
					<AppRouter />
				</>
			)}

		</div>
	);
};

export default App;
