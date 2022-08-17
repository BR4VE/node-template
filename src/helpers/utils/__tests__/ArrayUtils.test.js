import ArrayUtils from "helpers/utils/ArrayUtils";

describe("ArrayUtils", () => {
  test("Contains", () => {
    const source = ["name", false];
    const targets = [
      // Should contain
      ["name"],
      [false],
      ["name", false],
      // Should not contain
      ["lastName"],
      [true],
      ["name", true],
    ];

    const results = targets.map((target) =>
      ArrayUtils.contains(target, source)
    );

    expect(results).toEqual([true, true, true, false, false, false]);
  });

  test("Gets keys", () => {
    const arr = [{ name: "john" }, { name: "doe" }, { name: null }, {}];

    const keys = ArrayUtils.getKeys(arr, "name");

    expect(keys).toEqual(["john", "doe", null, undefined]);
  });

  test("Mapifies", () => {
    const arrayOfObjects = [{ name: "john" }, { name: "doe" }, { name: null }];

    const namesMap = ArrayUtils.mapify(arrayOfObjects, "name");
    const names = Object.keys(namesMap);

    expect(names).toHaveLength(2);

    expect(namesMap.john).toEqual(arrayOfObjects[0]);
    expect(namesMap.doe).toEqual(arrayOfObjects[1]);
  });
});
