import React from 'react';
import Button from '@mui/material/Button';
import ClipboardJS from 'clipboard';
import '../pages/ShortLinkPage/styles.css'

class CopyLinkToClipboardButton extends React.Component {
	componentDidMount() {
		const linkElement = document.getElementById('copy');
		if (linkElement) {
			new ClipboardJS(this.button, {
				text: () => linkElement.innerText,
			});
		}
	}
	
	render() {
		return (
			<Button
				ref={(button) => (this.button = button)}
				variant="contained"
				color="primary"
				className={'BtnRes'}
			>
				Скопировать
			</Button>
		);
	}
}

export default CopyLinkToClipboardButton;