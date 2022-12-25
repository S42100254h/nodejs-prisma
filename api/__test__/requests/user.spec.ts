import { UserHelper } from "../helpers/user";
import { resetDatabase } from "../helpers/function";
const app = require("../../app");
const request = require("supertest");

afterAll(async () => {
  await resetDatabase();
});

describe("test for user API", () => {
  describe("GET /users", () => {
    it("returns list of all users", async () => {
      const dummyUsers = [await UserHelper.create(), await UserHelper.create()];
      const res = await request(app).get("/users");

      expect(res.status).toStrictEqual(200);
      expect(res.body.length).toStrictEqual(2);
      expect(res.body).toStrictEqual(dummyUsers);
    });
  });

  describe("GET /users/:id", () => {
    it("returns specified user", async () => {
      const dummyUser = await UserHelper.create({ id: 999 });
      const res = await request(app).get("/users/999");

      expect(res.status).toStrictEqual(200);
      expect(res.body.name).toStrictEqual(dummyUser.name);
      expect(res.body.email).toStrictEqual(dummyUser.email);
      expect(res.body).toStrictEqual(dummyUser);
    });
  });
});
