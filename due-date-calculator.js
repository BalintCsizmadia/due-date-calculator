const days = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

const workHours = {
  WORKDAY_START: 9,
  WORKDAY_END: 17,
};

/**
 * @author Bálint Csizmadia
 */
class DueDateCalculator {
  constructor() {}

  /**
   *
   * @param {Date} submitDate the date/time when the issue is submitted
   * @param {number} turnaroundTime in hours
   * @returns {Date} the date/time when the issue is resolved
   */
  calculateDueDate(submitDate, turnaroundTime) {
    if (!this.isValidParameters(submitDate, turnaroundTime)) {
      throw new Error("Invalid parameters");
    }
    if (this.isValidSubmitDate(submitDate)) {
      let tempTurnaroundHours = turnaroundTime;
      let tempDate = new Date(submitDate);

      while (tempTurnaroundHours > 0) {
        const hoursLeftFromWorkday =
          workHours.WORKDAY_END - tempDate.getHours();
        // decrease turnaround hours
        tempTurnaroundHours -= hoursLeftFromWorkday;
        this.handleDayChanges(tempDate, workHours.WORKDAY_START);
      }
      // handle remainders
      if (tempTurnaroundHours < 0) {
        this.handleDayChanges(
          tempDate,
          workHours.WORKDAY_END + tempTurnaroundHours,
          false
        );
        tempTurnaroundHours = 0;
      }
      return tempDate;
    } else {
      console.warn(
        "Days must be between Monday to Friday and hours must be between 9AM to 5PM"
      );
      throw new Error("Invalid submit date");
    }
  }

  /**
   *
   * @param {Date} submitDate
   * @param {number} turnaroundTime
   * @returns true if the parameter's type are correct
   */
  isValidParameters(submitDate, turnaroundTime) {
    return submitDate instanceof Date && typeof turnaroundTime === "number"
      ? true
      : false;
  }

  /**
   *
   * @param {Date} date
   * @returns true if hours are from 9AM to 5PM between Monday to Friday
   */
  isValidSubmitDate(date) {
    return this.isValidWorkDay(date.getDay()) &&
      date.getHours() >= workHours.WORKDAY_START &&
      date.getHours() <= workHours.WORKDAY_END
      ? true
      : false;
  }

  /**
   *
   * @param {number} day
   * @returns true if day is between Monday to Friday
   */
  isValidWorkDay(day) {
    return day <= days.FRIDAY;
  }

  /**
   *
   * @param {Date} date
   * @param {number} startHour
   * @param {boolean} increaseDay
   * @description set the next or previous valid day (between Monday to Friday) and start hours
   */
  handleDayChanges(date, startHour, increaseDay = true) {
    if (increaseDay) {
      if (date.getDay() === days.FRIDAY) {
        date.setDate(date.getDate() + 3);
      } else {
        date.setDate(date.getDate() + 1);
      }
      date.setHours(startHour);
    } else {
      // decrease day
      date.setDate(
        date.getDay() === days.MONDAY ? date.getDate() - 3 : date.getDate() - 1
      );
      date.setHours(startHour);
    }
  }
}
