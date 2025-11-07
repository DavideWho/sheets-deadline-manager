function checkDeadlines() {
  const SHEET_NAME = "Scadenze"; // 🔹 Change if needed
  const EMAIL = "email@email.com"; // 🔹 Change if needed

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME);
  const last = sh.getLastRow();
  if (last < 2) return; // no data

  // Read the columns:
  // A = case name
  // D = deadline date
  // J = remaining days
  // M = notified Yes-No
  const data = sh.getRange(2, 1, last - 1, 10).getValues();

  data.forEach((row, i) => {
    const name = row[0];      // col A
    const deadline = row[3];  // col D
    const days = row[9];      // col J
    const flag = row[12];     // col M

    if (name != "") Logger.log(name);
    if (deadline != "") Logger.log(deadline);
    if (typeof days === "number") Logger.log(days);

    if (typeof days === "number" && days <= 14 && flag != "V") {
      const subject = `⚠️ Case approaching deadline`;
      const body = `Attention!\n\nThe following case expires in ${days} days:\n\n` +
                   `📄 Case: ${name}\n` +
                   `📅 Deadline: ${deadline}\n\n` +
                   `Check the spreadsheet for more details.`;

      MailApp.sendEmail(EMAIL, subject, body);

      const sheetRow = i + 2; // because data starts from row 2
      sh.getRange(sheetRow, 13).setValue("V");
    }
  });
}
