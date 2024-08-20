import superagent from "superagent";
import { Base_API_URL } from "../src/consts";


describe("DELETE request", () => {

    it("Delete post", async () => {
        let response = await superagent.delete(`${Base_API_URL}/posts/1`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
    })
});
