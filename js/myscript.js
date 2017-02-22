//Variables
var draggable = $('.shop-item'),
    cart = document.getElementById('cart'),
    total = $('#total');

//Functions:
//Drag start 
function dragStart(event) {
  event.dataTransfer.setData('text', this.id);
}

//Remove from cart
function removeFromCart(event) {
  if (event.dataTransfer.dropEffect == 'none') {
    var num = $(this).find('.num');

    if (parseInt(num.html()) > 1) {
      num.html(num.html() - 1);
      //Update total price
      var totalPrice = parseInt(total.html()) - parseInt($(this).find('.price').html());
      total.html(totalPrice);
    } else {
      //Update total price
      var totalPrice = parseInt(total.html()) - parseInt($(this).find('.price').html());
      total.html(totalPrice);
      $(this).remove();
    }
  }
}

//Allow drop
function allowDrop(event) {
  event.preventDefault();
}

//Drop function
function dragDrop(event) {
  event.preventDefault();

  //Get the drag item id
  var id = event.dataTransfer.getData('text');
  if (id == '') return;

  //New id for the item when it's added to the cart
  var newID = id + '-cart',
      jStoreItem = $('#' + newID);

  //Check if item already exists in the cart
  if (jStoreItem.html() == undefined) {

    //Clone the store item
    var storeItem = document.getElementById(id).cloneNode(true);

    //Assign new id
    storeItem.id = newID;

    //Append the item to cart and set number of items in cart
    this.appendChild(storeItem);
    $('#' + newID + ' .num').html('1');

    //Update total price
    var totalPrice = parseInt(total.html()) + parseInt($('#' + newID + ' .price').html());
    total.html(totalPrice);

    //Add event listener to enable removal of item
    storeItem.addEventListener('dragend', removeFromCart);
  } else {
    //Update total price
    var totalPrice = parseInt(total.html()) + parseInt($('#' + newID + ' .price').html());
    total.html(totalPrice);

    //Item already exists, increment number in cart
    var num =  $('#' + newID + ' .num');
    num.html(parseInt(num.html()) + 1);
  }
}

//Add event listener to the draggable items
for (var i = 0; i < draggable.length; i++) {

  //Store the draggable id when dragging starts
  draggable[i].addEventListener('dragstart', dragStart);
}

//Add event listeners to the cart
cart.addEventListener('dragover', allowDrop);
cart.addEventListener('drop', dragDrop);



$(document).ready(function () {
  $('body').css('padding-top', $('header').height() + 'px');
});