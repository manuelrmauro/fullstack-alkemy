const bcryptjs = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSaltSync(10);
  const passwordHashed = await bcryptjs.hashSync(password, salt);
  return passwordHashed;
};

const hashPasswordSync = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  const passwordHashed = bcryptjs.hashSync(password, salt);
  return passwordHashed;
};

const comparePassword = async (passwordOld, passwordUser) => {
  const result = await bcryptjs.compare(passwordOld, passwordUser);
  return result;
};

module.exports = { hashPassword, comparePassword, hashPasswordSync };
