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

  test("Groupifies", () => {
    const objects = [
      {
        type: 1,
        group: "bar",
      },
      {
        type: 1,
        group: "bae",
      },
      {
        type: 2,
        group: "bae",
      },
    ];

    const groupByType = ArrayUtils.groupify(objects, "type");
    const groupByGroup = ArrayUtils.groupify(objects, "group");
    const groupByBar = ArrayUtils.groupify(objects, "bar");

    expect(groupByType).toEqual({
      1: [objects[0], objects[1]],
      2: [objects[2]],
    });
    expect(groupByGroup).toEqual({
      bar: [objects[0]],
      bae: [objects[1], objects[2]],
    });
    expect(groupByBar).toEqual({});
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
