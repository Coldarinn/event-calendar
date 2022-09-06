import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const routes = {
	HOME: {
		path: '/',
		element: <Home />
	},
	LOGIN: {
		path: 'login',
		element: <Login />
	},
	REGISTRATION: {
		path: 'registration',
		element: <Registration />
	}
};

export const publicRoutes = [
	{
		path: routes.LOGIN.path,
		element: routes.LOGIN.element
	},
	{
		path: routes.REGISTRATION.path,
		element: routes.REGISTRATION.element
	},
	{
		path: '*',
		element: routes.LOGIN.element
	}
];

export const privateRoutes = [
	{
		path: routes.HOME.path,
		exact: false,
		element: routes.HOME.element
	},
	{
		path: '*',
		exact: false,
		element: routes.HOME.element
	}
];