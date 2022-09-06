import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { login } from "../store/reducers/actionCreators";

export const LoginForm: FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const dispatch = useAppDispatch();
	const { error, isLoading } = useAppSelector((state) => state.authReducer);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (username && password) {
			dispatch(login({ username, password }));
		} else {
			alert("Введите и логин и пароль");
		};
	};

	return (
		<form className="form" onSubmit={(e) => onSubmit(e)}>
			{error && <div className="form__error">{error}</div>}
			<div className="form__item">
				<input type="txt" className="input" placeholder="Login" onChange={(e) => setUsername(e.target.value)} />
			</div>
			<div className="form__item">
				<input type="password" className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
			</div>
			<div className="form__item">
				<button type="submit" className="form__button" disabled={isLoading} >sign in</button>
			</div>
		</form>
	)
}