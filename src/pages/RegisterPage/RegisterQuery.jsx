import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../query/user';
import { useState } from 'react';
import { log } from 'qrcode/lib/core/galois-field';

export const RegisterMutation = async (values, newUser) => {
  // const [newUser] = useMutation(CREATE_USER)
		if (values.password !== values.passwordRepeat) {
			return alert("Пароли не совпадают");
		}
		newUser({
			variables: {
				body: {
					username: values.username,
					password: values.password
				}
			}
		}).catch((errors) => {
			return alert(errors.message);
		})
	};