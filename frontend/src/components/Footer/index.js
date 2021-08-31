import React from 'react';

import { FooterContainer } from './styles';

function Footer(props) {

	return (
		<FooterContainer>
			<span>
				{props.i18nT('Footer.github')}
			</span>
			<a href="https://github.com/LuanSALima/MERN-Portifolio" target="_blank" rel="noreferrer">
				https://github.com/LuanSALima/MERN-Portifolio
			</a>
		</FooterContainer>
	);
}

export default Footer;