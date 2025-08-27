import 'server-only'
import { google } from 'googleapis'

function getGoogleSheetsClient() {
  // Construct the credentials object directly from environment variables.
  // This is much safer and avoids parsing/decoding errors.
  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    // The `.replace()` is crucial to turn the string "\\n" back into real newlines.
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(
      /\\n/g,
      '\n',
    ),
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
    ],
  })

  return google.sheets({ version: 'v4', auth })
}

export async function getSheetsData(ranges) {
  try {
    const sheets = getGoogleSheetsClient()
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    if (!spreadsheetId) {
      throw new Error(
        'GOOGLE_SHEET_ID environment variable not set.',
      )
    }

    const response =
      await sheets.spreadsheets.values.batchGet({
        spreadsheetId,
        ranges,
      })

    return response.data.valueRanges
  } catch (err) {
    // Log the error for debugging on the server, but don't expose it to the client.
    console.error(
      'Error fetching from Google Sheets API:',
      err.message,
    )
    // Return null to signify failure, which the page will handle.
    return null
  }
}

export function sheetsDataToObject(data) {
  if (!data || data.length === 0) {
    return [] // Return an empty array if there's no data to process
  }
  const headers = data[0]
  const rows = data.slice(1)
  return rows.map((row) => {
    const item = {}
    headers.forEach((header, index) => {
      item[header] = row[index] || null
    })
    return item
  })
}
