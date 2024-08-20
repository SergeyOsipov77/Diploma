import superagent from "superagent";
import { Base_API_URL } from "../src/consts";


describe("PUT request", () => {

  it("Updade userId", async () => {
    let response = await superagent.put(`${Base_API_URL}/posts/1`).send({
      userId: 7777,
    });
    expect(response.statusCode).toBe(200);
  });

  it("Updade title", async () => {
    let response = await superagent.put(`${Base_API_URL}/posts/1`).send({
        title: "Secret",
    });
    expect(response.statusCode).toBe(200);
  });
});
