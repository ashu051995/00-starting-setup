const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const db = require('../util/database')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

   db.execute('INsert into products (title,imageUrl,description,price) value (?,?,?,?)',[this.title,this.imageUrl,this.description,this.price])
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll() {
   return db.execute("select * from products")
  }

  static findById(id,cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
