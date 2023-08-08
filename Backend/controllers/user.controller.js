const db = require("../models");

const User = db.users;

const { hashSync, genSaltSync, compareSync } = require("bcrypt-nodejs");

const jwt = require("../jwt");

const { comparePassword } = require("../util");

exports.create = (req, res) => {
  const body = req.body;

  const salt = genSaltSync(10);

  body.password = hashSync(body.password, salt);

  const userObject = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    birthday: body.birthday,
    password: body.password,
  };

  User.findOne({ where: { email: body.email } })
    .then((user) => {
      if (user) {
        res.send({ Error: "Email Already in Use" });
      } else {
        User.create(userObject)

          .then((data) => {
            res.send(data);
          })

          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User.",
            });
          });
      }
    })
    .catch((error) => {
      res.send(error.message);
    });
};

exports.login = async (req, res) => {
  console.log("process.env.LOGIN_EXP: ", process.env.LOGIN_EXP);
  try {
    const exists = await User.findOne({
      where: { email: req.body.email.trim().toLowerCase() },
    });
    if (exists) {
      const isPassOk = await comparePassword(
        req.body.password.trim(),
        exists.password
      );
      if (isPassOk) {
        const token = await jwt.sign(
          {
            aud: "api",
          },
          {
            subject: `${exists.id}`,
            expiresIn: Number(process.env.LOGIN_EXP),
          }
        );

        // const refreshToken = await jwt.sign(
        //     {
        //         aud: 'api'
        //     },
        //     {
        //         subject: `${exists.userId}`,

        //     }
        // );

        // if (exists.sub_status === "active") {
        //   if (refreshToken) {
        //     let data = {
        //       token: refreshToken,
        //       userId: exists.userId,
        //       expires: moment().add(1, "weeks").toDate(),
        //     };

        //     const user = await Token.findOne({
        //       where: {
        //         userId: exists.userId,
        //       },
        //     });
        //     if (user) {
        //       await user.update(data);
        //     } else {
        //       const u = Token.build(data);
        //       await u.save();
        //     }
        //   }
        // }
        res.status(201).send({
          token: token,
          refreshToken: "1234",
          //   sub_active: exists.sub_status,
        });
      }
    } else {
      res.status(401).send({
        error: {
          msg: "invalid email or password",
        },
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.getUser = (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.decodeJWT);
    console.log('req on 126: ', req);
    res.status(201).send({
      req: 'req',
    });
  } catch (error) {
    console.error(error);
  }
};
