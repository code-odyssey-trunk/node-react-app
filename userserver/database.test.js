const db = require("./database");

beforeAll(async () => {
  await db.sequelize.sync();
});

test("create user", async () => {
  expect.assertions(1);
  const user = await db.User.create({
    id: 1,
    name: "Bobbie",
    userName: "bobman",
    password: "bobbie",
  });
  expect(user.id).toEqual(1);
});

test("get user", async () => {
  expect.assertions(2);
  const user = await db.User.findByPk(1);
  expect(user.userName).toEqual("bobman");
  expect(user.password).toEqual("bobbie");
});

test("delete user", async () => {
  expect.assertions(1);
  await db.User.destroy({
    where: {
      id: 1,
    },
  });
  const user = await db.User.findByPk(1);
  expect(user).toBeNull();
});

afterAll(async () => {
  await db.sequelize.close();
});
