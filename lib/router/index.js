// Samson.Router constructor function
// Used to handle page history and transitions

var SamsonRouter = require('./router');

SamsonRouter.prototype.getPageData = require('./getPageData'); // get the router's current page data
SamsonRouter.prototype._doFirst = require('./doFirst');
SamsonRouter.prototype._doFirstNoCallback = require('./doFirstNoCallback');
SamsonRouter.prototype.updateHistory = require('./updateHistory');
SamsonRouter.prototype.getAnimationData = require('./getAnimationData');
SamsonRouter.prototype.doAnimation = require('./doAnimation');
SamsonRouter.prototype.animate = require('./animate');
SamsonRouter.prototype.navigate = require('./navigate');
SamsonRouter.prototype.back = require('./back');

module.exports = SamsonRouter;
