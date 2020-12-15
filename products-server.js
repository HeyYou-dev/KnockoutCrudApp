/* Copyright (c) Adnan Jaswal, 2015. See the file license.txt for copying permission. */
var restify = require("restify");

var PATH = "/products";

var products = [
  { id: "1000", name: "Chess Periodicals", description: "A book on chess periodicals", price: 100, diplayMode: "VIEW" },
  { id: "2000", name: "Strategy and Tactics", description: "A book on chess strategy and tactics", price: 120, diplayMode: "VIEW" },
  { id: "3000", name: "Computer Chess", description: "Computer chess application", price: 50, diplayMode: "VIEW" },
  { id: "4000", name: "Medieval Chess", description: "Medieval chess set", price: 400, diplayMode: "VIEW" },
  { id: "5000", name: "End Games", description: "A book on end strategies", price: 100, diplayMode: "VIEW" },
  { id: "6000", name: "Games of Individual Players", description: "A record of games by individual players", price: 200, diplayMode: "VIEW" },
];

var currentIdCount = products.length;

function deleteProduct(req, res, next) {
  products.forEach(function (product, index) {
    if (req.params.id == product.id) {
      products.splice(index, 1);
    }
  });
  res.send(200, req.params.id);
  next();
}

function getProducts(req, res, next) {
  console.log("GET[" + PATH + "] " + JSON.stringify(products));
  res.send(200, products);
  next();
}

function addProduct(req, res, next) {
  console.log("POST[" + PATH + "] " + JSON.stringify(req.body));

  currentIdCount = currentIdCount + 1;
  var productId = currentIdCount * 1000;
  req.body.id = productId.toString();
  products.push(req.body);
  res.send(200, productId);
  next();
}

function updateProduct(req, res, next) {
  console.log("PUT[" + PATH + "] " + JSON.stringify(req.body));

  products.forEach(function (product, index) {
    if (req.body.id == product.id) {
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
    }
  });

  res.send(200);
  next();
}

var server = restify.createServer();
server.pre((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Expose-Headers", "X-Api-Version, X-Request-Id, X-Response-Time");
  res.setHeader("Access-Control-Max-Age", "1000");
  // other headers go here..

  if (req.method === "OPTIONS")
    // if is preflight(OPTIONS) then response status 204(NO CONTENT)
    return res.send(204);

  next();
});
server.use(restify.plugins.bodyParser({ mapParams: true }));

server.del(PATH + "/:id", deleteProduct);
server.get(PATH, getProducts);
server.put(PATH, updateProduct);
server.post(PATH, addProduct);

server.listen(8080, "127.0.0.1", function () {
  console.log("%s listening at %s", server.name, server.url);
});
