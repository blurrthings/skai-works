# Contact form → Google Sheet + email notification

The "Contact Me" popup on the site posts JSON straight to a Google Apps
Script Web App. The script appends the submission as a row in a Google
Sheet and emails you a notification — no server, database, or paid
service required.

## 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   blank spreadsheet, e.g. **"AP Works — Contact Submissions"**.
2. In row 1, add these headers (exact spelling, one per column):
   `Timestamp | Name | Email | Phone | Subject | Message`

## 2. Add the Apps Script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete anything in `Code.gs` and paste this in:

   ```javascript
   const NOTIFY_EMAIL = "blurrthings@gmail.com"; // <-- where you want notifications sent
   const SHEET_NAME = "Sheet1"; // <-- tab name at the bottom of your sheet

   function doPost(e) {
     try {
       const data = JSON.parse(e.postData.contents);
       const name = (data.name || "").toString().trim();
       const email = (data.email || "").toString().trim();
       const phone = (data.phone || "").toString().trim();
       const subject = (data.subject || "").toString().trim();
       const message = (data.message || "").toString().trim();

       if (!name || !email || !subject || !message) {
         return jsonResponse({ ok: false, error: "Missing required fields." });
       }

       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
       sheet.appendRow([new Date(), name, email, phone, subject, message]);

       MailApp.sendEmail({
         to: NOTIFY_EMAIL,
         replyTo: email,
         subject: "New contact form submission: " + subject,
         body:
           "Name: " + name + "\n" +
           "Email: " + email + "\n" +
           "Phone: " + (phone || "-") + "\n" +
           "Subject: " + subject + "\n\n" +
           message,
       });

       return jsonResponse({ ok: true });
     } catch (err) {
       return jsonResponse({ ok: false, error: err.message });
     }
   }

   function jsonResponse(obj) {
     return ContentService
       .createTextOutput(JSON.stringify(obj))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Update `NOTIFY_EMAIL` to the address that should receive new-message
   emails (it can be the same Google account or a different one).
4. Confirm `SHEET_NAME` matches your sheet's tab name (bottom-left tab,
   default is `Sheet1`).
5. Save the project (Ctrl+S / Cmd+S), name it e.g. "Contact Form Handler".

## 3. Deploy it as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - Description: `Contact form endpoint`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**.
5. The first time, Google will ask you to authorize the script —
   click through the consent screen (it'll warn "Google hasn't verified
   this app" because it's your own personal script; click **Advanced →
   Go to (project name) → Allow**).
6. Copy the **Web app URL** shown after deployment. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Wire it into the site

1. Create a `.env.local` file in the project root (copy `.env.example`):
   ```
   NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
   ```
2. Restart `npm run dev` so the new env var is picked up.
3. On your deployment host (e.g. Vercel), add the same env var under
   Project Settings → Environment Variables, then redeploy.

## 5. Test it

Open the site, click "Contact Me", submit the form. You should see:
- A new row appended to the Google Sheet.
- An email notification at `NOTIFY_EMAIL`, with "Reply-To" set to the
  submitter's email so you can hit reply directly.

## Re-deploying after editing the script

If you edit `Code.gs` later, the existing Web App URL keeps working
only if you create a **new version**: Deploy → Manage deployments →
edit (pencil) the active deployment → Version: **New version** → Deploy.
Creating a brand-new deployment instead would give you a different URL.
