export class ProductController {
    constructor(repository) {
        this.repository = repository;
    }

    getAll(req, res) {
        this.repository.getAll()
        .then((products) => {
            res.render('products-index', { products })
        }).catch((error) => {
            res.render('products-index', { error });
        });
    }

    new(req, res) {
        res.render('products-edit', { product: {} });
    }

    populate(req, res) {
        this.repository.populate()
        .then(() => {
            res.redirect('/products/');
        }).catch((error) => {
            res.render('products-index', { error });
        });
    }

    getById(req, res) {
        this.repository.getById(req.params.id)
        .then((product) => {
            res.render('products-details', { product });
        }).catch((error) => {
            res.render('products-index', { error });
        });
    }

    search(req, res) {
        this.repository.getSearch(req.query.search)
        .then((products) => {
            res.render('products-index', {
                products,
                search: req.query.search
            });
        }).catch((error) => {
            res.render('products-index', { error });
        });
    }

    edit(req, res) {
        this.repository.getById(req.params.id)
        .then((product) => {
            res.render('products-edit', {
                edit: true,
                product
            });
        }).catch((error) => {
            res.render('products-index', { error });
        });
    }

    update(req, res) {
        this.repository.update(req.params.id, req.body)
        .then(() => {
            res.redirect('/products/');
        }).catch((error) => {
            res.render('products-edit', {
                edit: true,
                product: req.body,
                error
            });
        });
    }

    create(req, res) {
        this.repository.create(req.body)
        .then(() => {
            res.redirect('/products/');
        }).catch((error) => {
            res.render('products-edit', {
                edit: true,
                product: req.body,
                error
            });
        });
    }

    delete(req, res) {
        this.repository.delete(req.params.id)
        .then(() => {
            res.redirect('/products/');
        }).catch((error) => {
            res.render('products-index', { error });
        });
    }
}