const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");

describe("Tester API users et articles", () => {
  let token;
  const USER_ID = "66b7b12821d4962d0b81fd08";
  const ARTICLE_ID = "66b7b12e21d4962d0b81fd09";

  const MOCK_USER = {
    _id: USER_ID,
    role: "admin",
  };

  const MOCK_ARTICLE = {
    _id: ARTICLE_ID,
    title: "Bonjour",
    content: "Je suis content",
    user: USER_ID,
  };

  const UPDATED_MOCK_ARTICLE = {
    _id: ARTICLE_ID,
    title: "Je suis mis a jour",
    content: "Toujours content",
    status: "published",
    user: USER_ID,
  };

  beforeEach(() => {
    token = jwt.sign(MOCK_USER, config.secretJwtToken);
    mockingoose.resetAll();
    mockingoose(Article).toReturn(MOCK_ARTICLE, "save");
    mockingoose(Article).toReturn(UPDATED_MOCK_ARTICLE, "findOneAndUpdate");
    mockingoose(Article).toReturn(null, "findByIdAndDelete");
  });

  test("[Article] créer un article", async () => {
    const response = await request(app)
      .post("/api/articles")
      .set("x-access-token", token)
      .send(MOCK_ARTICLE);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(MOCK_ARTICLE.title);
    expect(response.body.content).toBe(MOCK_ARTICLE.content);
    expect(response.body.user).toBe(USER_ID);
    expect(response.body._id).toBe(ARTICLE_ID);
  });

  test("[Article] mettre à jour un article", async () => {
    const response = await request(app)
      .put(`/api/articles/${ARTICLE_ID}`)
      .set("x-access-token", token)
      .send(UPDATED_MOCK_ARTICLE);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(UPDATED_MOCK_ARTICLE.title);
    expect(response.body.content).toBe(UPDATED_MOCK_ARTICLE.content);
    expect(response.body.user).toBe(USER_ID);
    expect(response.body._id).toBe(ARTICLE_ID);
  });

  test("[Article] supprimer un article", async () => {
    const response = await request(app)
      .delete(`/api/articles/${ARTICLE_ID}`)
      .set("x-access-token", token);

    expect(response.status).toBe(204);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
