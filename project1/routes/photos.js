const express = require('express')
const router = express.Router()

var photos = [
    {
      "id": 0,
      "businessid": 1,
      "caption": "Yummy food."
    },
    {
      "id": 1,
      "businessid": 1,
      "caption": "Nice tables."
    },
    {
      "id": 2,
      "businessid": 2,
      "caption": "Good drinks."
    }
  ]

// Route to get a list of photos.
router.get('/', function (req, res, next) {
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(photos.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;

    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pagePhotos = photos.slice(start, end);

    var links = {};
    if (page < lastPage) {
        links.nextPage = '/photos?page=' + (page + 1);
        links.lastPage = '/photos?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/photos?page=' + (page - 1);
        links.firstPage = '/photos?page=1';
    }

    res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: photos.length,
        photos: pagePhotos,
        links: links
    });
})
/*
curl --location 'http://localhost:8000/photos'
*/


// Route to post a new photo.
router.post('/', function (req, res, next) {
    if (req.body) { 
        if (!req.body.caption || !req.body.businessid) {
            res.status(400).json({
                err: "Request needs a JSON body with a businesses ID and caption field"
            });
        } else {
            photo = req.body
            photos.id = photos.length - 1;
            photos.push(photo);
            res.status(201).json({
                id: photo.id,
                businessid: req.body.businessid,
                caption: req.body.caption
          });
        }
    
      } else {
        res.status(400).json({
          error: "Request body is not valid"
        });
      }
})


// Route to get info about a specific photo.
router.get('/:photoID', function (req, res, next) {
    const photoID = parseInt(req.params.photoID);
    if (photos[photoID]) {
        res.status(200).json(photos[photoID]);
    } else {
        next();
    }
})
/*
curl --location 'http://localhost:8000/photos/2'
*/

// Route to put new caption info into an existing photo.
router.put('/:photoID', function (req, res, next) {
    const photoID = parseInt(req.params.photoID);
    if (photos[photoID]) {
        if (req.body && (!req.body.caption || !req.body.businessid)) {
            photos[photoID] = req.body;
            res.status(200).json({
                links: {
                    photo: '/photos/' + photoID
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
curl --location --request PUT 'http://localhost:8000/photos/2' \
--header 'Content-Type: application/json' \
--data '{
    "caption" : "New Caption"
}'
*/


// Route to delete a photo.
router.delete('/:photoID', function (req, res, next) {
    var photoID = parseInt(req.params.photoID);
    if (photos[photoID]) {
        photos[photoID] = null;
        res.status(204).end();
    } else {
        next();
    }
})
/*
curl --location --request DELETE 'http://localhost:8000/photos/2'
*/


module.exports = router

