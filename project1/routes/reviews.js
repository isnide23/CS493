const express = require('express')
const router = express.Router()

reviews = [
    {
      "id": 0,
      "businessid": 0,
      "dollarRating": 1,
      "starRating": 4.5,
      "review": "Cheap, delicious food."
    },
    {
      "id": 1,
      "businessid": 2,
      "dollarRating": 1,
      "starRating": 4,
      "review": "How many fasteners can one room hold?"
    },
    {
      "id": 2,
      "businessid": 1,
      "dollarRating": 1,
      "starRating": 5,
      "review": "Joel, the owner, is super friendly and helpful."
    }
  ]

// Route to create a new review.
router.post('/', function (req, res, next) {
    if (req.body) { 
        if (!req.body.dollarRating || !req.body.starRating ) {
            res.status(400).json({
                err: "Request needs a JSON body with a dollarRating and starRating field"
            });
        } else {
          review.id = reviews.length;
          reviews.push(review);
          res.status(201).json({
            id: review.id,
            links: {
              review: `/reviews/${review.id}`,
              business: `/businesses/${review.businessid}`
            }
          });
        }
    
      } else {
        res.status(400).json({
          error: "Request body is not a valid review object"
        });
      }
})
  
 
// Route to fetch info about a specific review.
router.get('/:reviewID', function (req, res, next) {

})
  

// Route to update a review.
router.put('/:reviewID', function (req, res, next) {

})
  

// Route to delete a review.
router.delete('/:reviewID', function (req, res, next) {

})

module.exports = router