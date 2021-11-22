import supertest from "supertest";
import { Digipet, setDigipet } from "../digipet/model";
import app from "../server";

/**
 * This file has integration tests for training a digipet.
 *
 * It is intended to test two behaviours:
 *  1. training a digipet leads to increasing discipline
 *  2. training a digipet leads to decreasing happiness
 */

describe("When a user trains a digipet repeatedly, its discipline increases by 10 each time until it eventually maxes out at 100", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 40,
      nutrition: 40,
      discipline: 40,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("happiness", 40);
    expect(response.body.digipet).toHaveProperty("nutrition", 40);
    expect(response.body.digipet).toHaveProperty("discipline", 40);
  });

  test("1st GET /digipet/ignore shows a decrease of 10 to discipline, happiness and nutrition, following a visit to the ignore endpoint ", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 30);
    expect(response.body.digipet).toHaveProperty("nutrition", 30);
    expect(response.body.digipet).toHaveProperty("discipline", 30);
  });

  test("2nd GET /digipet/ignore shows a further decrease of 10 to discipline, happiness and nutrition, following a visit to the ignore endpoint ", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 20);
    expect(response.body.digipet).toHaveProperty("happiness", 20);
    expect(response.body.digipet).toHaveProperty("nutrition", 20);
  });

  test("3rd GET /digipet/ignore shows a further decrease of 10 to discipline, happiness and nutrition, following a visit to the ignore endpoint ", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 10);
    expect(response.body.digipet).toHaveProperty("happiness", 10);
    expect(response.body.digipet).toHaveProperty("nutrition", 10);
  });

  test("4th GET /digipet/ignore shows a decrease to the floor of discipline, happiness and nutrition", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 0);
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
  });
});

test("4th GET /digipet/ignore shows no further decrease in discipline, happiness and nutrition", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("discipline", 0);
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
  });


describe("When a user ignores a digipet repeatedly, its happiness decreases by 10 each time until it eventually floors out at 0", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 11,
      nutrition: 50,
      discipline: 50,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("happiness", 11);
    expect(response.body.digipet).toHaveProperty("discipline", 50);
    expect(response.body.digipet).toHaveProperty("nutrition", 50);

  });

  test("1st GET /digipet/ignore informs them about the train and shows decreased happiness for digipet", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 1);
    expect(response.body.digipet).toHaveProperty("discipline", 40);
    expect(response.body.digipet).toHaveProperty("nutrition", 40);
  });

  test("2nd GET /digipet/ignore shows continued stats change", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("discipline", 30);
    expect(response.body.digipet).toHaveProperty("nutrition", 30);
  });


  test("3rd GET /digipet/ignore shows continued stats change for both discipline and nutrition", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("discipline", 20);
    expect(response.body.digipet).toHaveProperty("nutrition", 20);
  });


  test("4th GET /digipet/ignore shows no further decrease in happiness", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("discipline", 10);
    expect(response.body.digipet).toHaveProperty("nutrition", 10);
  });


  test("5th GET /digipet/ignore shows further decrease in all stats", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("discipline", 0);
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
  });



  test("6th GET /digipet/ignore shows no further decrease in happiness", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("discipline", 0);
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
  });

});
