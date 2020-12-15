var ProductsGrid = (function () {
  /* add members here */
  var client = ProductsClient("http://localhost:8080");

  /* model for products */
  var productModel = function (item, itemMode) {
    this.data = {};
    this.data.id = ko.observable(item.id);
    this.data.name = ko.observable(item.name);
    this.data.description = ko.observable(item.description);
    this.data.price = ko.observable(item.price);
    this.diplayMode = ko.observable(itemMode ? itemMode : "VIEW");
    console.log(this.diplayMode());
  };

  var displayMode = {
    view: "VIEW",
    edit: "EDIT",
  };

  /* product observable array */
  var products = ko.observableArray();

  /* method to retrieve products using the client */
  var retrieveProducts = function () {
    console.log("loading");
    client.getProducts(retrieveProductsCallback);
  };

  /* callback for when the products are retrieved from the server */
  var retrieveProductsCallback = function (data) {
    console.log(data);
    data.forEach(function (item) {
      products.push(new productModel(item));
    });
  };

  var addProduct = function () {
    var item = { id: null, name: null, description: null, price: null };
    products.push(new productModel(item, displayMode.edit));
  };

  var editProduct = function (product) {
    product.diplayMode(displayMode.edit);
  };

  var updateProduct = function (product) {
    client.updateProduct(product, updateProductCallback);
  };

  var updateProductCallback = function (product) {
    console.log("Product updated with id [" + product.data.id() + "]");
    product.diplayMode(displayMode.view);
  };

  var saveProduct = function (product) {
    client.addProduct(product, saveProductCallback);
  };

  var saveProductCallback = function (product, id) {
    console.log(id);
    product.data.id(id);
    product.diplayMode(displayMode.view);
    console.log("Product saved with id [" + product.data.id() + "]");
  };

  var deleteProduct = function (product) {
    client.deleteProduct(product, deleteProductCallback);
  };

  var deleteProductCallback = function (product) {
    products.remove(product);
    console.log("Product with id [" + product.data.id() + "] deleted");
  };

  var init = function () {
    /* add code to initialise this module */
    retrieveProducts();

    //apply ko bindings
    ko.applyBindings(ProductsGrid);
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    /* add members that will be exposed publicly */
    products: products,
    deleteProduct: deleteProduct,
    addProduct: addProduct,
    displayMode: displayMode,
    saveProduct: saveProduct,
    editProduct: editProduct,
    updateProduct: updateProduct,
  };
})();
