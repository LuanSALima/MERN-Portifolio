const router = require('express').Router();

router.route('/test').get((request, response) => {
	response.json({
		message: "Hello World"
	});
});

module.exports = router;