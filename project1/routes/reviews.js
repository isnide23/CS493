const express = require('express')
const router = express.Router()

var reviews = [
    {
      "id": 0,
      "businessid": 0,
      "dollarRating": 1,
      "starRating": 4.5,
      "review": "Yummy."
    },
    {
      "id": 1,
      "businessid": 2,
      "dollarRating": 1,
      "starRating": 4,
      "review": "Delicous."
    },
    {
      "id": 2,
      "businessid": 1,
      "dollarRating": 1,
      "starRating": 5,
      "review": "Amazing."
    }
  ]

// Route to get a list of reviews.
router.get('/', function (req, res, next) {
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(reviews.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;

    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pageReviews = reviews.slice(start, end);

    var links = {};
    if (page < lastPage) {
        links.nextPage = '/reviews?page=' + (page + 1);
        links.lastPage = '/reviews?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/reviews?page=' + (page - 1);
        links.firstPage = '/reviews?page=1';
    }

    res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: reviews.length,
        reviews: pageReviews,
        links: links
    });
})
/*
curl --location 'http://localhost:8000/reviews'
*/

// Route to post a new review.
router.post('/', function (req, res, next) {
    if (req.body) { 
        if (!req.body.dollarRating || !req.body.starRating ) {
            res.status(400).json({
                err: "Request needs a JSON body with a dollarRating and starRating field"
            });
        } else {
            review = req.body
            review.id = reviews.length - 1;
            reviews.push(review);
            res.status(201).json({
                id: review.id,
                dollarRating: req.body.dollarRating,
                starRating: req.body.starRating
          });
        }
    
      } else {
        res.status(400).json({
          error: "Request body is not valid"
        });
      }
}) 

/*
curl --location 'http://localhost:8000/reviews' \
--header 'Content-Type: application/json' \
--data '{
      "dollarRating": 7,
      "starRating": 7
}'
*/
  
 
// Route to fetch info about a specific review.
router.get('/:reviewID', function (req, res, next) {
    const reviewID = parseInt(req.params.reviewID);
    if (reviews[reviewID]) {
        res.status(200).json(reviews[reviewID]);
    } else {
        next();
    }
})
/*
curl --location 'http://localhost:8000/reviews/2'
*/

// Route to update a review.
router.put('/:reviewID', function (req, res, next) {
    const reviewID = parseInt(req.params.reviewID);
    if (reviews[reviewID]) {
        if (req.body && (req.body.dollarRating && req.body.starRating)) {
            reviews[reviewID] = req.body;
            res.status(200).json({
                links: {
                    review: '/reviews/' + reviewID
                }
            });
        } else {
            res.status(400).json({
                err: "Request needs a JSON body with a name field"
            });
        }
    } else {
        next();
    }
})

/*
curl --location --request PUT 'http://localhost:8000/reviews/2' \
--header 'Content-Type: application/json' \
--data '{
    "dollarRating": 7,
    "starRating" : 7
}'
*/

// Route to delete a review.
router.delete('/:reviewID', function (req, res, next) {
    var reviewID = parseInt(req.params.reviewID);
        if (reviews[reviewID]) {
            reviews[reviewID] = null;
            res.status(204).end();
        } else {
            next();
        }
})

/*
curl --location --request DELETE 'http://localhost:8000/reviews/2'
*/

module.exports = router