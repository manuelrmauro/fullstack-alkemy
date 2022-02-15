const jwt = require('jsonwebtoken');

const generateJWT = (uid, email) =>
  new Promise((resolve, reject) => {
    const payload = { uid, email };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(new Error("Can't generate token"));
        }

        resolve(token);
      }
    );
  });

module.exports = {
  generateJWT,
};
