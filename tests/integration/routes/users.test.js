const request = require("supertest");
const {User} = require("../../../models/user");
const users = require("./users.data");

describe("api/users", () => {
  let server;
  
  beforeEach(() => server = require("../../../app"));
  afterEach(async () => {
    server.close(); 
    await User.remove({});
  });
  
  describe("GET /", () => {
    it("should return all users from the db", async () => {
      const insertedUsers = users.length;
      await User.collection.insertMany(users);
      const res = await request(server).get("/api/users");
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(insertedUsers);


      for (let expectedUser of users){
        expect(res.body.some((actualUser) => {
          return expectedUser.email === actualUser.email;
        })).toBeTruthy();
      }
    });

    it("should return error when no user in the db", async () => {
      const res = await request(server).get("/api/users");

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "No users found");
    })
  });

  describe("POST /", () => {
    it("should create valid user successfully", async () => {
      const expectedUser = users[0];
      delete expectedUser._id; //don't know why, but there is such property. It is settgin during runtime :( 
      const res = await request(server).post("/api/users")
                                        .send(expectedUser);
      expect(res.status).toBe(200);
      expect(expectedUser).toMatchObject(res.body);

      const savedUser = await User.findOne({email: expectedUser.email});
      expect(savedUser).toBeTruthy();
      expect(savedUser.password).not.toBe(expectedUser.password);
    });

    it("should fail when try to duplicate user", async () => {
      const user = users[0];
      delete user._id; //don't know why, but there is such property. It is settgin during runtime :( 
      await request(server).post("/api/users").send(user);
      const res = await request(server).post("/api/users").send(user);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Such user already exists.");
    });

    it("should fail when try to duplicate user", async () => {
      const user = users[0];
      delete user._id; //don't know why, but there is such property. It is settgin during runtime :( 
      await request(server).post("/api/users").send(user);
      const res = await request(server).post("/api/users").send(user);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Such user already exists.");
    });

    it("should fail when invalid user is passed", async () => {
      const user = {"email": "dsada@dc.com"};
      delete user._id; //don't know why, but there is such property. It is settgin during runtime :( 
      await request(server).post("/api/users").send(user);
      const res = await request(server).post("/api/users").send(user);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Invalid user.");
      expect(res.body).toHaveProperty("reason", );
    });

  });
});