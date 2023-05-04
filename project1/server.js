const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.set('view engine', 'ejs')

app.use(express.static('public'))

const businessesRouter = require('./routes/businesses')
const photosRouter = require('./routes/photos')
const reviewsRouter = require('./routes/reviews')

app.use('/businesses', businessesRouter)
app.use('/photos', photosRouter)
app.use('/reviews', reviewsRouter)

app.use('*', function (req, res, next) {
    res.status(404).json({
        error: "Requested resource " + req.originalUrl + " does not exist"
    });
});

app.use('*', function (err, req, res, next) {
    console.error("== Error:", err)
    res.status(500).send({
        err: "Server error.  Please try again later."
    })
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});