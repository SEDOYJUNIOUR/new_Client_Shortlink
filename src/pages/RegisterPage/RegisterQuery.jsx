export const RegisterQuery = async (username, password, passwordRepeat, newUser) => {
		if (password !== passwordRepeat) {
			return "Пароли не совпадают";
		}else if (!username.length){
			return "Введите логин"
		} else if (!password.length) {
			return "Введите пароль"
		}
		return newUser({
			variables: {
				body: {
					username: username,
					password: password
				}
			}
		}).then(() => {
			return 'Вы зарегистрированы'
		}).catch((errors) => {
			return errors.message
		})
	};