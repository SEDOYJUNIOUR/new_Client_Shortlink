export const ShortLinkQuery = async (link, userLink, ShortLinkMutation) => {
  return await ShortLinkMutation({
			variables: {
				body: {
					link: link,
					userLink: userLink
				}
			}
		}).then(({data}) => {
			console.log(data.getShortLink.shortLink);
			return data.getShortLink.shortLink
		}).catch((errors) => {
			return errors.message
			// return alert("Введённый текст не является ссылкой");
		})
};

export default ShortLinkQuery;