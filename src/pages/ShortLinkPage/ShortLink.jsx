import './styles.css';

import React from 'react';
import { useState } from 'react';
import {Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {Header} from "../../components/Header/Header";
import { useMutation } from '@apollo/client';
import { GET_SHORT_LINK } from '../../query/user';
import { InputShortLink } from '../../components/Inputs/InputShortLink';
import ShortLinkQuery from './ShortLinkQuery';
import ShortLinkPopWindow from './ShortLinkPopWindow';
import { AlertError } from '../../components/AlertError';

const ShortLink = () => {
	const [ShortLinkMutation] = useMutation(GET_SHORT_LINK)
	const [link, setLink] = useState('');
	const [userLink, setUserLink] = useState('');
	const [shortLink, setShortLink] = useState('');
	const [open, setOpen] = useState(false);
	const [qrcode, setQrcode] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	
	 const handleChange = (event) => {
    if (event.target.name==='Ссылка'){
			setLink(event.target.value)
    }else if (event.target.name==='Собственная ссылка'){
			setUserLink(event.target.value)
    }
  }
	
	const openChange = (value) => {
		setOpen(value)
	}
	const qrcodeChange = (value) => {
		setQrcode(value)
		setOpen(true)
	}
	
	const errorMessageChange = (value) => {
		setErrorMessage(value)
	}

	return (
		<div>
			<Header/>
			{errorMessage &&
				<AlertError errorMassage={errorMessage} errorMessageChange={errorMessageChange}/>}
			<div className={'ShortLinkWindow'}>
				<p className={'logoSmall'}></p>
				<h1 className={'ShortLinkTitle'}>Кликер</h1>
				<p className={'ShortLinkText'}>
					Помогите клиентам быстро найти вашу страницу в интернете. Благодаря короткой ссылке
					клиентам не придётся видеть длинные url-адреса, занимающие много места.
				</p>
				<InputShortLink name={'Ссылка'} handleChange={handleChange} /><br /><br />
				<InputShortLink name={'Собственная ссылка'} handleChange={handleChange} />
				<Button
					endIcon={<SendIcon />}
					variant="contained"
					className={'ShortLinkButton'}
					onClick={() =>
					{setErrorMessage('');
						ShortLinkQuery(link, userLink, ShortLinkMutation, qrcodeChange)
								.then((value) => {
									if (value[0] === 'data') {
										setShortLink(value[1])
									} else if (value[0] === 'error') {
										setErrorMessage(value[1])
									}
								})
						}}
				>Получить
				</Button>
				<br/><br/>
				{open && (<ShortLinkPopWindow shortLink={shortLink} openChange={openChange} qrcode={qrcode}/>)}
			</div>
		</div>
	);
};
export default ShortLink;