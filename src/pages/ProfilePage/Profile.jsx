import './styles.css';

import React, {useState} from "react";
import {Avatar, Button, Input, TextField} from "@mui/material";
import {Created_ShortLinks} from "../../components/Created_ShortLinks/Created_ShortLinks";
import {Scrollbars} from 'react-custom-scrollbars-2';
import {Link} from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useForm} from "react-hook-form";
import { useMutation, useQuery } from '@apollo/client';
import { CHANGE_PROFILE, GET_PROFILE, GET_USERLINKS } from '../../query/user';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';


const Profile = () => {
	const [error, setError] = React.useState();
	const [openMessage, setOpenMessage] = React.useState(false);
	const [ChangeProfile] = useMutation(CHANGE_PROFILE)
	const Profile = useQuery(GET_PROFILE)
	const Links = useQuery(GET_USERLINKS)
	const [save, setSave] = useState(true)
	const [userlinks,setUserlinks] = useState([])
	
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: {errors},
	} = useForm({
		defaultValues: {
			username: null,
			password: '***********',
			avatar: null,
		},
		mode: "onChange",
	});

	React.useEffect(() => {
		if (!Profile.loading) {
			setValue('username', Profile.data.getProfile.username)
		}
		if (!Links.loading && Links.data) {
			console.log(Links.data);
			setUserlinks(Links.data.getUserLinks)
			console.log(userlinks);
		}
	}, [Profile.data, Links.data,Profile.loading,Links.loading,setValue]);
	
	const onSubmit = async () => {
		if (save) {
			if ((getValues('password') && getValues('username')) !== '') {
				ChangeProfile({
					variables: {
						body: {
							username: getValues('username'),
							password: getValues('password')
						}
					}
				}).then(({ data }) => {
					setValue('username', data.changeUser.username)
					setValue('password', '***********')
					setOpenMessage(false)
				}).catch((errors) => {
					setSave(!save)
					setValue('username', Profile.data.getProfile.username)
					setError(errors.message)
					setOpenMessage(true)
				})
			} else {
				setSave(!save)
				setError('Вы не ввели логин или пароль!')
				setOpenMessage(true)
		}
	}
	};
	return (
		<div>
			<center><Collapse in={openMessage} sx={{width: 420}}>
        <Alert
	        severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenMessage(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
	        {error}
        </Alert>
      </Collapse>
			</center>
			<div className={'ProfileWindow'}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<center>
						<h1>Профиль</h1>
						{save ? (
							<Avatar src="/broken-image.jpg" sx={{width: 115, height: 115, bgcolor: 'primary.light'}}/>
						) : (
							<>
								<Avatar src="/broken-image.jpg" sx={{width: 115, height: 115, bgcolor: 'primary.light'}}/><br/>
								<Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}>
									Upload file
									<Input type="file" sx={{
										clip: 'rect(0 0 0 0)',
										clipPath: 'inset(50%)',
										height: 1,
										overflow: 'hidden',
										position: 'absolute',
										bottom: 0,
										left: 0,
										whiteSpace: 'nowrap',
										width: 1,
									}}/>
								</Button>
							</>
						)}
						{save ? (
							<><br/><br/><br/><br/></>
						) :(
								<><br/><br/></>
						)}
						<TextField
							error={Boolean(errors.username?.message)}
							helperText={errors.username?.message}
							{...register("username")}
							disabled={save}
							className={'ProfileInput'}
						/><br></br><br></br><br></br>
						<TextField
							error={Boolean(errors.password?.message)}
							helperText={errors.password?.message}
							{...register("password")}
							disabled={save}
							className={'ProfileInput'}
						/><br></br><br></br>
					</center>
					<Scrollbars style={{width: 420, height: 156, left: 22}}>
						{userlinks.map((obj, index) =>
							Links.loading ? (
								<Created_ShortLinks key={index} isLoading={true}/>
							) : (
								<Created_ShortLinks
									shortLink={obj.shortLink}
									link={obj.link}
								/>
							)
						)}
					</Scrollbars>
					<div className={'ConteinerBtnProfile'}>
						{save ? (
							<>
								<Link to="/shortLink">
									<Button sx={{fontSize: 15, marginTop: -2}}>Назад</Button>
								</Link>
								<Button sx={{fontSize: 15, marginTop: -2}} type='btn' onClick={() => {setSave(!save);setValue('password', '')}}>Изменить</Button>
							</>
						) : (
							<>
								<Button sx={{fontSize: 15, marginTop: -2}} onClick={() =>
								{setSave(!save); setOpenMessage(false);setValue('username', Profile.data.getProfile.username)}
								}>Назад</Button>
								<Button sx={{fontSize: 15, marginTop: -2}} type="submit" onClick={() => setSave(!save)}>Сохранить</Button>
							</>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Profile;