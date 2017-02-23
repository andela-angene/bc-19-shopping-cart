$(document).ready(function () {
  //Variables
  var draggable = $('.shop-item'),
      cart = document.getElementById('cart'),
      total = $('#total'),
      count = $('#count');

  //Functions:

  //On drag start, store the item's id
  function dragStart(event) {
    event.dataTransfer.setData('itemId', this.id);
  }

  //Add item to cart
  function addToCart(id){
    //New id for the item when it's added to the cart
    var newID = id + '-cart',
        jStoreItem = $('#' + newID);

    //Check if item already exists in the cart
    if (jStoreItem.html() === undefined) {

      //Clone the store item
      var storeItem = document.getElementById(id).cloneNode(true);

      //Assign new id
      storeItem.id = newID;

      //Append the item to cart and set number of items in cart
      $('#basket').append(storeItem);
      $('#' + newID + ' .number').html('1');

      //Update total price and count
      total.html(parseInt(total.html()) + parseInt($('#' + newID + ' .price').html()));
      count.html(parseInt(count.html()) + 1);
      $('#alert').fadeIn().delay(300).slideUp();

      //Add event listener to enable removal of item
      storeItem.addEventListener('dragend', dragOut);
      $('#' + newID).on('click', '.rm-from-cart', function(){
        removeFromCart($(this).parent().attr('id'));
      });
    } else {

      //Item already exists, increment number in cart
      var number =  $('#' + newID + ' .number');
      number.html(parseInt(number.html()) + 1);
      $('#alert').fadeIn().delay(300).slideUp();

      //Update total price and count
      total.html(parseInt(total.html()) + parseInt($('#' + newID + ' .price').html()));
      count.html(parseInt(count.html()) + 1);
    }
  }

  //Remove from cart
  function removeFromCart(id) {
    id = '#' + id;
    var number = $(id).find('.number');

    if (parseInt(number.html()) > 1) {
      number.html(number.html() - 1);
      //Update total price
      total.html(parseInt(total.html()) - parseInt($(id).find('.price').html()));
      count.html(parseInt(count.html()) - 1);
      $('#alert-rm').fadeIn().delay(300).slideUp();
    } else {
      //Update total price
      total.html(parseInt(total.html()) - parseInt($(id).find('.price').html()));
      count.html(parseInt(count.html()) - 1);
      $(id).remove();
      $('#alert-rm').fadeIn().delay(300).slideUp();
    }
  }

  //Drag out of cart
  function dragOut(event){
    if (event.dataTransfer.dropEffect === 'none') {
      removeFromCart(this.id);
    }
  }

  //Allow drop
  function allowDrop(event) {
    event.preventDefault();
  }

  //On Drop, add item to cart
  function dragDrop(event) {
    event.preventDefault();
    $('.cart').removeClass('drag-enter');

    //Get the drag item id
    var id = event.dataTransfer.getData('itemId');
    if (id === '') return;

    addToCart(id);
  }

  //Drag Over function
  function dragEnter(event){
    $('.cart').addClass('drag-enter');
  }

  //Drag Leave function
  function dragLeave(event){
    $('.cart').removeClass('drag-enter');
  }

  //Show by categories
  function showByCategory(id){
    $('nav a').removeClass('active');
    $('#' + id).addClass('active');
    $('.category').hide();
    $('#' + id.slice(5)).fadeIn();
  }

  //End Functions

  //Add event listener to the draggable items
  for (var i = 0; i < draggable.length; i++) {

    //Store the draggable id when dragging starts
    draggable[i].addEventListener('dragstart', dragStart);
  }

  //Add event listeners to the cart
  if (cart){
    cart.addEventListener('dragover', allowDrop);
    cart.addEventListener('drop', dragDrop);
    cart.addEventListener('dragover', dragEnter);
    cart.addEventListener('dragleave', dragLeave);
  }

  if(window.location.search){
    showByCategory(window.location.search.slice(5));
  };

  //Show by categories
  $('nav a').on('click', function(){
    showByCategory(this.id);
  });

  //Add event listener for 'add-to-cart' button
  $('.shop-item').on('click', '.add-to-cart', function(){
    addToCart($(this).parent().attr('id'));
  });

  $('.top-right').attr('draggable', false);

});