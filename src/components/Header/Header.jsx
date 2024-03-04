import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import Button from "@mui/material/Button";
import './styles.css';

export const Header = () => {
	const [log, setLog] = useState(false);
	
	const onClickLogout = () => {
		if (window.confirm("Вы действительно хотите выйти?")) {
			setLog(true);
			window.localStorage.removeItem("accessToken");
		}
	};
	if (!("accessToken" in window.localStorage)) {
		return <Navigate to="/"/>;
	}
	if (log) {
		setLog(false);
		return <Navigate to="/"/>;
	}
	return (
		<div className={'Hat'}>
			<div className={'HatFlex'}>
				<Link className={'logoHat'} to="/">
					<div>Главная страница</div>
				</Link>
				<div>
					<Button
						onClick={onClickLogout}
						variant="contained"
						color="error"
						className={'HeaderButtom'}
					>
						Выйти
					</Button>
					<Link className={'HeaderButtom'} to="/profile">
						<Button variant="contained">Профиль</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
