const { verify } = require("./jwt");

module.exports = async (req, res, next) => {
  console.log("req.token: ", req.headers.authorization);
  let token = req.headers.authorization;
  token = token.slice(7);
  console.log(token);
  const decodedJWT = await verify(token);
  console.log(decodedJWT);
  if (!decodedJWT) {
    res.status(401).send({
      error: {
        msg: "invalid token",
      },
    });
  } else {
    req.decodedJWT = decodedJWT;
    next();
  }
};
