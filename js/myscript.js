$(document).ready(function () {
  //Variables
  var draggable = $('.shop-item'),
      cart = document.getElementById('cart'),
      total = $('#total'),
      count = $('#count');

  //Functions:
  //Drag start 
  function dragStart(event) {
    event.dataTransfer.setData('text', this.id);
  }
  
  //Drag out of cart
  function dragOut(event){
    if (event.dataTransfer.dropEffect == 'none') {
        
      removeFromCart(this.id);
    }
  }
  
  //Remove from cart
  function removeFromCart(id) {
    id = '#' + id;
    var num = $(id).find('.num');

    if (parseInt(num.html()) > 1) {
      num.html(num.html() - 1);
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

  //Allow drop
  function allowDrop(event) {
    event.preventDefault();
  }

  //Add to Cart
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
      $('#' + newID + ' .num').html('1');

      //Update total price and count
      total.html(parseInt(total.html()) + parseInt($('#' + newID + ' .price').html()));
      count.html(parseInt(count.html()) + 1);
      $('#alert').fadeIn().delay(300).slideUp();

      //Add event listener to enable removal of item
      storeItem.addEventListener('dragend', dragOut);
      $('#' + newID).on('click', '.rm-from-cart', function(){
        console.log('ready');
        removeFromCart($(this).parent().attr('id'));
      });
    } else {
      //Update total price and count
      total.html(parseInt(total.html()) + parseInt($('#' + newID + ' .price').html()));
      count.html(parseInt(count.html()) + 1);

      //Item already exists, increment number in cart
      var num =  $('#' + newID + ' .num');
      num.html(parseInt(num.html()) + 1);
      $('#alert').fadeIn().delay(300).slideUp();
    }
  }

  //On Drop function
  function dragDrop(event) {
    event.preventDefault();
    $('.cart').removeClass('drag-enter');

    //Get the drag item id
    var id = event.dataTransfer.getData('text');
    if (id == '') return;

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

  //Add event listener to the draggable items
  for (var i = 0; i < draggable.length; i++) {

    //Store the draggable id when dragging starts
    draggable[i].addEventListener('dragstart', dragStart);
  }

  //Add event listeners to the cart
  cart.addEventListener('dragover', allowDrop);
  cart.addEventListener('drop', dragDrop);
  cart.addEventListener('dragover', dragEnter);
  cart.addEventListener('dragleave', dragLeave);
  
  //Show by categories
  $('nav a').on('click', function(){
    $('nav a').removeClass('active');
    $(this).addClass('active');
    $('.category').hide();
    $('#' + this.id.slice(5)).fadeIn();
  });
  
  //Button to Add or Remove from cart
  $('.shop-item').on('click', '.add-to-cart', function(){
    addToCart($(this).parent().attr('id'));
  });
  
});


