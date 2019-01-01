const {validate, User} = require("../../../models/user");
const {validCases , invalidCases} = require("./user_valadation.data");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("User validation", () => {
  validCases.forEach((testCase) => {
    it(`should pass when ${testCase.name} is used`, () => {  
      const result = validate(testCase.user);
      expect(result.error).toBeFalsy();
    });
  });

  invalidCases.forEach((testCase) => {
    it(`should fail when ${testCase.name} is used`, () => {  
      const result = validate(testCase.user);
      const error = result.error;

      expect(error).not.toBeFalsy();
      expect(error.details[0].context.key).toBe(testCase.field);
      expect(error.details[0].message).toContain(testCase.error);
    });
  });

});

describe("generating user token", async () => {
  it("should return valid JSON web token", async () => {
    const _id = new mongoose.Types.ObjectId().toHexString();
    const validUser = {_id, ...validCases[0].user};
    const user = new User(validUser);
    const userToken = user.generateToken();
    const decodedToken = jwt.verify(userToken, config.get("jwtPrivateKey"));
    delete validUser.password;
    expect(decodedToken).toMatchObject(validUser)
  });
})