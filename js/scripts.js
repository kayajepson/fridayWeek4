//Business Logic for userCart -------
function UserCart() {
  this.pizzas = [],
  this.currentId = 0,
  this.grandTotal = 0
}

UserCart.prototype.addPizza = function addPizza(pizza) {
  pizza.id = this.assignId();
  this.pizzas.push(pizza);
}

UserCart.prototype.assignId = function assignId() {
  this.currentId +=1;
  return this.currentId;
}

UserCart.prototype.findPizza = function findPizza(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]){
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    }
  };
  return false;
}

UserCart.prototype.deletePizza = function deletePizza(id) {
  for (var i=0; i < this.pizzas.length; i++) {
    if (this.pizzas[i]){
      if (this.pizzas[i].id == id) {
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

UserCart.prototype.cartTotal = function cartTotal() {
  this.grandTotal = 0;
  for (var i = 0; i <= this.pizzas.length -1; i++) {
    if (this.pizzas[i]) {
      this.grandTotal += this.pizzas[i].finalPrice();
    }
  }
  return this.grandTotal;
}

//Business Logic for pizzas -----
function Pizza(meatPrice, veggiePrice, vegetarianPrice, pizzaSize, pizzaName) {
  this.meatPrice = meatPrice,
  this.veggiePrice = veggiePrice,
  this.vegetarianPrice = vegetarianPrice,
  this.pizzaSize = pizzaSize,
  this.pizzaName = pizzaName
}

 Pizza.prototype.finalPrice = function finalPrice() {
   var pizzaBasePrice = 10;
   this.totalPrice = 0;
   pizzaBasePrice += (this.meatPrice);
   pizzaBasePrice += (this.veggiePrice);
   pizzaBasePrice += (this.vegetarianPrice);
   pizzaBasePrice += (this.pizzaSize);
   this.totalPrice += pizzaBasePrice;
   return this.totalPrice;
 }

// User Interface Logic ---------
var userCart = new UserCart();
function displayPizzaDetails(userCartToDisplay) {
  var pizzaList = $("ul#pizzas");
  var htmlForPizzaInfo = "";
  userCartToDisplay.pizzas.forEach(function(pizza){
    htmlForPizzaInfo += "<li id=" + pizza.id + ">" + pizza.pizzaName + "</li>";
  });
  pizzaList.html(htmlForPizzaInfo);
  $(".grandTotalPrice").html("$" + userCart.cartTotal());
};

function showPizza(pizzaId) {
  var pizza = userCart.findPizza(pizzaId);
  $("#show-pizza").show();
  $(".meatPrice").html("$" + pizza.meatPrice);
  $(".veggiePrice").html("$" + pizza.veggiePrice);
  $(".vegetarianPrice").html("$" + pizza.vegetarianPrice);
  $(".pizzaSize").html("$" + pizza.pizzaSize);
  $(".totalPrice").html("$" + pizza.finalPrice());
  var buttons = $('#buttons');
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + pizza.id + ">Delete</button>");
}

function attachListeners() {
  $("#pizzas").on("click", "li", function() {
    showPizza(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    userCart.deletePizza(this.id);
    $("#show-pizza").hide();
    displayPizzaDetails(userCart);
  });
};

$(document).ready(function() {
  attachListeners();
  $(".btn-success").on("click", function() {
    $("#hidden").show();
  });
  $("form#new-pizza").submit(function(event){
    event.preventDefault();
    var meat = parseInt($("#meat").val());
    var veggies = parseInt($("#veggies").val());
    var vegetarian = parseInt($("#vegetarian").val());
    var pizzaSize = parseInt($("input:radio[name=pizzaSize]:checked").val());
    var pizzaName = $("input#new-pizzaName").val() || "Pizza";
    var newPizza = new Pizza(meat, veggies, vegetarian, pizzaSize, pizzaName);
    userCart.addPizza(newPizza);
    displayPizzaDetails(userCart);
  })
  });
