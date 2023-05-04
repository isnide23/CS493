const express = require('express')
const router = express.Router()


// Route to return a list of businesses.
 
router.get('/', function (req, res) {
    res.status(200).json({
        businesses: pageBusinesses,
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: businesses.length,
        links: links
      });
})

// Route to create a new business.
router.post('/', function (req, res, next) {

})

// Route to fetch info about a specific business.
router.get('/:businessid', function (req, res, next) {

})

// Route to replace data for a business.
router.put('/:businessid', function (req, res, next) {

})

// Route to delete a business.
router.delete('/:businessid', function (req, res, next) {

})


module.exports = router