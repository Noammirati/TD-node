import express from 'express';
import { create } from 'express-handlebars';
import { routes } from './routes/product.routes.js';
import { ProductRepository } from './repositories/product.repository.js';
import { ProductController } from './controllers/product.controller.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
const TEMPLATING_EXT = '.hbs';

const app = express();
const hbs = create({ extname: TEMPLATING_EXT });

/** Database */

const uri = 'mongodb://localhost:27017/app';

mongoose.connect(uri, (error) => {
    if (error) throw error;
    // Ready
    console.log("MongoDB database connection established successfully");
});

/** Handlebars */

app.engine(TEMPLATING_EXT, hbs.engine);
app.set('view engine', TEMPLATING_EXT);

/** Auto parsing */

app.use(express.urlencoded({
    extended: false
}));

/** Routes */

app.use('/public', express.static("./assets"));

app.use('/error', (req, res) => {
    throw new Error('Test');
});

/** Products */

const productRepository = new ProductRepository();
const productController = new ProductController(productRepository);

app.use('/products/', routes(productController));
app.get('/', (req, res) => {
    res.render('index', {
        page: 0,
    });
});

/** Errors */

app.use((error, req, res, next) => {
    console.error('fatal server error: ', error.message);
    res.status(500).send('fatal server error: ' + error.message);
});

/** Launch server */
const server = app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});