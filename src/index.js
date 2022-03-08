const express = require('express');
require('dotenv').config();
const cors=require('cors')
var path = require('path');
const getSheetData=require('./utils/googleSheets')

const app = express();
app.use(cors())
getSheetData()
app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/getAllCoordinates',async(req,res)=>{
  let data= await getSheetData()
  return res.json({
    success:true,
    data:{coordinates:data.data,lastRow:data.lastRow}
  }) 
})



 
app.listen(process.env.PORT||80);
