export const SignInQuery = (username,password,SignInMutation) => {
	if (!username.length){
			return "Введите логин"
		} else if (!password.length) {
			return "Введите пароль"
		}
   return SignInMutation({
			variables: {
				body: {
					username: username,
					password: password
				}
			}
		}).then(({ data }) =>
			window.localStorage.setItem("accessToken", data.signIn.accessToken)
		).catch((errors) => {
			return errors.message;
		})
};