import React, { useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import CopyLinkToClipboardButton from '../../components/button';
import QRCode from 'qrcode';

const ShortLinkPopWindow = ({ shortLink}) => {
  const [qrcode, setQrcode] = useState('');
  QRCode.toDataURL(shortLink, (url) => {
			setQrcode(url)
		})
  return (
    <>
    <div className={'ShortLinkWindowRes'}><br />
      <a id="copy" className={'LinkRes'} href={shortLink}>
        <LinkIcon />
        {shortLink}
      </a><br /><br />
      <div className={'ContainerBtn'}>
        <CopyLinkToClipboardButton />
      </div>
      <img src={qrcode} className={'QRCode'} />
    </div>
      </>
  );
};

export default ShortLinkPopWindow;