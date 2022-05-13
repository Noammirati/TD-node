import { Product } from '../models/products.model.js';

export class ProductRepository {

    populate() {
        return new Promise((resolve, reject) => {
            Product.insertMany([
                { name: "poney", qty: 15, description: "équidé docile" },
                { name: "élephant", qty: 20, description: "Gros pachyderme gris" },
                { name: "hippopotame", qty: 30, description: "Gros pachyderme aquatique" },
                { name: "souris", qty: 12, description: "petit rongeur gris" },
                { name: "zèbre", qty: 20, description: "équidé sauvage" },
                { name: "loup gris", qty: 20, description: "Canidé sauvage" }
            ],
                (err) => {
                    if (!err) {
                        resolve();
                    }
                    reject(err);
                });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            Product.find(
                {},
                (err, products) => {
                    if (!err) {
                        resolve(products.map(p => p.toObject()));
                    }
                    reject(err);
                });

        });

    }

    getById(id) {
        return new Promise((resolve, reject) => {
            Product.findById(
                id,
                (err, product) => {
                    if (!err) {
                        resolve(product.toObject());
                    }
                    reject(err);
                });
        });
    }

    getSearch(search) {
        return new Promise((resolve, reject) => {
            Product.find({
                $or: [
                    { name: { $regex: search } },
                    { description: { $regex: search } }
                ]
            },
                (err, results) => {
                    if (!err) {
                        resolve(results.map(p => p.toObject()));
                    }
                    reject(err);
                });
        });
    }

    update(id, product) {
        return new Promise((resolve, reject) => {
            Product.findByIdAndUpdate(
                id,
                product,
                (err, product) => {
                    if (!err) {
                        resolve(product.toObject());
                    }
                    reject(err);
                });
        });
    }

    create(product) {
        return new Promise((resolve, reject) => {
            Product.create(
                product,
                (err, product) => {
                    if (!err) {
                        resolve(product.toObject());
                    }
                    reject(err);
                });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            Product.findByIdAndDelete(id, (err) => {
                if (!err) {
                    resolve();
                }
                reject(err);
            });
        });
    }
}