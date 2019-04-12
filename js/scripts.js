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
function Pizza(toppingName, pizzaSize, userName) {
  this.toppingName = toppingName,
  this.pizzaSize = pizzaSize,
  this.userName = userName
}
// User Interface Logic ---------
var userCart = new UserCart();

function displayPizzaDetails(userCartToDisplay) {
  var pizzaList = $("ul#pizzas");
  var htmlForPizzaInfo = "";
  userCartToDisplay.pizzas.forEach(function(pizza){
    htmlForPizzaInfo += "<li id=" + pizza.id + ">" + pizza.toppingName + " " + pizza.pizzaSize + "</li>";
  });
  pizzaList.html(htmlForPizzaInfo);
};

function showPizza(pizzaId) {
  var pizza = userCart.findPizza(pizzaId);
  $("#show-pizza").show();
  $(".topping-name").html(pizza.toppingName);
  $(".pizza-size").html(pizza.pizzaSize);
  var buttons = $('#buttons');
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + pizza.id + ">Delete</button>");
}

function attachListeners() {
  $("#pizzas").on("click", "li", function() {
    showPizza (this.id);
  });
  $("#pizzas").on("click", ".deleteButton", function() {
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
    var beverage = parseInt($("#beverage").val());
    console.log(beverage);
    event.preventDefault();
    $("#work-responses").show();
    var inputtedToppingName = parseInt($("input:radio[name=toppingName]:checked").val());
    console.log($("#lego").text());
    var inputtedPizzaSize = parseInt($("input:radio[name=pizzaSize]:checked").val());
    var inputtedUserName = parseInt($("input#new-user-age").val());
    $("input#meat-topping-name").val("");
    $("input#veggie-topping-name").val("");
    $("input#new-pizza-size").val("");
    $("input#new-user-age").val("");
    var newPizza = new Pizza(inputtedToppingName, inputtedPizzaSize, inputtedUserName);
    var pizzaBasePrice = 10;
    var total = 0;
    userCart.addPizza(newPizza);
    displayPizzaDetails(userCart);
    for (var i = 0; i <= userCart.pizzas.length - 1; i++) {
      // if (userCart.pizzas[i].userName > 65) {
      //   pizzaBasePrice -= 3;
      // }
      pizzaBasePrice += (userCart.pizzas[i].toppingName);
      pizzaBasePrice += (userCart.pizzas[i].pizzaSize);
      total += pizzaBasePrice;
      pizzaBasePrice = 10;
    }
    console.log(total);
  })
  });
