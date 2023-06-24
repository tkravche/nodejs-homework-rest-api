const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const User = require("../../models/user");

const { PORT, DB_HOST_TEST } = process.env;

describe("test signup route", () => {
  let server = null;
  const email = "tanya@mail.com";
  const hash = "$2b$10$SuPiXGN76aHAkplayTzYEeww0Mvq3VQaK3CTpC.WXt8z/ytbNGG22";

  const signupData = {
    email,
    password: "tanya123",
  };
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  beforeEach(async () => {
    await User.create({ email, password: hash });
  });
  afterAll(() => {
    server.close();
    mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signup route with correct status", async () => {
    const { statusCode } = await request(app)
      .post("/users/login")
      .send(signupData);

    expect(statusCode).toBe(200);
  });

  test("test signup route with correct token", async () => {
    const { body } = await request(app).post("/users/login").send(signupData);

    expect(body.token).toBeTruthy();
  });

  test("test signup route with correct user", async () => {
    const { body } = await request(app).post("/users/login").send(signupData);

    expect(body.user).toBeTruthy();
    expect(body.user.email).toEqual(expect.any(String));
    expect(body.user.subscription).toEqual(expect.any(String));
  });
});
