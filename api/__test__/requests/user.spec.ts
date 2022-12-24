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
});
