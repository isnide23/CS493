const express = require('express')
const router = express.Router()

var businesses = [
    {
        "id": 0,
        "name": "Deschutes Brewery",
      },
      {
        "id": 1,
        "name": "Crux",
      },
      {
        "id": 2,
        "name": "Goodlife",
      }

];

// Route to return a list of businesses.
router.get('/', function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var numPerPage = 10;
    var lastPage = Math.ceil(businesses.length / numPerPage);
    page = page < 1 ? 1 : page;
    page = page > lastPage ? lastPage : page;

    var start = (page - 1) * numPerPage;
    var end = start + numPerPage;
    var pageBusinesses = businesses.slice(start, end);

    var links = {};
    if (page < lastPage) {
        links.nextPage = '/businesses?page=' + (page + 1);
        links.lastPage = '/businesses?page=' + lastPage;
    }
    if (page > 1) {
        links.prevPage = '/businesses?page=' + (page - 1);
        links.firstPage = '/businesses?page=1';
    }

    res.status(200).json({
        pageNumber: page,
        totalPages: lastPage,
        pageSize: numPerPage,
        totalCount: businesses.length,
        businesses: pageBusinesses,
        links: links
    });

})

// Route to create a new business.
router.post('/', function (req, res, next) {
    if (req.body && req.body.name) {
        businesses.push(req.body);
        var id = lodgings.length - 1;
        res.status(201).json({
            id: id,
            links: {
                business: '/businesses/' + id
            }
        });
    } else {
        res.status(400).json({
            err: "Request needs a JSON body with a name field"
        });
    }
})

// Route to fetch info about a specific business.
router.get('/:businessid', function (req, res, next) {
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]) {
        res.status(200).json(businesses[businessID]);
    } else {
        next();
    }
})

// Route to replace data for a business.
router.put('/:businessid', function (req, res, next) {
    var businessID = parseInt(req.params.businessID);
    if (businesses[businessID]) {
        businesses[businessID] = req.body;
        res.status(200).json({
            links: {
                businesses: '/businesses/' + businessID
            }
        });
    } else {
        next();
    }
})

// Route to delete a business.
router.delete('/:businessid', function (req, res, next) {
    const businessid = parseInt(req.params.businessid);
    if (businesses[businessid]) {
        businesses[businessid] = null;
        res.status(204).end();
    } else {
        next();
  }
})


module.exports = router