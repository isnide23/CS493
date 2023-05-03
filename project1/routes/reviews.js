const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Reviews List")
})

router.get("/new", (req, res) => {
    res.send("New Review Form")
})

module.exports = router