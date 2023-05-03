const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Photo List")
})

router.get("/new", (req, res) => {
    res.send("New Photo Form")
})

module.exports = router