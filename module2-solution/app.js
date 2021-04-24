(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;


  list.ToBuyItems = ShoppingListCheckOffService.getToBuyItems();
  list.addItemToAlreadyBought = function( itemName, itemQuantity, itemIndex){

    try {
        ShoppingListCheckOffService.addItemToAlreadyBought(itemName, itemQuantity, itemIndex);
    } catch (error) {
      list.errorMessage = error.message;
    }
  };
}

AlreadyBoughtController.$inspect = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list = this;
  list.AlreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();

  // list.errorMessage = false;
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var ToBuyItems  = [
    {
      name: "Cookies",
      quantity: 10
    },
    {
      name: "Vanilla Ice Cream",
      quantity: 3
    },
    {
      name: "Bread",
      quantity: 4
    },
    {
      name: "Apple",
      quantity: 3
    }
  ];
  var AlreadyBoughtItems = [];

  service.addItemToAlreadyBought = function (itemName, quantity, itemIndex) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    AlreadyBoughtItems.push(item);
    this.removeItemFromToBuy(itemIndex);
    // ToBuyItems.splice(itemIndex, 1);
    if(ToBuyItems.length == 0)
      throw new Error("Everything is bought!");
  };

  service.removeItemFromToBuy = function (itemIndex) {
    ToBuyItems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return ToBuyItems;
  };

  service.getAlreadyBoughtItems = function(){
    return AlreadyBoughtItems;
  }
}
})();
