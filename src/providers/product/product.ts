import { DatabaseProvider } from './../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductProvider {

  constructor(private dbProvider: DatabaseProvider) {}

  public insert(product: Product){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'insert into products (name, price, duedate, active, category_id) values (?, ?, ?, ?, ?)';
      let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id];

      return db.executeSql(sql, data)
      .catch((e) => console.error(e));
    })
    .catch((e => console.error(e)));
  }

  public update(product: Product){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'update products set name = ?, price = ?, duedate = ?, active = ?, category_id = ? where id = ?';
      let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id];

      return db.executeSql(sql, data)
      .catch((e) => console.error(e));
    })
    .catch((e => console.error(e)));
  }
  public remove(id: number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'delete from products where id = ?';
      let data = [id];

      return db.executeSql(sql, data)
      .catch((e) => console.error(e));
    })
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
