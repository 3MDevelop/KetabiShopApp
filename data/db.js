// db.js
const users = require('./users.json');
const lang = require('.lang.json');


module.exports = () => ({
  users: users,
  lang: lang
});