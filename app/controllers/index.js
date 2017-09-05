const users = require('./UserController');
const plans = require('./PlanController');
const messages = require('./MessageController');
const memberships = require('./MembershipController')
module.exports = {
    users,
    plans,
    messages,
    memberships
};
