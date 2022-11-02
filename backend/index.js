const express = require("express");
const request = require('request');
const cors = require("cors");
const app = express();

const PORT = 3001;
const apiMELI = "https://api.mercadolibre.com";
const author = { name: "Andres", lastname: "Jimenez" }; 

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Api MercadoLibre
var client = function (resource, callback) {
    request(apiMELI + resource, function (err, res, body) {
      if (!err && res.statusCode == 200) {
          callback(JSON.parse(body));
      }
    });
}

// Api Busqueda Productos
app.get('/api/items/', (req, res) => {
   
    var text = req.query.q;
    client("/sites/MLA/search?q=" + text, function(results) {

        // Cambio de Formato (Solo 4 Productos)
        var items = [];
        var l = (results.paging.total > 4) ? 4 : results.paging.total;
        for(var n = 0; n < l; n++) {
            var result = results.results[n];
            items.push({
                id: result.id,
                title: result.title,
                price: {
                    currency: result.currency_id,
                    amount: result.price,
                    decimals: result.price.decimals()
                },
                picture: result.thumbnail,
                condition: result.condition,
                free_shipping: result.shipping.free_shipping,
                location: result.address.state_name
            });
        };

        // Lista de Categorias
        var cv = results.available_filters.find(f => f.id="category").values;
        var categories = cv.map(v => v.name);
        
        // Categoria con mayor resultados
        var max = Math.max.apply(Math, cv.map(function(v) { return v.results; }));
        var category = cv.find(v => v.results=max).name;

        // Respuesta
        res.send({
            author: author,
            categories: categories,
            items: items,
            category: category
        });

    });

  });

// Api Detalle Producto
app.get('/api/items/:id', (req, res) => {
   
    var id = req.params.id;
    client("/items/" + id, function(result) {
        client("/items/" + id + "/description", function(description) {
            client("/categories/" + result.category_id, function(category) {

                // Cambio de Formato
                var item = {
                    id: result.id,
                    title: result.title,
                    price: {
                        currency: result.currency_id,
                        amount: result.price,
                        decimals: result.price.decimals()
                    },
                    picture: result.thumbnail,
                    condition: result.condition,
                    free_shipping: result.shipping.free_shipping,
                    sold_quantity: result.sold_quantity,
                    description: description.plain_text
                }

                // Respuesta
                res.send({
                    author: author,
                    item: item,
                    category: category.name
                });

            });
        });
    });

 });

 // Metodo parte decimal de un numero
Number.prototype.decimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1] * 1 || 0;
}
