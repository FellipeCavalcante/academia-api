import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gyms by title", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "TypeScript gym",
        description: "Some desc",
        phone: "999999999",
        latitude: -32.0378175,
        longitude: -52.0970702,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Java gym",
        description: "Some desc",
        phone: "999999999",
        latitude: -32.0378175,
        longitude: -52.0970702,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .set("Authorization", `Bearer ${token}`)
      .query({
        q: "Java",
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Java gym",
      }),
    ]);
  });
});
