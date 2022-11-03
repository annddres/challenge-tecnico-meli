const express = require("express");
//const request = require('request'); // deprecated
const axios = require('axios');
const cors = require("cors");
const config = require('./config.json');
const app = express();

app.use(cors());

app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}`);
});

// Api MELI
var request = function(url, callback){
    axios.get(url)
        .then((response) => {
          callback(response.data);
        })
        .catch((err) => {
          console.log(err);
          callback(null);
        });
}

// api Buscar Productos
app.get('/api/items/', (req, res) => {
   
    var text = req.query.q;
    // api documentation: limit=n (Solo n resultados)
    request(`${config.apiML}/sites/MLA/search?q=${text}&limit=${config.limit}`, function(data) {

        // Cambio de formato
        var items = [];
        data.results.forEach(result => {
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
        });

        // Lista de categorias
        var cv = data.available_filters.find(f => f.id="category").values;
        var categories = cv.map(v => v.name);
        
        // Categoria con mayor resultados
        var max = Math.max.apply(Math, cv.map(function(v) { return v.results; }));
        var category = cv.find(v => v.results=max).name;

        // Respuesta
        res.send({
            author: config.author,
            categories: categories,
            items: items,
            category: category
        });

    });

  });

// api Detalle Producto
app.get('/api/items/:id', (req, res) => {
   
    var id = req.params.id;
    request(`${config.apiML}/items/${id}`, function(result) {
        request(`${config.apiML}/items/${id}/description`, function(description) {
            request(`${config.apiML}/categories/${result.category_id}`, function(category) {

                // Cambio de formato
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
                    author: config.author,
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
