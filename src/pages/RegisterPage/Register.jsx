import './styles.css';
import { Link, Navigate } from 'react-router-dom';
import {Button} from "@mui/material";
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../query/user';
import { InputPassword } from '../../components/Inputs/InputPassword';
import { InputText } from '../../components/Inputs/InputText';
import { RegisterQuery } from './RegisterQuery';
import { AlertError} from '../../components/AlertError';

const Register = () => {
	const [newUser] = useMutation(CREATE_USER)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordRepeat, setPasswordRepeat] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	 const handleChange = (event) => {
    if (event.target.name==='Логин'){
			setUsername(event.target.value)
    }else if (event.target.name==='Пароль'){
			setPasswordRepeat(event.target.value)
    }else if (event.target.name==='Повторите пароль'){
			setPassword(event.target.value)
    }
  }
	
	const errorMessageChange = (value) => {
		setErrorMessage(value)
	}
	if (errorMessage === 'Вы зарегистрированы') {
		return <Navigate to="/sign-in"/>;
	}
	return (
		<div>
			{errorMessage &&
				<AlertError errorMassage={errorMessage} errorMessageChange={errorMessageChange}/>}
			<div className={'RegisterWindow'}>
				<center>
					<h1>Регистрация</h1>
					<InputText name={'Логин'} handleChange={handleChange} />
					<InputPassword name={'Пароль'} handleChange={handleChange} />
					<InputPassword name={'Повторите пароль'} handleChange={handleChange} />
					<br /><br />
					<Button
						size='large'
						className={'RegisterButton'}
						onClick={() =>
							RegisterQuery(username, password, passwordRepeat, newUser)
								.then((value) =>
									setErrorMessage(value)
								)
						}
					>
						Зарегистрироваться
					</Button><br></br>
					<Link to='/sign-in'>
						<Button
							size='large'>
							У вас уже есть аккаунт?
						</Button>
					</Link>
				</center>
			</div>
		</div>
	);
};

export default Register;