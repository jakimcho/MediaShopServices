const request = require("supertest");
const {User} = require("../../../models/user");
const users = require("./users.data");

describe("api/users", () => {
  let server;
  
  beforeEach(() => server = require("../../../app")());
  afterEach(async () => {
    //server.close();
    await User.deleteMany({});
  });

  describe("POST ", () => {
      it("should pass upon correct credentials", async () => {
      const user = {...users[0]};
      await request(server).post("/api/users").send(user);
      const login = { email: user.email, password: user.password };
      const res = await request(server).post("/api/auth").send(login);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.header).toHaveProperty("x-auth-token");
    });
  });
});