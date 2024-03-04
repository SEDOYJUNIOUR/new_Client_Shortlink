import './styles.css';

import {useForm} from "react-hook-form";
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import LinkIcon from '@mui/icons-material/Link';
import ShareIcon from '@mui/icons-material/Share';
import ClearIcon from '@mui/icons-material/Clear';
import {Header} from "../../components/Header/Header";
import CopyLinkToClipboardButton from "../../components/button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';
import QRCode from 'qrcode'
import { useMutation } from '@apollo/client';
import { GET_SHORT_LINK } from '../../query/user';

const ShortLink = () => {
	const [ShortLink] = useMutation(GET_SHORT_LINK)
	const [shortLink, setShortLink] = useState('');
	const [qrcode, setQrcode] = useState('');
	const {
		register,
		handleSubmit,
		setValue,
		formState: {errors, isValid},
	} = useForm({
		defaultValues: {
			link: "https://google.com",
			userLink: null,
		},
		mode: "onChange",
	});
	register("link", {value: ''})
	const onSubmit = async (value) => {
		ShortLink({
			variables: {
				body: {
					link: value.link,
					userLink: value.userLink
				}
			}
		}).then(({data}) => {
			console.log(data);
		setShortLink(data.getShortLink.shortLink)
		QRCode.toDataURL(data.getShortLink.shortLink, (err, url) => {
			if (err) return console.error(err)
			console.log(url)
			setQrcode(url)
		})
		}).catch((errors) => {
			console.log(errors.message)
			if (errors?.message) {
			return alert("Введённый текст не является ссылкой");
		}})
	};
	return (
		<>
			<Header/>
			<div className={'ShortLinkWindow'}>
				<p className={'logoSmall'}></p>
				<h1 className={'ShortLinkTitle'}>Кликер</h1>
				<p className={'ShortLinkText'}>Помогите клиентам быстро найти вашу страницу в интернете. Благодаря короткой
					ссылке
					клиентам не придётся видеть
					длинные url-адреса, занимающие много места.</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						error={Boolean(errors.link?.message)}
						helperText={errors.link?.message}
						{...register("link", {required: "Укажите ссылку"})}
						label='Ссылка'
						size='small'
						className={'ShortLinkInput'}
						placeholder='Введите ссылку'
						InputProps={{
							endAdornment: <Button onClick={() => setValue("link", null)}
							                      sx={{width: 15, height: 15, minWidth: 15, color: '#778899'}}><ClearIcon/></Button>,
						}}
					/><br></br><br></br>
					<TextField
						error={Boolean(errors.userLink?.message)}
						helperText={errors.userLink?.message}
						{...register("userLink", {required: "Укажите ссылку"})}
						label='Собственная ссылка'
						size='small'
						className={'ShortLinkInput'}
						placeholder='Введите ссылку'
						InputProps={{
							endAdornment: <Button onClick={() => setValue("userLink", null)}
							                      sx={{width: 15, height: 15, minWidth: 15, color: '#778899'}}><ClearIcon/></Button>,
						}}
					/>
					<Button
						disabled={!isValid}
						endIcon={<SendIcon/>}
						variant="contained"
						type="submit"
						className={'ShortLinkButtom'}
					>Получить
					</Button>
					<br></br><br></br>
					{shortLink !== '' ? (
						<>
							<div className={'ShortLinkWindowRes'}><br/>
								<a id='copy' className={'LinkRes'} href={shortLink}>
									<LinkIcon/>
									{shortLink}
								</a><br></br><br></br>
								<div className={'ConteinerBtn'}>
									<CopyLinkToClipboardButton>
									</CopyLinkToClipboardButton>
									<PopupState variant="popover" popupId="demo-popup-menu">
										{(popupState) => (
											<>
												<Button variant="contained" className={'BtnRes'} {...bindTrigger(popupState)}>
													<ShareIcon/>
												</Button>
												<Menu {...bindMenu(popupState)}>
													<MenuItem onClick={popupState.close}><a
														href='https://web.telegram.org/k/' className='Icon'><TelegramIcon/> Телеграм</a></MenuItem>
													<MenuItem onClick={popupState.close}><a href='https://www.reddit.com/?rdt=58403'
													                                        className='Icon'><RedditIcon/> Редит</a></MenuItem>
													<MenuItem onClick={popupState.close}><a href='https://github.com'
													                                        className='Icon'><GitHubIcon/> Гитхаб</a></MenuItem>
												</Menu>
											</>
										)}
									</PopupState>
								</div>
								<img src={qrcode} className={'QRCode'}></img>
							</div>
						</>
					) : (<></>)}
				</form>
			</div>
		</>
	);
};
export default ShortLink;