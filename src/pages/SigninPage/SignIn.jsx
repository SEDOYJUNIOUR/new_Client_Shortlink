import './styles.css';
import { Link, Navigate } from 'react-router-dom';
import {Button} from "@mui/material";
import React, {useState} from "react";
import { useMutation} from '@apollo/client';
import { SIGN_IN } from '../../query/user';
import { InputText } from '../../components/Inputs/InputText';
import { InputPassword } from '../../components/Inputs/InputPassword';
import { SignInQuery } from './SignInQuery';
import { AlertError } from '../../components/AlertError';

const SignIn = () => {
	const [SignInMutation] = useMutation(SIGN_IN)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	
	const handleChange = (event) => {
    if (event.target.name==='Логин'){
			setUsername(event.target.value)
    } else if (event.target.name==='Пароль'){
			setPassword(event.target.value)
    }
  }
	
	const errorMessageChange = (value) => {
		setErrorMessage(value)
	}
	
	if ("accessToken" in window.localStorage) {
		return <Navigate to="/shortLink"/>;
	}
	
	return (
		<div>
			{errorMessage &&
				<AlertError errorMassage={errorMessage} errorMessageChange={errorMessageChange}/>}
			<div className={'SignInWindow'}>
				<center>
					<h1 className={'SignInTitle'}>Вход</h1>
					<InputText name={'Логин'} handleChange={handleChange} />
					<InputPassword name={'Пароль'} handleChange={handleChange} /><br /><br />
					<Link to="/">
						<Button
							sx={{ marginRight: 20 }}
							size="large">
							Назад
						</Button>
					</Link>
					<Button
						onClick={() =>
							SignInQuery(username, password, SignInMutation)
								.then((value) =>
									setErrorMessage(value)
								)
					}
						className={'SignIButton'}
						size="large">
						Войти
					</Button>
				</center>
			</div>
		</div>
	);
};

export default SignIn;