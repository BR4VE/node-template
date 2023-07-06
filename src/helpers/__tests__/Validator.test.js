import Validator from "helpers/Validator";

import mongoose from "mongoose";

const {
  Types: { ObjectId },
} = mongoose;

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

  test("Validates id", () => {
    const validIds = [
      "123123123123123123123123",
      ObjectId("123123123123123123123123"),
    ];
    const invalidIds = [123123123123123123123123, "123", 123, "hello", {}];

    const results = [...validIds, ...invalidIds].map((id) =>
      Validator.validateId(id)
    );

    expect(results).toEqual([true, true, false, false, false, false, false]);
  });
});
