import QRCode from 'qrcode';


export const ShortLinkQuery = async (link, userLink, ShortLinkMutation, qrcodeChange) => {
	if (!link.length) {
		return ['error', 'Введите ссылку']
	}
	
	return await ShortLinkMutation({
			variables: {
				body: {
					link: link,
					userLink: userLink
				}
			}
		}).then(({data}) => {
			QRCode.toDataURL(data.getShortLink.shortLink).then( value  => {qrcodeChange(value)})
			return ['data',data.getShortLink.shortLink]
		}).catch((errors) => {
			if (errors.message === 'Bad Request Exception') {
				return ['error', "Введённый текст не является ссылкой"]
			}
			return ['error', errors.message]
		})
};

export default ShortLinkQuery;