var ProductsClient = function (url) {
  /* the base url for the rest service */
  var baseUrl = url;

  /* method to retrieve products */
  var getProducts = function (callback) {
    $.ajax({
      url: baseUrl + "/products",
      type: "GET",
      success: function (result) {
        console.log("Products retrieved: " + JSON.stringify(result));
        callback(result);
      },
    });
  };

  /* method to delete a product */
  var deleteProduct = function (product, callback) {
    console.log("Deleting product with id [" + product.data.id() + "]");
    $.ajax({
      url: baseUrl + "/products/" + product.data.id(),
      type: "DELETE",
      success: function (result) {
        callback(product);
      },
    });
  };

  /* method to add a product */

  var addProduct = function (product, callback) {
    var plainJSObject = ko.toJS(product.data);
    console.log("Saving product [" + JSON.stringify(plainJSObject) + "]");

    $.ajax({
      url: baseUrl + "/products",
      type: "POST",
      data: JSON.stringify(plainJSObject),
      contentType: "application/json",
      success: function (id) {
        callback(product, id);
      },
    });
  };

  /* method to update a product */

  var updateProduct = function (product, callback) {
    var planeJSobject = ko.toJS(product.data);
    console.log("Updating product [" + JSON.stringify(planeJSobject) + "]");
    $.ajax({
      url: baseUrl + "/products",
      type: "PUT",
      data: JSON.stringify(planeJSobject),
      contentType: "application/json",
      success: function (result) {
        callback(product);
      },
    });
  };

  return {
    /* add members that will be exposed publicly */
    getProducts: getProducts,
    deleteProduct: deleteProduct,
    addProduct: addProduct,
    updateProduct: updateProduct,
  };
};
