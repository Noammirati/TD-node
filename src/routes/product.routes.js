import express from "express";

export function routes(controller) {
    const router = express.Router();
    
    router.get('/new', (req, res) => controller.new(req, res));
    router.get('/search', (req, res) => controller.search(req, res));
    router.get('/populate', (req, res) => controller.populate(req, res));
    router.get('/edit/:id', (req, res) => controller.edit(req, res));
    router.get('/delete/:id', (req, res) => controller.delete(req, res));
    router.get('/:id', (req, res) => controller.getById(req, res));
    router.get('/', (req, res) => controller.getAll(req, res));
    
    router.post('/:id', (req, res) => controller.update(req, res));
    router.post('/', (req, res) => controller.create(req, res));

    return router;
}   