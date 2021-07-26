class DateUtils {
  static getNextWeek() {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  }
}

export default DateUtils;
