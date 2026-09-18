/**
 * Theia Audition — Google Apps Script
 * ------------------------------------
 * Receives a POST from the Next.js registration form and appends a row to
 * the active Google Sheet.
 *
 * Sheet column order (row 1 must have these exact headers):
 *   Full Name | Enrollment Number | Phone | Instagram Handle | Interest | Portfolio Links | Timestamp
 *
 * Deploy → New deployment → Web app
 *   • Execute as: Me
 *   • Who has access: Anyone
 * Copy the deployment URL into your .env as NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL
 */

const SHEET_NAME = "Registrations"; // change if your tab has a different name

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    // ── Ensure header row exists ─────────────────────────────────────────
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Full Name",
        "Enrollment Number",
        "Phone",
        "Instagram Handle",
        "Interest",
        "Portfolio Links",
        "Timestamp",
      ]);
    }

    // ── Parse POST body ──────────────────────────────────────────────────
    const params       = e.parameter;
    const timestamp    = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const name         = (params.name         || "").trim();
    const enrollment   = (params.enrollment   || "").trim();
    const phone        = (params.phone        || "").trim(); // already "+91XXXXXXXXXX" from the app
    const instaHandle  = (params.instaHandle  || "").trim(); // already "@handle" from the app
    const interest     = (params.interest     || "").trim();
    const portfolio    = (params.portfolioLinks || "").trim();

    // ── Append row ───────────────────────────────────────────────────────
    sheet.appendRow([name, enrollment, phone, instaHandle, interest, portfolio, timestamp]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Convenience GET handler — returns a health-check so you can test the URL in a browser */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Theia Audition Script is live." }))
    .setMimeType(ContentService.MimeType.JSON);
}
