const req = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const User = require("../models/users");

const generateValidToken = () => {
  const payload = {
    userId: "user_id_here",
    email: "example@gmail.com",
  };
  const secretKey = process.env.SECRET_KEY;
  const options = {
    expiresIn: "1h" 
  };
  return jwt.sign(payload, secretKey, options);
};

test("Login existing user", async () => {   
    await req(app)
        .post("/signin")
        .send({
        email: "a@gmail.com",
        password: "MyPass777",
        })
        .expect(200);
});

test("Should signup a new user", async () => {
    await req(app)
        .post("/addusers")
        .send({
        name: "Andrew",
        age: 27,
        email: "b@gmail.com",
        password: "MyPass777",
        })
        .expect(201);
});

test("Should not login nonexisting user", async () => {
    await req(app)
        .post("/signin")
        .send({
        email: "b@gmail.com",
        password: "MyPass777",
        })
        .expect(400);
});

test("Update user", async () => {  
    const token = generateValidToken();  
    await req(app)
        .put("/updateme")
        .set("Authorization", `Bearer ${token}`)
        .send({
        name: "Andy",
        age: 27,
        email: "a@gmsil.com"
        })
        .expect(201);
});

test("Delete user", async () => {
    const token = generateValidToken();
    await req(app)
        .delete("/deleteme")
        .set("Authorization", `Bearer ${token}`)
        .send()
        .expect(200);
});
