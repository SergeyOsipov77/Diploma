import superagent from "superagent";
import { Base_API_URL } from "../src/consts";


describe("PATCH request", () => {

  it("Updade id", async () => {
    let response = await superagent.put(`${Base_API_URL}/posts/1`).send({
        id: 7777,
    });
    expect(response.statusCode).toBe(200);
  });

  it("Updade body", async () => {
    let response = await superagent.put(`${Base_API_URL}/posts/1`).send({
        body: "Secret",
    });
    expect(response.statusCode).toBe(200);
  });
});
