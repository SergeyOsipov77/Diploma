import superagent from "superagent";
import { Base_API_URL } from "../src/consts";


describe("GET request", () => {
  it("Getting id, title, body", async () => {
    const response = await superagent.get(`${Base_API_URL}/photos/1`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("albumId");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("url");
    expect(response.body).toHaveProperty("thumbnailUrl");
    expect(response.body.albumId).toBe(1);
    expect(response.body.title).toBe("accusamus beatae ad facilis cum similique qui sunt");
    expect(response.body.url).toBe("https://via.placeholder.com/600/92c952");
    expect(response.body.thumbnailUrl).toBe("https://via.placeholder.com/150/92c952");
  });

  it("Getting post id", async () => {
    const response = await superagent.get(`${Base_API_URL}/posts/1/comments`).query({ id: 77 });
    if (Array.isArray(response.body)) {
      response.body.forEach((item) => {
        expect(item.id).toBe(77);
      });
    } else {
      fail("Response body is not an array");
    }
  });

  it("Getting post email", async () => {
    const response = await superagent.get(`${Base_API_URL}/posts/1/comments`).query({ email: "Tomasa@lee.us" });
    expect(response.status).toBe(200);
    if (Array.isArray(response.body)) {
      response.body.forEach((item) => {
        expect(item.email).toBe("Tomasa@lee.us");
      });
    } else {
      fail("Response body is not an array");
    }
  });
});