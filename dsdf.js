//Business Logic for userCart -------
function UserCart() {
  this.tickets = [],
  this.currentId = 0
}

UserCart.prototype.addTicket = function(ticket) {
  ticket.id = this.assignId();
  this.tickets.push(ticket);
}

UserCart.prototype.assignId = function() {
  this.currentId +=1;
  return this.currentId;
}

UserCart.prototype.findTicket = function(id) {
  for (var i=0; i< this.tickets.length; i++) {
    if (this.tickets[i]){
      if (this.tickets[i].id == id) {
        return this.tickets[i];
      }
    }
  };
  return false;
}

UserCart.prototype.deleteTicket = function(id) {
  for (var i=0; i< this.tickets.length; i++) {
    if (this.tickets[i]){
      if (this.tickets[i].id == id) {
        delete this.tickets[i];
        return true;
      }
    }
  };
  return false;
}

//Business Logic for tickets -----
function Ticket(movieName, movieTime, userAge) {
  this.movieName = movieName,
  this.movieTime = movieTime,
  this.userAge = userAge
}
// User Interface Logic ---------
var userCart = new UserCart();

function displayTicketDetails(userCartToDisplay) {
  var ticketList = $("ul#tickets");
  var htmlForTicketInfo = "";
  userCartToDisplay.tickets.forEach(function(ticket){
    htmlForTicketInfo += "<li id=" + ticket.id + ">" + ticket.movieName + " " + ticket.movieTime + "</li>";
  });
  ticketList.html(htmlForTicketInfo);
};

function showTicket(ticketId) {
  var ticket = userCart.findTicket(ticketId);
  $("#show-ticket").show();
  $(".movie-name").html(ticket.movieName);
  $(".movie-time").html(ticket.movieTime);
  var buttons = $('#buttons');
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + ticket.id + ">Delete</button>");
}

function attachTicketListeners() {
  $("#tickets").on("click", "li", function() {
    showTicket(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    userCart.deleteTicket(this.id);
    $("#show-ticket").hide();
    displayTicketDetails(userCart);
  });
};

$(document).ready(function() {
  attachTicketListeners();
  $(".btn-success").on("click", function() {
    $("#hidden").show();
  });

  $("form#new-ticket").submit(function(event) {
    event.preventDefault();
    var inputtedMovieName = parseInt($("input:radio[name=movieName]:checked").val());
    console.log($("#lego").text());
    var inputtedMovieTime = parseInt($("input:radio[name=movieTime]:checked").val());
    var inputtedUserAge = parseInt($("input#new-user-age").val());
    // if (inputtedEmailAddress2) {
    //   $("#email2").show();
    // } else {
    //   $("#email2").hide();
    // }
    $("input#new-movie-name").val("");
    $("input#new-movie-time").val("");
    $("input#new-user-age").val("");
    var newTicket = new Ticket(inputtedMovieName, inputtedMovieTime, inputtedUserAge);
    var ticketPrice = 10;
    var total = 0;
    userCart.addTicket(newTicket);
    displayTicketDetails(userCart);
    for (var i = 0; i <= userCart.tickets.length - 1; i++) {
      if (userCart.tickets[i].userAge > 65) {
        ticketPrice -= 3;
      }
      ticketPrice += (userCart.tickets[i].movieName);
      ticketPrice += (userCart.tickets[i].movieTime);
      total += ticketPrice;
      ticketPrice = 10;
    }
    console.log(total);
  })
})
