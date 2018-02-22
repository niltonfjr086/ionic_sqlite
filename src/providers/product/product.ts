import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) {

  }

  public insert(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'INSERT INTO products (name, price, duedate, active, category_id) VALUES (?, ?, ?, ?, ?)';
        let data = [product.name, product.price, product.duedate, (product.active ? 1 : 0), product.category_id];

        return db.executeSql(sql, data).catch((e) => { console.log(e) });
      })
      .catch((e) => { console.log(e) })
  }

  public update(product: Product) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'UPDATE products SET name = ?, price = ?, duedate = ?, active = ?, category_id = ? WHERE id = ?';
        let data = [product.name, product.price, product.duedate, (product.active ? 1 : 0), product.category_id, product.id];

        return db.executeSql(sql, data).catch((e) => { console.log(e) });
      })
      .catch((e) => { console.log(e) })
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM products WHERE id = ?';
        let data = [id];

        return db.executeSql(sql, data).catch((e) => { console.log(e) });
      })
      .catch((e) => { console.log(e) })
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM products WHERE id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let product = new Product();
              product.id = item.id;
              product.name = item.name;
              product.price = item.price;
              product.duedate = item.duedate;
              product.active = item.active;
              product.category_id = item.category_id;

              // return product;
            }

            return null;
          })
          .catch((e) => { console.log(e) });
      })
      .catch((e) => { console.log(e) })
  }

  public getAll(active: boolean, name: string = null) {
    return this.dbProvider.getDB()
      // .then((db: SQLiteObject) => {
      //   let sql = 'DELETE FROM products WHERE id = ?';
      //   let data = [id];

      //   return db.executeSql(sql, data).catch((e) => { console.log(e) });
      // })
      // .catch((e) => { console.log(e) })
  }

}

export class Product {
  id: number;
  name: string;
  price: number;
  duedate: Date;
  active: boolean;
  category_id: number;

}
