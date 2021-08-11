const REFRESH_TOKEN_KEY = "@nodePortifolio-Token";

const inMemoryJWTManager = () => {
	let inMemoryJWT = null;
	let inMemoryUser = null;

	const getAccessToken = () => { return inMemoryJWT; }

	const setAccessToken = (token) => {
		inMemoryJWT = token;
		return true;
	}

	const removeAccessToken = () => {
		inMemoryJWT = null;
		return true;
	}

	const getRefreshToken = () => { return localStorage.getItem(REFRESH_TOKEN_KEY); }

	const setRefreshToken = (refreshToken) => {
		localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
		return true;
	}

	const removeRefreshToken = () => {
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		return true;
	}

	const isAuthenticated = () => {
		if(inMemoryJWT !== null) {
			return true;
		} else {
			return false;
		}
	}

	const getUser = () => { return inMemoryUser; }

	const setUser = (user) => {
		inMemoryUser = user;
	}

	const removeUser = () => {
		inMemoryUser = null;
		return true;
	}

	const isEmailConfirmed = () => {
		if(inMemoryUser.emailIsConfirmed === 'true') {
			return true;
		} else {
			return false;
		}
	}

	const isAuthorized = () => {
		if(inMemoryUser && inMemoryUser.role) {
			if(inMemoryUser.role === "User" || inMemoryUser.role === "Admin") {
				return true;
			}
		}
		return false;
	}

	return {
		getAccessToken,
		setAccessToken,
		removeAccessToken,
		getRefreshToken,
		setRefreshToken,
		removeRefreshToken,
		isAuthenticated,
		getUser,
		setUser,
		removeUser,
		isEmailConfirmed,
		isAuthorized
	}
}

export default inMemoryJWTManager();