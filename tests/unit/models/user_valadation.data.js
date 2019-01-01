const validCases = [
  {
    name:"Lower boundary",
    user: {
      email: "asd@gc.e",
      sirName: "asd",
      firstName: "asd",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    }
  },
  {
    name:"Upper boundary",
    user: {
      email: `${"e".repeat(40)}@dodod.com`,
      sirName: "Andov".repeat(10),
      firstName: "Gosho".repeat(10),
      password: "pwd".repeat(85),
      city: "cityn".repeat(10),
      country: "cntry".repeat(10),
      zip: "12345",
      address: "address".repeat(51),
    }
  },
  {
    name:"No address",
    user: {
      email: "gosho@pochivka.com",
      sirName: "Pochivka",
      firstName: "Gosho",
      password: "4324234",
      city: "Sofia",
      country: "Bulgaria",
      zip: "1234",
      address: ""
    }
  }
];

const invalidCases = [
  {
    name:"Bad email 1",
    user: {
      email: "@gsdac.e",
      sirName: "asd",
      firstName: "asd",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "email",
    error: "\"email\" must be a valid email"
  },  
  {
    name:"Bad email 2",
    user: {
      email: "gs!@#$#@@dac.e",
      sirName: "asd",
      firstName: "asd",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "email",
    error: "\"email\" must be a valid email"
  },
  {
    name:"Bad email 3",
    user: {
      email: "gdac.e",
      sirName: "asd",
      firstName: "asd",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "email",
    error: "\"email\" must be a valid email"
  },
  {
    name:"Bad email 4",
    user: {
      email: "g@s.",
      sirName: "asd",
      firstName: "asd",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "email",
    error: "\"email\" length must be at least 5 characters long"
  },
  {
    name:"Bad email 5",
    user: {
      email: "gd.gf@",
      sirName: "asd",
      firstName: "asd",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "email",
    error: "\"email\" must be a valid email"
  },
  {
    name:"short first name",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName: "as",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "firstName",
    error: "\"firstName\" length must be at least 3 characters long"
  },
  {
    name:"long first name",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd".repeat(17),
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "firstName",
    error: "\"firstName\" length must be less than or equal to 50 characters long"
  },
  {
    name:"short sir name",
    user: {
      email: "gogo@pochivka.com",
      sirName: "as",
      firstName:"asa",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "sirName",
    error: "\"sirName\" length must be at least 3 characters long"
  },
  {
    name:"long sir name",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd".repeat(17),
      firstName:"asd",
      password: "432123454234",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "sirName",
    error: "\"sirName\" length must be less than or equal to 50 characters long"
  },
  {
    name:"short password",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd",
      password: "qazx",
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "password",
    error: "\"password\" length must be at least 5 characters long"
  },
  {
    name:"long password",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd",
      password: "asdf".repeat(64),
      city: "123",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "password",
    error: "\"password\" length must be less than or equal to 255 characters long"
  },
  {
    name:"shot city",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd",
      password: "qaszx",
      city: "go",
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "city",
    error: "\"city\" length must be at least 3 characters long"
  },
  {
    name:"long city",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd",
      password: "asdf5",
      city: "asd".repeat(17),
      country: "123",
      zip: "1234",
      address: ""
    },
    field: "city",
    error: "\"city\" length must be less than or equal to 50 characters long"
  },
  {
    name:"short country",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd",
      password: "qaazx",
      city: "123",
      country: "12",
      zip: "1234",
      address: ""
    },
    field: "country",
    error: "\"country\" length must be at least 3 characters long"
  },
  {
    name:"long country",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd",
      password: "asdf5",
      city: "asd",
      country: "asd".repeat(17),
      zip: "1234",
      address: ""
    },
    field: "country",
    error: "\"country\" length must be less than or equal to 50 characters long"
  },
  {
    name:"short zip",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd",
      password: "qazax",
      city: "123",
      country: "12s",
      zip: "123",
      address: ""
    },
    field: "zip",
    error: "\"zip\" length must be at least 4 characters long"
  },
  {
    name:"long zip",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName:"asd",
      password: "asdf5",
      city: "asd",
      country: "asd",
      zip: "123456",
      address: ""
    },
    field: "zip",
    error: "\"zip\" length must be less than or equal to 5 characters long"
  },
  {
    name:"no first name",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      password: "qazax",
      city: "123",
      country: "12s",
      zip: "123",
      address: ""
    },
    field: "firstName",
    error: "\"firstName\" is required"
  },
  {
    name:"no sir name",
    user: {
      email: "gogo@pochivka.com",
      firstName: "asd",
      password: "qazax",
      city: "123",
      country: "12s",
      zip: "123",
      address: ""
    },
    field: "sirName",
    error: "\"sirName\" is required"
  },
  {
    name:"no email",
    user: {
      firstName: "gogo",
      sirName: "asd",
      password: "qazax",
      city: "123",
      country: "12s",
      zip: "123",
      address: ""
    },
    field: "email",
    error: "\"email\" is required"
  },
  {
    name:"no password",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      firstName: "qazax",
      city: "123",
      country: "12s",
      zip: "123",
      address: ""
    },
    field: "password",
    error: "\"password\" is required"
  },
  {
    name:"no city",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      password: "qazax",
      firstName: "dsad",
      country: "12s",
      zip: "123",
      address: ""
    },
    field: "city",
    error: "\"city\" is required"
  },
  {
    name:"no country",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      password: "qazax",
      firstName: "dsad",
      city: "12s",
      zip: "123",
      address: ""
    },
    field: "country",
    error: "\"country\" is required"
  },
  {
    name:"no zip",
    user: {
      email: "gogo@pochivka.com",
      sirName: "asd",
      password: "qazax",
      firstName: "dsad",
      city: "12s",
      country: "123",
      address: ""
    },
    field: "zip",
    error: "\"zip\" is required"
  }
];

module.exports.validCases = validCases;
module.exports.invalidCases = invalidCases