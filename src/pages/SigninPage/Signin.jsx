import './styles.css';
import {useForm} from "react-hook-form";
import { Link, Navigate } from 'react-router-dom';
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import { useMutation} from '@apollo/client';
import { SIGN_IN, SignIn } from '../../query/user';

const Signin = () => {
	const [SignIn] = useMutation(SIGN_IN)
	const [showPassword, setShowPassword] = useState(false);
	
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	// const isAuth = useSelector(selectIsAuth);
	const {
		register,
		handleSubmit,
		formState: {errors, isValid},
	} = useForm({
		defaultValues: {
			username: "Вася Пупкин",
			password: "1234",
		},
		mode: "onChange",
	});
	
	const onSubmit = async (values) => {
		SignIn({
			variables: {
				body: {
					username: values.username,
					password: values.password
				}
			}
		}).catch((errors) => {
			console.log(errors.message)
			if (errors?.message) {
			return alert("Такого пользователя не существует");
		}}).then(({ data }) => {
			window.localStorage.setItem("accessToken", data.signIn.accessToken);
		})
	};
	if ("accessToken" in window.localStorage) {
		return <Navigate to="/shortLink"/>;
	}
	return (
		<div>
			<div className={'SigninWindow'}>
				<center>
					<h1 className={'SigninTitle'}>Вход</h1><br></br>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							error={Boolean(errors.username?.message)}
							helperText={errors.username?.message}
							{...register("username", {required: "Укажите логин"})}
							label='Логин'
							className={'SigninInput'}/><br></br><br></br><br></br>
						<FormControl variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
							<OutlinedInput
								error={Boolean(errors.password?.message)}
								helperText={errors.password?.message}
								{...register("password", {required: "Укажите пароль"})}
								label='Пароль'
								className={'SigninInput'}
								type={showPassword ? 'text' : 'password'}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <Visibility/> : <VisibilityOff/>}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl><br/><br/><br/>
						<Link to='/'>
							<Button
								sx={{marginRight: 20}}
								size='large'>
								Назад
							</Button>
						</Link>
						<Button
							className={'SigninButtom'}
							disabled={!isValid}
							type="submit"
							size="large">
							Войти
						</Button>
					</form>
				</center>
			</div>
		</div>
	);
};

export default Signin;