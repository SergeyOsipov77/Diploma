import superagent from "superagent";
import { Base_API_URL } from "../src/consts";


describe("POST request", () => {

it("Create photo", async () => {
    const res = await superagent.post(`${Base_API_URL}/photos`).send({
        albumId: 777,
        id: 77,
        title: "Sergey"
    });
    expect(res.statusCode).toBe(201);
})


it("Create todo", async () => {
    const res = await superagent.post(`${Base_API_URL}/todos`).send({
        userId: 77,
        id: 777,
        title: "Completed",
    });
    expect(res.statusCode).toBe(201);
})

});