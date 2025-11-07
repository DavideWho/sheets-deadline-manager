function easterDate(year) {
  // Easter calculation – Gauss algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function getItalyHolidays(year) {
  const easter = easterDate(year);

  const easterMonday = new Date(easter);
  easterMonday.setDate(easterMonday.getDate() + 1);

  return [
    new Date(year, 0, 1),    // New Year
    new Date(year, 0, 6),    // Epiphany
    easter,
    easterMonday,
    new Date(year, 3, 25),   // Liberation Day (April 25)
    new Date(year, 4, 1),    // Labour Day
    new Date(year, 5, 2),    // Republic Day
    new Date(year, 7, 15),   // Assumption Day
    new Date(year, 10, 1),   // All Saints' Day
    new Date(year, 11, 8),   // Immaculate Conception
    new Date(year, 11, 25),  // Christmas
    new Date(year, 11, 26),  // St. Stephen's Day
  ].map(d => new Date(d.getFullYear(), d.getMonth(), d.getDate())); // normalized
}

function isHoliday(date, holidays) {
  return holidays.some(h => h.getTime() === date.getTime());
}

function adjustHolidayDates() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange("H2:H");
  const values = range.getValues();

  for (let r = 0; r < values.length; r++) {

    let v = values[r][0];
    if (!v) continue;

    // If it's text → convert it
    let d = v instanceof Date ? new Date(v) : new Date(v);
    if (isNaN(d)) continue;

    d = new Date(d.getFullYear(), d.getMonth(), d.getDate()); // normalization
    let year = d.getFullYear();
    let holidays = getItalyHolidays(year);

    while (d.getDay() === 0 || isHoliday(d, holidays)) {
      d.setDate(d.getDate() + 1);

      if (d.getFullYear() !== year) {
        year = d.getFullYear();
        holidays = getItalyHolidays(year);
      }
    }

    sheet.getRange(r + 2, 8).setValue(d);
  }
}
