import {
  _userDigipet,
  Digipet,
  getDigipet,
  makeBoundedDigipetUpdate,
  resetDigipet,
  setDigipet,
} from "./digipet";

describe("getDigipet", () => {
  it("gets the stats for the user digipet (but not the underlying object)", () => {
    const digipetTest: Digipet = {
      happiness: 60,
      nutrition: 60,
      discipline: 60,
    };
    setDigipet(digipetTest);
    expect(getDigipet()).toStrictEqual(digipetTest);
    expect(getDigipet()).not.toBe(digipetTest);
  });
});

describe("makeBoundedDigipetUpdate", () => {
  it("increases the specified stat when passed in a positive number", () => {
    const digipetTest: Digipet = {
      happiness: 60,
      nutrition: 60,
      discipline: 60,
    };
    setDigipet(digipetTest);

    makeBoundedDigipetUpdate("happiness", 30);
    expect(getDigipet()).toStrictEqual({
      happiness: 90,
      nutrition: 60,
      discipline: 60,
    });

    makeBoundedDigipetUpdate("nutrition", 25);
    expect(getDigipet()).toStrictEqual({
      happiness: 90,
      nutrition: 85,
      discipline: 60,
    });

    makeBoundedDigipetUpdate("discipline", 0.5);
    expect(getDigipet()).toStrictEqual({
      happiness: 90,
      nutrition: 85,
      discipline: 60.5,
    });
  });

  it("decreases the specified stat when passed in a negative number", () => {
    const digipetTest: Digipet = {
      happiness: 60,
      nutrition: 60,
      discipline: 60,
    };
    setDigipet(digipetTest);

    makeBoundedDigipetUpdate("happiness", -30);
    expect(getDigipet()).toStrictEqual({
      happiness: 30,
      nutrition: 60,
      discipline: 60,
    });

    makeBoundedDigipetUpdate("nutrition", -25);
    expect(getDigipet()).toStrictEqual({
      happiness: 30,
      nutrition: 35,
      discipline: 60,
    });

    makeBoundedDigipetUpdate("discipline", -0.5);
    expect(getDigipet()).toStrictEqual({
      happiness: 30,
      nutrition: 35,
      discipline: 59.5,
    });
  });
});

describe("setDigipet", () => {
  it("reassigns the _userDigipet variable to the passed in argument", () => {
    const sampleDigipet: Digipet = {
      happiness: 100,
      nutrition: 80,
      discipline: 30,
    };

    // different reference before execution
    expect(_userDigipet).not.toBe(sampleDigipet);

    setDigipet(sampleDigipet);

    // same reference after execution
    expect(_userDigipet).toBe(sampleDigipet);
  });
});

describe("resetDigipet", () => {
  it("resets all digipet stats to 50", () => {
    // test setup
    const digipetTest: Digipet = {
      happiness: 60,
      nutrition: 60,
      discipline: 60,
    };
    setDigipet(digipetTest);

    // confirm digipet stats not currently 50
    expect(getDigipet()).not.toStrictEqual({
      happiness: 50,
      nutrition: 50,
      discipline: 50,
    });

    // act
    resetDigipet();

    // confirm digipet stats now all 50
    expect(getDigipet()).toStrictEqual({
      happiness: 50,
      nutrition: 50,
      discipline: 50,
    });
  });
});
