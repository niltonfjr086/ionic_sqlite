import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {

  }

  public getDB() {
    return this.sqlite.create({
      name: 'products.db',
      location: 'default'
    });
  }

  public createDataBase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);
        this.insertDefaultItems(db);
      })
      .catch(e => {
        console.error(e) })

  }

  public createTables(db: SQLiteObject) {
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT)'],
      ['CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, price REAL, duedate DATE, active INTEGER, category_id INTEGER, FOREIGN KEY(category_id) REFERENCES categories(id))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar tabelas', e))
  }

  private insertDefaultItems(db: SQLiteObject) {
    console.log('insertDefaultItems');
    db.executeSql('SELECT COUNT(id) as qtd FROM categories', {})
      .then((data: any) => {

        if (data.rows.item(0).qtd == 0) {
          db.sqlBatch([
            ['INSERT INTO categories (name) VALUES (?)', ['Hambúrgueres']],
            ['INSERT INTO categories (name) VALUES (?)', ['Bebidas']],
            ['INSERT INTO categories (name) VALUES (?)', ['Sobremesas']]
          ])
            .then(() => console.log('Dados padrões incluídos'))
            .catch(e => console.error('Erro ao incluir dados padrões', e))
        }

      })
      .catch()
  }

}
