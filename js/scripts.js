//Business Logic for userCart -------
function UserCart() {
  this.pizzas = [],
  this.currentId = 0
}

UserCart.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId();
  this.pizzas.push(pizza);
}

UserCart.prototype.assignId = function() {
  this.currentId +=1;
  return this.currentId;
}

UserCart.prototype.findPizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]){
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    }
  };
  return false;
}

UserCart.prototype.deletePizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]){
      if (this.pizzas[i].id == id) {
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

//Business Logic for pizzas -----
function Pizza(meatPrice, veggiePrice, vegetarianPrice, pizzaSize, userName) {
  this.meatPrice = meatPrice,
  this.veggiePrice = veggiePrice,
  this.vegetarianPrice = vegetarianPrice,
  this.pizzaSize = pizzaSize,
  this.userName = userName
}


// User Interface Logic ---------
var userCart = new UserCart();

function displayPizzaDetails(userCartToDisplay) {
  var pizzaList = $("ul#pizzas");
  var htmlForPizzaInfo = "";
  userCartToDisplay.pizzas.forEach(function(pizza){
    htmlForPizzaInfo += "<li id=" + pizza.id + ">" + pizza.meatPrice + " " + pizza.veggiePrice + " " + pizza.vegetarianPrice + " " +  pizza.pizzaSize + "</li>";
  });
  pizzaList.html(htmlForPizzaInfo);
};

function showPizza(pizzaId) {
  var pizza = userCart.findPizza(pizzaId);
  $("#show-pizza").show();
  $(".meatPrice").html(pizza.meatPrice);
  $(".veggiePrice").html(pizza.veggiePrice);
  $(".vegetarianPrice").html(pizza.vegetarianPrice);
  $(".pizzaSize").html(pizza.pizzaSize);
  $(".userName").html(pizza.userName);
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
    console.log(vegetarian);
    var pizzaSize = parseInt($("input:radio[name=pizzaSize]:checked").val());
    var userName = $("input#new-userName").val();
    console.log(userName);
    $("input#meat-topping-name").val("");
    $("input#veggie-topping-name").val("");
    $("input#vegetarian-topping-name").val("");
    $("input#new-pizza-size").val("");
    $("input#new-userName").val("");

    var newPizza = new Pizza(meat, veggies, vegetarian, pizzaSize, userName);
    var pizzaBasePrice = 10;
    var total = 0;
    userCart.addPizza(newPizza);
    displayPizzaDetails(userCart);
    for (var i = 0; i <= userCart.pizzas.length - 1; i++) {
      pizzaBasePrice += (userCart.pizzas[i].meatPrice);
      pizzaBasePrice += (userCart.pizzas[i].veggiePrice);
      pizzaBasePrice += (userCart.pizzas[i].vegetarianPrice);
      pizzaBasePrice += (userCart.pizzas[i].pizzaSize);
      total += pizzaBasePrice;
      pizzaBasePrice = 10;
    }
    console.log(total);
  })
  });
