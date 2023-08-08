const jwt = require("jsonwebtoken");

module.exports.sign = async (payload, options) => {
  const key = process.env.JWT_SIGN_KEY;
//   const key = '1234';
  return jwt.sign(payload, key, {
    algorithm: process.env.JWT_ALGORITHM,
    // algorithm: 'HS256',
    ...options,
  });
};

module.exports.verify = async (token, options) => {
  try {
    // const key = process.env.JWT_SIGN_KEY;
    const key = process.env.JWT_SIGN_KEY;
    return jwt.verify(token, key, {
      algorithm: process.env.JWT_ALGORITHM,
      ...options,
    });
  } catch (e) {
    return false;
  }
};
