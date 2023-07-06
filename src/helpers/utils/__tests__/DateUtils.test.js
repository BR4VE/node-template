import DateUtils from "helpers/utils/DateUtils";

describe("DateUtils", () => {
  test("Gets days ago", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const utilDate = DateUtils.getDaysAgo(1);

    expect(utilDate.getFullYear()).toBe(yesterday.getFullYear());
    expect(utilDate.getMonth()).toBe(yesterday.getMonth());
    expect(utilDate.getDate()).toBe(yesterday.getDate());
    expect(utilDate.getHours()).toBe(yesterday.getHours());
    expect(utilDate.getMinutes()).toBe(yesterday.getMinutes());
  });

  test("Gets days later", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const utilDate = DateUtils.getDaysLater(1);

    expect(utilDate.getFullYear()).toBe(tomorrow.getFullYear());
    expect(utilDate.getMonth()).toBe(tomorrow.getMonth());
    expect(utilDate.getDate()).toBe(tomorrow.getDate());
    expect(utilDate.getHours()).toBe(tomorrow.getHours());
    expect(utilDate.getMinutes()).toBe(tomorrow.getMinutes());
  });

  test("Gets next week", () => {
    const sixDaysLater = new Date();
    const eightDaysLater = new Date();

    sixDaysLater.setDate(sixDaysLater.getDate() + 6);
    eightDaysLater.setDate(eightDaysLater.getDate() + 8);

    const nextWeek = DateUtils.getNextWeek();

    expect(nextWeek.getTime()).toBeGreaterThan(sixDaysLater.getTime());
    expect(nextWeek.getTime()).toBeLessThan(eightDaysLater.getTime());
  });

  test("Gets month ago", () => {
    const today = new Date();
    const monthsSinceYear = today.getMonth() + 1;

    const pastYear = DateUtils.getMonthAgo(monthsSinceYear);

    expect(pastYear.getDate()).toBe(today.getDate());
    expect(pastYear.getMonth()).toBe(11);
    expect(pastYear.getFullYear()).toBe(today.getFullYear() - 1);
  });

  test("Gets hours ago", () => {
    const today = new Date();
    const before = DateUtils.getHoursAgo(5);

    expect(before.getHours()).toBe(today.getHours() - 5);
  });

  test("Gets seconds ago", () => {
    const now = new Date();
    const pastSeconds = now.getSeconds() - 3;
    const expectedSeconds = pastSeconds < 0 ? 60 + pastSeconds : pastSeconds;
    const before = DateUtils.getSecondsAgo(3);

    expect(before.getSeconds()).toBe(expectedSeconds);
  });

  test("Floors to decimal seconds", () => {
    const date = new Date();
    const roundedDate = DateUtils.floorToDecimalSeconds(date);
    const flooredSeconds = Math.floor(date.getSeconds() / 10) * 10;

    expect(roundedDate.getFullYear()).toBe(date.getFullYear());
    expect(roundedDate.getMonth()).toBe(date.getMonth());
    expect(roundedDate.getDate()).toBe(date.getDate());
    expect(roundedDate.getHours()).toBe(date.getHours());
    expect(roundedDate.getMinutes()).toBe(date.getMinutes());
    expect(roundedDate.getSeconds()).toBe(flooredSeconds);
    expect(roundedDate.getMilliseconds()).toBe(0);
  });

  test("Floors to flat hour", () => {
    const date = new Date();
    const roundedDate = DateUtils.floorToFlatHour(date);

    expect(roundedDate.getFullYear()).toBe(date.getFullYear());
    expect(roundedDate.getMonth()).toBe(date.getMonth());
    expect(roundedDate.getDate()).toBe(date.getDate());
    expect(roundedDate.getHours()).toBe(date.getHours());
    expect(roundedDate.getMinutes()).toBe(0);
    expect(roundedDate.getSeconds()).toBe(0);
    expect(roundedDate.getMilliseconds()).toBe(0);
  });

  test("Floors to flat month", () => {
    const date = new Date();
    const roundedDate = DateUtils.floorToFlatMonth(date);

    expect(roundedDate.getFullYear()).toBe(date.getFullYear());
    expect(roundedDate.getMonth()).toBe(date.getMonth());
    expect(roundedDate.getDate()).toBe(1);
    expect(roundedDate.getHours()).toBe(0);
    expect(roundedDate.getMinutes()).toBe(0);
    expect(roundedDate.getSeconds()).toBe(0);
    expect(roundedDate.getMilliseconds()).toBe(0);
  });
});
