const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Business List")
})

router.get("/new", (req, res) => {
    res.send("New Business Form")
})

module.exports = router