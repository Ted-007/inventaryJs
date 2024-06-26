function Pila(s, types) {
    this.tope = 0;
    this.size = s;
    this.lista = [];
    this.type = types;
  }
  
  Pila.prototype.getOrden = function() {
    console.log(`Orden de ${this.type} generada: `);
    console.log("___________________________________");
    let numProducto = 0;
    for (let i = 0; i < this.lista.length; i++) {
      const s = this.lista[i];
      numProducto++;
      console.log("producto nro: " + numProducto);
      console.log("*********************\n" +
                  "Nombre:" + s[2] + "\n" +
                  "Referencia:" + s[0] + "\n" +
                  "Cantidad:" + s[1] + "\n" +
                  "**********************\n");
    }
    console.log("___________________________________");
  };
  
  Pila.prototype.addProduct = function(nombre, referencia, cantidad) {
    if (this.tope < this.size) {
      const stringStream = this.procesar(this.lista, referencia, cantidad);
      if (!this.addValidation(stringStream)) {
        const nuevo = [referencia, cantidad, nombre];
        this.lista.push(nuevo);
      }
      this.tope++;
    } else {
      console.log(`La Pila de ${this.type} se Encuentra llena`);
    }
  };
  
  Pila.prototype.addValidation = function(stringStream) {
    return stringStream.some(s => s === "Elemento procesado");
  };
  
  Pila.prototype.removeOrEditProduct = function(referencia, cantidad) {
    let state = "";
    if (this.covacio()) {
      console.log(`No existen Facturas de ${this.type} a Ejecutar`);
    } else {
      if (cantidad !== null) {
        this.lista = this.lista.filter(product => !product[0] == referencia);
      } else {
        this.procesar(this.lista, referencia, cantidad);
      }
      this.tope--;
    }
    return state;
  };
  
  Pila.prototype.procesar = function(lista, referencia, cantidad) {
    return lista.map(product => {
      if (product[0] == referencia) {
        product[1] = cantidad;
        return "Elemento procesado";
      }
      return "Elemento no procesado";
    });
  };
  
  Pila.prototype.covacio = function() {
    return this.tope === 0;
  };
  
  function Product(nombre, referencia, cantidad) {
    this.nombre = nombre;
    this.referencia = referencia;
    this.cantidad = cantidad;
  }
  
  Product.prototype.toString = function() {
    return  "*********************\n" +
            "Nombre: " + this.nombre + "\n" +
            "Referencia: " + this.referencia + "\n" +
            "Cantidad: " + this.cantidad + "\n" +
            "**********************\n";
  };
  
  function Main() {}
  
  Main.prototype.main = function() {
    let opc;
    let val = false;
    let active = true;
    const scanner = require('readline-sync');
    const products = [];
    const pilaCompras = new Pila(10, "Compras");
    const pilaVentas = new Pila(10, "Ventas");
    Main.prototype.productBase(products);
  
    while (active) {
      Main.prototype.clearScreen();
      console.log("\nMenu Principal");
      console.log("................\n");
      console.log("1 Articulos del Inventario");
      console.log("2 Ordenes de Compras");
      console.log("3 Facturas de Ventas");
      console.log("4 Reportes del Sistema");
      console.log("5 Salida del Sistema");
  
      opc = scanner.question("\nIngrese la Opcion a ejecutar: ");
  
      val = !isNaN(opc) && opc >= '1' && opc <= '5';
      if (val) {
        let opcInt = parseInt(opc);
  
        if (opcInt >= 1 && opcInt <= 5) {
          if (opcInt === 1) {
            if (val) {
              console.log("\nInventario");
              console.log("___________________________________");
              let numProdut = 0;
              for (const product of products) {
                numProdut++;
                console.log("producto nro: " + numProdut);
                console.log(product.toString());
              }
              console.log("___________________________________");
            }
          } else if (opcInt === 2) {
            console.log("2 Ordenes de Compras");
            Main.inizialiceProcess(pilaCompras, opc, scanner, val, products);
          } else if (opcInt === 3) {
            console.log("3 Facturas de Ventas");
            Main.inizialiceProcess(pilaVentas, opc, scanner, val, products);
          } else if (opcInt === 4) {
            console.log("4 Reportes del Sistema");
            pilaVentas.getOrden();
            pilaCompras.getOrden();
          } else if (opcInt === 5) {
            console.log("Salida exitosa del sistema");
            active = false;
          }
        } else {
          console.log("la opción ingresada no es valida: " + opcInt);
          active = true;
        }
      }
    }
  };
  
  Main.prototype.inizialiceProcess = function(pila, opc, scanner, val, products) {
    let activeProcess = true;
    while (activeProcess) {
      if (pila.lista.length > 0) {
        pila.getOrden();
      }
      console.log("\nIngrese la Opcion a ejecutar: \n");
      console.log("1 agregar");
      console.log("2 eliminar");
      let opcSellorBuild = scanner.question("");
      let product = scanner.question("\nIngrese la referencia del producto: ");
      let count = scanner.question("\nIngrese la cantidad del producto: ");
      if (opcSellorBuild === "1") {
        if (pila.type === "Compras") {
          let name = scanner.question("\nIngrese el nombre del producto: ");
          pila.addProduct(name, product, count);
        } else {
          Main.validateExistProduct(products, count, product);
          pila.addProduct(null, product, count);
        }
      } else if (opcSellorBuild === "2") {
        if (pila.lista.length > 0) {
          pila.removeOrEditProduct(product, String(count));
          console.log("\nproducto procesado");
        } else {
          console.log("\n>>>>>>>>sin productos en la Pila<<<<<<<<");
        }
      } else {
        console.log("\nOpción no valida: " + opcSellorBuild);
      }
      let terminate = scanner.question("\nsi desea cerrar la operación digite la opción: (1)\nde lo contrario marque (0)");
      if (terminate === "1") {
        Main.modifyStock(pila, products);
        activeProcess = false;
      }
    }
  };
  
  Main.prototype.modifyStock = function(pila, products) {
    if (pila.lista.length > 0) {
      for (const s of pila.lista) {
        let addProduct = true;
        for (const product of products) {
          if (product.referencia === s[0]) {
            addProduct = false;
            if (pila.type === "Compras") {
              product.cantidad= product.cantidad + parseInt(s[1]);
              console.log("\nStock actulizado con una compra");
            } else {
              product.cantidad = product.cantidad - parseInt(s[1]);
              console.log("\nStock actulizado con una venta");
            }
            break;
          }
        }
        if (addProduct && pila.type === "Compras") {
          products.push(new Product(s[2], s[0], parseInt(s[1])));
        }
      }
    }
  };
  
  Main.prototype.validateExistProduct = function(products, count, product) {
    const allowCount = products.filter(product1 => product1.referencia == product);
    const productExists = allowCount.find(product1 => product1 !== undefined);
    if (productExists) {
      if (productExists.cantidad > parseInt(count)) {
        console.log("\nproducto procesado");
      } else {
        console.log("\nCantidad no disponible");
        //ingresar de nuevo el producto
      }
    } else {
      console.log("\nProducto no valido: ");
      //ingresar de nuevo el producto
    }
  };
  
  Main.prototype.productBase = function(products) {
    products.push(new Product("cepillo", "1", 5));
    products.push(new Product("enjuague bucal", "2", 5));
    products.push(new Product("crema", "3", 5));
    products.push(new Product("shampoo", "4", 5));
    products.push(new Product("bloqueador", "5", 5));
  };
  
  Main.prototype.clearScreen = function() {
    console.clear();
  };
  
  var program = new Main();
  program.main();
  