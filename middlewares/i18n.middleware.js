const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');

const path = require('path');

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: path.resolve('./resources/languages/{{lng}}.json')
        },
        fallbackLng: 'pt',
        preload: ['pt']
    });

module.exports.middleware = () => {
	return i18nextMiddleware.handle(i18next);
};