const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const multer = require('multer')
const XLSX = require('xlsx')

app.set("view engine", "ejs")

const upload = multer({ dest: 'upload/' })


app.get('/', (req, res) => {
    res.render("excel")
})

app.post('/upload-excel', upload.single('excelFile'), (req, res) => {
    const filepath = path.join(__dirname, req.file.path)
    const workbook = XLSX.readFile(filepath)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(sheet)

    res.json({
        message: 'message send successful uploads'
        , data
    }

    )
})

app.get('/exports-excel', (req, res) => {
    const data = [{
        name: "pratik",
        age: 21,
        city: "pune",

    },
    {
        name: "ankur",
        age: 21,
        city: "mumbai",
    }, {
        name: "vikram",
        age: 21,
        city: "USA",
    }, {
        name: "viral",
        age: 22,
        city: "surat",
    }]

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, worksheet, "data")
    const excelbuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" })

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx")
    res.end(excelbuffer)
})

app.listen(3000, () => {
    console.log("app runing on port number 3000")
})