import Validator from "helpers/Validator";

describe("Validator", () => {
  test("Validates phone number", () => {
    const numbers = [
      // invalid
      "+900000000000",
      "0000000000",
      // invalid
      "+90 000 000 00 00",
      "000 000 00 00",
      "+90 000 000 000 000",
      "+++++++",
      "+90000000000000",
    ];

    const results = numbers.map((number) =>
      Validator.validatePhoneNumber(number)
    );

    expect(results).toEqual([true, true, false, false, false, false, false]);
  });
});
