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


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});