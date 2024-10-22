const { describe, it, after, before } = require("mocha");
const supertest = require("supertest");
const assert = require("assert");

describe("API, Suite test", () => {
  let app;

  before((done) => {
    app = require("./api");
    app.once("listening", done);
  });

  after((done) => app.close(done));

  describe("/contact:get", () => {
    it("should request the contact route and return  HTTP status 200", async () => {
      const response = await supertest(app).get("/contact").expect(200);

      assert.strictEqual(response.text, "contact us page");
    });
  });

  describe("/login:post", () => {
    it("should request the contact page and return  HTTP status 200", async () => {
      const response = await supertest(app)
        .post("/login")
        .send({ username: "diegozago", password: "123" })
        .expect(200);

      assert.strictEqual(response.text, "Login succeeded");
    });
  });

  describe("/hi:get - 404", () => {
    it("should request a page and return HTTP status 404", async () => {
      const response = await supertest(app).post("/hi").expect(404);

      assert.strictEqual(response.text, "not found");
    });
  });
});
