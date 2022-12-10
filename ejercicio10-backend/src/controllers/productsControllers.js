import knexLib from "knex";
import { mariaDBconfig } from "../config/mariaDBconfig.js";
import {faker} from '@faker-js/faker';
faker.locale= "es"

class ContainerProductos {
  constructor(config) {
    this.knex = knexLib(config);
  }

  async crearTabla() {
    try {
      let existe = await this.knex.schema.hasTable("productos");
      if (!existe) {
        console.log("Tabla productos creada");
        return await this.knex.schema.createTable("productos", (table) => {
          table.increments("id").primary();
          table.string("nombre", 150).notNullable();
          table.float("precio").notNullable();
          table.string("foto", 800).notNullable();
        });
      } else {
        console.log("YA EXISTE LA TABLA PRODUCTOS");
      }
    } catch (err) {
      console.log("No se pudo crear la tabla", err);
    }
  }
  async agregar(productos) {
    return await this.knex("productos").insert(productos);
  }

  async listar() {
    let productos = [];
    console.log("listar");
    for (let i = 0; i < 5; i++) {
      productos.push({
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto: faker.image.imageUrl(),
      });
    }
    return productos;
  }
  



  cerrar() {
    this.knex.destroy();
  }
}

export const producto_instancia = new ContainerProductos(mariaDBconfig);
