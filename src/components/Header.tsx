import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { logout } from "../store/reducers/actionCreators";

export const Header: FC = () => {
	const { isAuth, username } = useAppSelector((state) => state.authReducer);
	const dispatch = useAppDispatch();

	return (
		<div className="header">
			<div className="container header__container">
				<div className="header__body">
					<div className="header__logo">
						Kipa Calendar
					</div>
					<div className="header__buttons">
						{isAuth ? (
							<>
								<span className="header__username">{username}</span>
								<button className="header__button" onClick={() => dispatch(logout())}>
									Logout
								</button>
							</>
						) : (
							<div className="header__button">
								Login
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}