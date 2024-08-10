const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");

describe("tester API users et articles", () => {
  let token;
  const USER_ID = "6659bffc24f00ee439a13b52";
  const ARTICLE_ID = "6659c928fadc16f062903091";
  const MOCK_USER = {
    _id: USER_ID,
    role: "admin",
  };

  const MOCK_ARTICLES = {
    _id: ARTICLE_ID,
    title: "New Article",
    content: "Content of the new article",
    user: USER_ID,
  };

  const UPDATED_MOCK_ARTICLES = {
    _id: ARTICLE_ID,
    title: "New update Article",
    content: "Edit of the new article",
    status: "published",
    user: USER_ID,
  };

  beforeEach(() => {
    token = jwt.sign(MOCK_USER, config.secretJwtToken);
    mockingoose.resetAll();
    mockingoose(Article).toReturn(MOCK_ARTICLES, "save");
    mockingoose(Article).toReturn(UPDATED_MOCK_ARTICLES, "findOneAndUpdate");
    mockingoose(Article).toReturn(UPDATED_MOCK_ARTICLES, "findByIdAndDelete");
  });

  test("[Article] create an article", async () => {
    const {
      status,
      body: { title, content, user, _id },
    } = await request(app)
      .post("/api/articles")
      .set("x-access-token", token)
      .send(MOCK_ARTICLES);

    expect(status).toBe(201);
    expect(title).toBe(MOCK_ARTICLES.title);
    expect(content).toBe(MOCK_ARTICLES.content);
    expect(user).toBe(USER_ID);
    expect(_id).toBe(ARTICLE_ID);
  });

  test("[Article] update an article", async () => {
    const {
      status,
      body: { title, content, user, _id },
    } = await request(app)
      .put(`/api/articles/${ARTICLE_ID}`)
      .set("x-access-token", token)
      .send(UPDATED_MOCK_ARTICLES);

    expect(status).toBe(200);
    expect(title).toBe(UPDATED_MOCK_ARTICLES.title);
    expect(content).toBe(UPDATED_MOCK_ARTICLES.content);
    expect(user).toBe(USER_ID);
    expect(_id).toBe(ARTICLE_ID);
  });

  test("[Article] delete an article", async () => {
    const response = await request(app)
      .delete(`/api/articles/${ARTICLE_ID}`)
      .set("x-access-token", token);

    expect(response.status).toBe(204);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
