class DateUtils {
  static floorToDecimalSeconds(date) {
    const clonedDate = new Date(date);
    const seconds = clonedDate.getSeconds();
    const flooredSeconds = Math.floor(seconds / 10) * 10;

    clonedDate.setSeconds(flooredSeconds, 0);
    return clonedDate;
  }

  static floorToFlatHour(date) {
    const clonedDate = new Date(date);
    clonedDate.setMinutes(0, 0, 0);
    return clonedDate;
  }

  static floorToFlatMinutes(date) {
    const clonedDate = new Date(date);
    const minutes = clonedDate.getMinutes();
    clonedDate.setMinutes(minutes, 0, 0);
    return clonedDate;
  }

  static floorToFlatMonth(date) {
    const clonedDate = new Date(date);
    const month = clonedDate.getMonth();
    clonedDate.setMonth(month, 1);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
  }

  static getDaysAgo(count = 1) {
    const now = new Date();
    now.setDate(now.getDate() - count);
    return now;
  }

  static getDaysLater(count = 1) {
    const now = new Date();
    now.setDate(now.getDate() + count);
    return now;
  }

  static getHoursAgo(count = 1) {
    const now = new Date();
    now.setHours(now.getHours() - count);
    return now;
  }

  static getMonthAgo(count = 1) {
    const now = new Date();
    now.setMonth(now.getMonth() - count);
    return now;
  }

  static getMonthLater(count = 1) {
    const now = new Date();
    now.setMonth(now.getMonth() + count);
    return now;
  }

  static getNextWeek() {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  }

  static getSecondsAgo(count = 1) {
    const now = new Date();
    now.setSeconds(now.getSeconds() - count);
    return now;
  }

  static getYearsLater(count = 1) {
    const now = new Date();
    now.setFullYear(now.getFullYear() + count);
    return now;
  }

  static isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !Number.isNaN(date);
  }
}

export default DateUtils;
