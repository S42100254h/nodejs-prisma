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
    });
  });

  describe("POST /users", () => {
    describe("send correct user information", () => {
      it("creates new user", async () => {
        const params = UserHelper.attributes();
        const res = await request(app).post("/users").send(params);

        expect(res.status).toStrictEqual(200);
        expect(res.body.name).toStrictEqual(params.name);
        expect(res.body.email).toStrictEqual(params.email);
      });
    });
  });

  describe("PATCH /users/:id", () => {
    it("changes user information", async () => {
      await UserHelper.create({
        id: 9999,
        name: "dummy",
        email: "dummy@email.com",
      });
      const params = UserHelper.attributes({
        name: "neko",
      });
      const res = await request(app).patch("/users/9999").send(params);

      expect(res.status).toStrictEqual(200);
      expect(res.body.name).toStrictEqual(params.name);
    });
  });

  describe("DELETE /users/:id", () => {
    it("deletes user account", async () => {
      const dummyUser = await UserHelper.create({
        id: 99999,
      });
      const res = await request(app).delete("/users/99999");

      expect(res.status).toStrictEqual(200);
      expect(res.body.name).toStrictEqual(dummyUser.name);
      expect(res.body.email).toStrictEqual(dummyUser.email);
    });
  });
});
