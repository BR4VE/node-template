import ObjectUtils from "helpers/utils/ObjectUtils";

describe("ObjectUtils", () => {
  test("Clones with defined props", () => {
    const obj = { name: "John", lastName: "Doe", number: 10 };
    const props = ["name", "lastName", "city"];

    const clone = ObjectUtils.cloneWithDefinedProps(obj, props);

    expect(clone.name).toBe(obj.name);
    expect(clone.lastName).toBe(obj.lastName);
    expect(clone.city).not.toBeDefined();
    expect(clone.number).not.toBeDefined();
  });

  test("Filters object fields", () => {
    const target = { firstName: "first", lastName: "last", code: null };
    const source = { firstName: "name", code: 123 };

    const filteredTarget = ObjectUtils.filterObjectFields(target, source);

    expect(filteredTarget.firstName).toBe(target.firstName);
    expect(filteredTarget.lastName).not.toBeDefined();
    expect(filteredTarget.code).toBe(null);

    expect(filteredTarget).not.toBe(target);
  });

  test("Hides object fields", () => {
    const obj = { firstName: "first", lastName: "last", code: 12345 };
    const extractField = "code";

    const copiedObj = ObjectUtils.hideObjectFields(obj, [extractField]);

    expect(copiedObj.firstName).toBe(obj.firstName);
    expect(copiedObj.lastName).toBe(obj.lastName);
    expect(copiedObj.code).toBe("HIDDEN");

    expect(copiedObj).not.toBe(obj);
  });
});
