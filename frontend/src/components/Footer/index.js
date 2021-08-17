import React from 'react';

import { useTranslation } from 'react-i18next';

import { FooterContainer } from './styles';

function Footer() {

	const { t } = useTranslation();

	return (
		<FooterContainer>
			<span>{t('Footer.github')} </span><a href="https://github.com/LuanSALima/MERN-Portifolio" target="_blank" rel="noreferrer">https://github.com/LuanSALima/MERN-Portifolio</a>
		</FooterContainer>
	);
}

export default Footer;