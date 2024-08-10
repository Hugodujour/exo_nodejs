const request = require("supertest");
const { app } = require("../server"); // Assurez-vous que 'app' est correctement exporté dans server.js
const jwt = require("jsonwebtoken");
const config = require("../config");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");

describe("Tester API users et articles", () => {
  let token;
  const USER_ID = "6659bffc24f00ee439a13b52";
  const ARTICLE_ID = "6659c928fadc16f062903091";

  const MOCK_USER = {
    _id: USER_ID,
    role: "admin",
  };

  const MOCK_ARTICLE = {
    _id: ARTICLE_ID,
    title: "New Article",
    content: "Content of the new article",
    user: USER_ID,
  };

  const UPDATED_MOCK_ARTICLE = {
    _id: ARTICLE_ID,
    title: "Updated Article",
    content: "Updated content",
    status: "published",
    user: USER_ID,
  };

  beforeEach(() => {
    // Générer un token JWT valide
    token = jwt.sign(MOCK_USER, config.secretJwtToken);

    // Reset tous les mocks
    mockingoose.resetAll();

    // Mock save()
    mockingoose(Article).toReturn(MOCK_ARTICLE, "save");

    // Mock findOneAndUpdate()
    mockingoose(Article).toReturn(UPDATED_MOCK_ARTICLE, "findOneAndUpdate");

    // Mock findByIdAndDelete()
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
    jest.restoreAllMocks(); // Restaure tous les mocks après chaque test
  });
});
