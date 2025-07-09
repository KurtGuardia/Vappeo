import 'server-only'
import { google } from 'googleapis'

function getGoogleSheetsClient() {
  const credentialsJson = Buffer.from(
    process.env.GOOGLE_CREDENTIALS_BASE64,
    'base64',
  ).toString('utf-8')

  const credentials = JSON.parse(credentialsJson)

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

    const response =
      await sheets.spreadsheets.values.batchGet({
        spreadsheetId,
        ranges,
      })

    return response.data.valueRanges
  } catch (err) {
    console.error(
      'Error fetching from Google Sheets API:',
      err,
    )
    return null
  }
}

export function sheetsDataToObject(data) {
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
