module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    nic: {
      type: Sequelize.STRING,
    },
  });
  return Users;
};
