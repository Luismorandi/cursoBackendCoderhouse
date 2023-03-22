import axios from "axios";
import assert from "assert";

describe("comportamiento del servidor", () => {
   describe("comportamiento de peticiones POST", () => {
    describe("Si envio un producto", () => {
      it("Devuelve un respuesta con Ok.", async () => {
        const body = {
            "title": "Cellphone",
            "value": 2200,
            "thumbnail": "https://ichef.bbci.co.uk/news/800/cpsprodpb/BE54/production/_117842784_lg.jpg",
            "stock": 100,
            "categoryId": "6383ee06df804e83b52e9141"
        };
        const response = await axios.post("http://localhost:8080/products", body);
        const productAdded = response.data;
        assert.ok(productAdded);
      });
    });
  });  

  describe("comportamiento de peticiones GET", () => {
    describe("si le pido todos los productos", () => {
      it("devuelve una array de productos", async () => {
        const response = await axios.get("http://localhost:8080/products");
        const productos = response.data;
        assert.ok(productos);
      });
    });
    describe("si le paso un id en params", () => {
      it("devuelve el producto con ese id", async () => {
        const id = '6383da227839ef6f39be7e1f';
        const response = await axios.get("http://localhost:8080/products/" + id);
        const producto_obtenido = response.data.product;
        const producto_esperado = {
                "_id": "6383da227839ef6f39be7e1f",
                "title": "CPU",
                "value": 2100,
                "thumbnail": "https://i.blogs.es/ddda0d/procesador/1366_521.jpg",
                "stock": 100,
                "__v": 0
        }
        assert.deepStrictEqual(producto_obtenido, producto_esperado);
      });
    });
  }); 
 
  describe("comportamiento de peticiones PUT", () => {
    describe("Si envio un id en params y precio en el body", () => {
      it("Devuelve un respuesta con Ok.", async () => {
        const body = {
          value: "2964",
        };
        const response = await axios.put("http://localhost:8080/products/6383effda56d4130ba225041", body);
        const productUpdated = response.data;
        assert.ok(productUpdated);
      });
    });
  }); 
  
  }); 