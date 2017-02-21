//Variables
var draggable   = $('.draggable'),
    cart        = document.getElementById('cart');
    
//Drag start function
function dragStart(event){
    event.dataTransfer.setData('text', this.id);
}

//Remove from cart
function removeFromCart(event){
    if (event.dataTransfer.dropEffect == 'none'){
        var num = parseInt($(this).html());
        if(num > 1){
            $(this).html(num - 1);
        }else{
            $(this).remove();
        }
    }
}

//Add event listener to the draggable items
for (var i = 0; i < draggable.length; i++){
    
    //Store the draggable id when dragging starts
    draggable[i].addEventListener('dragstart', dragStart);
}

//Allow drop
function allowDrop(event){
    event.preventDefault();
}

//Drag-drop function
function dragDrop(event){
    event.preventDefault();
    
    //Get the drag item id
    var id = event.dataTransfer.getData('text');
    if (id == '') return;
    
    //New id for the item when it's added to the cart
    var newID = id + '-cart';
    var jStoreItem = $('#' + newID);
    
    //Check if item already exists in the cart
    if (jStoreItem.html() == undefined){
        
        //Clone the store item
        var storeItem = document.getElementById(id).cloneNode(true);
        
        //Assign new id
        storeItem.id = newID;
        
        //Append the item to cart and set number of items in cart
        this.appendChild(storeItem);
        $('#' + newID).html('1');
        
        //Add event listener to enable removal of item
        storeItem.addEventListener('dragend', removeFromCart);
    }else{
        
        //Item already exists, increment number in cart
        jStoreItem.html(parseInt(jStoreItem.html()) + 1);
    }
}

//Add event listeners to the cart
cart.addEventListener('dragover', allowDrop);
cart.addEventListener('drop', dragDrop);