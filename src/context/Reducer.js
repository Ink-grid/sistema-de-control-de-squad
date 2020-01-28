/** @format */

const initialState = {
	user: JSON.parse(localStorage.getItem('user')),
	login: JSON.parse(localStorage.getItem('login')),
	horas: JSON.parse(localStorage.getItem('horas')),
	porcentaje: JSON.parse(localStorage.getItem('porcentaje'))
};

const types = {
	SET_USER: 'SET_USER',
	SET_LOGIN: 'SET_LOGIN',
	SET_HORAS: 'SET_HORAS',
	SET_PORCENTAJE: 'SET_PORCENTAJE'
};

const reducer = (state = initialState, action) => {
	//console.log({ oldState: state, type: action.type, payload: action.payload });
	switch (action.type) {
		case types.SET_USER:
			localStorage.setItem('user', JSON.stringify(action.payload));
			return {
				...state,
				user: action.payload
			};
		case types.SET_LOGIN:
			localStorage.setItem('login', JSON.stringify(action.payload));
			return {
				...state,
				login: action.payload
			};

		case types.SET_HORAS:
			localStorage.setItem('horas', JSON.stringify(action.payload));
			return {
				...state,
				horas: action.payload
			};

		case types.SET_PORCENTAJE:
			localStorage.setItem('porcentaje', JSON.stringify(action.payload));
			return {
				...state,
				porcentaje: action.payload
			};

		default:
			throw new Error('Unexpected action');
	}
};
export { initialState, types, reducer };
