const jwt = require('../helpers/jwt');

module.exports = (roles = []) => {
  try {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
      (request, response, next) => {
        if(jwt.checkToken(request)) {
          if(roles.length && !roles.includes(request.user.role)) {
            // user's role is not authorized
            return response.status(401).json({ success: false, message: request.t('auth_haventpermission') });
          }
          // authentication and authorization successful
          next();
        } else {
          return response.status(401).json({success: false, message: request.t('auth_notloggedin') });
        }
      }
    ];
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: request.t('auth_error')+error.message
    })
  }
};