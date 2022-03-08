const {google} = require("googleapis");
const fs =require("fs");
const { resolve } = require("path");
const spreadsheetId=process.env.SPREADSHEETID;
const CREDENTIAL = JSON.parse(fs.readFileSync(__dirname+'/googleSheetCredentials.json'));

const getRow=async ()=>{
 
  const auth = new google.auth.GoogleAuth({
    keyFile: "./src/utils/googleSheetCredentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });


  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "nishant",
  });

    let data=[];
    let rows=getRows.data.values;

    for(let i=0;i<rows.length-8;i++){
        data.push({
            lat:rows[i+8][2]*1,
            lng:rows[i+8][3]*1
        })
    }
    let lastRow={
        valid:rows[rows.length-1][0],
        
        time:rows[rows.length-1][1],
        altitude:rows[rows.length-1][4],
        speed:rows[rows.length-1][5],
        address:rows[rows.length-1][6],
        attributes:rows[rows.length-1][7]
    };
    return {data,lastRow};
    
}

module.exports= getRow;