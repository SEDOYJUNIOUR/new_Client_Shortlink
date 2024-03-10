import './styles.css';

import React from 'react';
import LinkIcon from '@mui/icons-material/Link';
import CopyLinkToClipboardButton from '../../components/button';

export const ShortLinkPopWindow = ({ shortLink, qrcode}) => {
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
      <img src={qrcode} alt={''} className={'QRCode'} />
    </div>
      </>
  );
};

export default ShortLinkPopWindow;