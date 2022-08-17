import DateUtils from "helpers/utils/DateUtils";

describe("DateUtils", () => {
  test("Gets next week", () => {
    const sixDaysLater = new Date();
    const eightDaysLater = new Date();

    sixDaysLater.setDate(sixDaysLater.getDate() + 6);
    eightDaysLater.setDate(eightDaysLater.getDate() + 8);

    const nextWeek = DateUtils.getNextWeek();

    expect(nextWeek.getTime()).toBeGreaterThan(sixDaysLater.getTime());
    expect(nextWeek.getTime()).toBeLessThan(eightDaysLater.getTime());
  });
});
