import React from "react";
import LinkIcon from "@mui/icons-material/Link";
import CopyLinkToClipboardButton from "../button";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import {Button} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TelegramIcon from "@mui/icons-material/Telegram";
import RedditIcon from "@mui/icons-material/Reddit";
import GitHubIcon from "@mui/icons-material/GitHub";
import './styles.module.scss';
import styles from "./styles.module.scss";
import clsx from "clsx";

export const Created_ShortLinks = ({
	                                   uuid,
	                                   shortLink,
	                                   link,
	                                   redirectCount
                                   }) => {
	console.log(shortLink);
	if (shortLink !== undefined && link !== undefined) {
		if (shortLink.length > 28) {
			shortLink = shortLink.slice(0, 28) + '...'
		} else if (link.length > 28) {
			link = link.slice(0, 28) + '...'
		}
	}
	return (
		<div className={clsx(styles.root, {uuid})}>
			<br/>
			<a id='copy' className={'LinkRes'} href={shortLink}>
				<LinkIcon/>
				{shortLink}
			</a><br></br>
			<a id='copy' className={'LinkRes'} href={shortLink}>
				<LinkIcon/>
				{link}
			</a><br></br><br/>
			<div className={'ContainerBtn'}>
				<CopyLinkToClipboardButton>
				</CopyLinkToClipboardButton>
			</div>
			<p>{redirectCount}</p>
			{/*<img src={qrcode} className={'QRCode'}></img>*/}
		</div>
	);
};
