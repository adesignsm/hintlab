var viewport_mobile = window.matchMedia("(min-width: 200px) and (max-width: 1160px)");
var viewport_desktop = window.matchMedia("(min-width: 1160px) and (max-width: 2056px)");

var resolution_trig; //1 = desktop || 0 = mobile || 2 = tablet
var global_cart, global_products, cart_switch;

window.onload = function() {

  var nav_list = document.getElementById("nav-list");

  if (viewport_desktop.matches) {

      //DOM stuff: NAV MENU
      var nav_list = document.getElementById("nav-list");
      console.log(nav_list.children);

      //change inner text
      //remove an li element
      nav_list.children[2].innerHTML = "SHOP";
      nav_list.children[2].href = "products.html";
      nav_list.children[3].innerHTML = "ABOUT";
      nav_list.children[4].innerHTML = "SEARCH";
      nav_list.children[5].innerHTML = "SHOPPING BAG (0)";
      nav_list.children[1].remove();

      //add hintlab link title

      resolution_trig = 1;

      cart_switch = "alt-bag";
  
  } else if (viewport_mobile.matches) {

    nav_list.children[5].remove();
    document.getElementById("img-carousel-switch").append(document.getElementById("product-img-carousel"));

    nav_list.children[1].id = "index-link";

    resolution_trig = 0;

    cart_switch = "cart-icon";
  } 
}

var class_toggle = 0;

function shopping_bag() {
  console.log(class_toggle);

  if (class_toggle == 0) {
    
    if (viewport_mobile.matches) {

      $("#cart-container").delay(200).fadeIn(400);
      $("#cart-icon").css("background-color", "#000");
      $("#cart-icon").css("color", "#fff");
    
    } else {

      $("#cart-container").delay(200).fadeIn(400);
  
    }
    
    class_toggle = 1;
    
  } else if (class_toggle == 1) {

    if (viewport_mobile.matches) {

      $("#cart-container").delay(200).fadeOut(400);
      $("#cart-icon").css("background-color", "transparent");
      $("#cart-icon").css("color", "#000");
    
    } else {

      $("#cart-container").delay(200).fadeOut(400);
    }
    
    class_toggle = 0;
  }
}

//MENU animations

var menu_flag = 0;

$("#menu-icon").on("click", function() {

    if (menu_flag == 0) {

        $("nav").stop().animate({top: "9px"}, 500); //nav list li
        $("#nav-bar").stop().animate({top: "118px"}, 500); //actual bar
        $("#opacity").fadeIn(450);
        
        $('body, html').css("overflow-y", "hidden");

        menu_flag = 1;
    
    } else if (menu_flag == 1) {

        $("nav").stop().animate({top: "-100px"}, 500);
        $("#nav-bar").stop().animate({top: "0px"}, 500);
        $("#opacity").fadeOut(450);
        
        $('body, html').css("overflow-y", "scroll");
        
        menu_flag = 0;
    }
});

//back to shop animation
$("#back-to-shop").on("click", function() {

  $("#products-info-container").delay(200).fadeOut(300);
  $("#products-container").delay(400).fadeIn(200);

  if (resolution_trig == 1) {

    $("#secondary-nav-menu").delay(400).fadeIn(200);
  }

  //resets the image carousel for the next product to fill in
  function removeAllchildNodes(parent) {

    while (parent.firstChild) {

      parent.removeChild(parent.firstChild);
    }
  }

  removeAllchildNodes(document.getElementById("product-img-carousel"));
  removeAllchildNodes(document.getElementById("product-size-list"));

  var default_list_child = document.createElement("option");
  default_list_child.innerHTML = "SELECT A SIZE";

  document.getElementById("product-size-list").appendChild(default_list_child);
});

$(document).ready(function(){

    $(".hamburger").click(function(){

      $(this).toggleClass("is-active");
    });

    $("#cart-icon").click(function() {
      
      shopping_bag();
    });

    $("#alt-bag").click(function() {

      shopping_bag();
    });
});

  // $(document).ready(function($) {
  
  //   if (window.history && window.history.pushState) {
  
  //     $(window).on('popstate', function(e) {
        
  //       e.preventDefault();
        
  //       var hashLocation = location.hash;
  //       var hashSplit = hashLocation.split("#!/");
  //       var hashName = hashSplit[1];
  
  //       if (hashName !== '') {
  
  //         var hash = window.location.hash;
  
  //         if (hash === '') {
  
  //           window.location = 'http://127.0.0.1:5500/hint_lab/pages/products.html';
  
  //           return false;
          
  //         }
  //       }
  //     });
  
  //     window.history.pushState('forward', null, './products.html');
  //   }
  // });

var atc_button;
var prod_card, prod_id;
var size_list = document.getElementById("product-size-list");
var selected_size;

//build product cards and product info 
var buildprod_cards = (products) => {

  global_products = products;
  console.log(global_products);

  //default product info
  products.forEach((products) => {

    atc_button = document.createElement("button");
    atc_button.id = "atc-button";
    atc_button.innerHTML = "ADD TO BAG";

    prod_card = document.createElement("div");
    prod_card.classList.add("products-card");

    var prod_title = document.createElement("p");
    prod_title.innerHTML = products.attrs.title;

    var prod_img = document.createElement("img");
    prod_img.src = products.attrs.images[0].src;

    var prod_price = document.createElement("p");
    prod_price.innerHTML = products.attrs.variants[0].formatted_price;

    prod_card.append(prod_img, prod_title, prod_price);
    document.getElementById("products-container").append(prod_card);

    //generate product card
    prod_card.onmousedown = function(e) {

      $("#secondary-nav-menu").fadeOut(300);

      prod_id = products.id;

      document.getElementById("product-name").innerHTML = prod_title.innerHTML;
      document.getElementById("product-price").innerHTML = prod_price.innerHTML;
      
      //carousel images
      for (var i = 0; i < products.attrs.images.length; i++) {
  
        var carousel_img = document.createElement("img");
        document.getElementById("product-img-carousel").append(carousel_img);
  
        carousel_img.src = products.attrs.images[i].src;
      }

      //size list options
      for (var v = 0; v < products.variants.length; v++) {

        var sizelist_option = document.createElement("option");

        if (products.attrs.variants.length > 1) {

          sizelist_option.innerHTML = products.attrs.variants[v].title;
        
        } else {

          sizelist_option.innerHTML = "ONE SIZE";
        }
        
        size_list.appendChild(sizelist_option);

        //get the index value of selected size option to match the index value of variants in the products object
        size_list.addEventListener("change", function() {

          selected_size = size_list.selectedIndex - 1;
          console.log(selected_size);

          //disable add to cart button when out of stock
          if (products.attrs.variants[selected_size].available === false) {

            atc_button.style.backgroundColor = "#808080";
            atc_button.style.color = "#fff";
            atc_button.style.marginLeft = "2%";
            atc_button.innerHTML = "SOLD OUT";

            atc_button.disabled = true;
          
          } else {

            atc_button.style.backgroundColor = "#000000";
            atc_button.style.color = "#fff";
            atc_button.style.marginLeft = "0";
            atc_button.innerHTML = "ADD TO BAG";

            atc_button.disabled = false;
          }
        });
      } 

      document.getElementById("product-description").innerHTML = products.attrs.body_html;
      document.getElementById("product-info-box").append(atc_button);

      $("#products-container").delay(100).fadeOut(400);
      $("#products-info-container").delay(200).fadeIn(400);
    }
  });
}

//initialzie the shopify client
var shop_client = ShopifyBuy.buildClient({

  apiKey: "a6fede46e27bc0837bd042cee0e57b76",
  domain: "hintlabshop.myshopify.com",
  appId: "1"

});

//create a cart and fetch all products async
shop_client.createCart().then((cart) => {

  console.log(cart);

  //checkout button
  document.getElementById("checkout-button").onmousedown = function(e) {

    window.open(cart.checkoutUrl + "&note=test-msg");
  }

  shop_client.fetchAllProducts().then((products) => {
  
    buildprod_cards(products);

    //add to cart function 
    atc_button.onmousedown = function(e) {

      shop_client.fetchProduct(prod_id).then(function(products) {
        
        cart.createLineItemsFromVariants({

          variant: products.variants[selected_size],
          quantity: 1

        }).then(function(cart) {
            
            document.getElementById("sub-total").innerHTML = "SUB TOTAL: " + cart.subtotal;
            
          cart.lineItems.forEach(function(item) {

            console.log(cart);

            if (resolution_trig == 0) {

              document.getElementById("cart-icon").innerHTML = cart.subtotal;
            
            } else if (resolution_trig == 1 || resolution_trig == 2) {

              document.getElementById("alt-bag").innerHTML = "SHOPPING BAG (" + cart.lineItemCount + ")";
            }

            var alt_bag_toggle = 0;

            document.getElementById(cart_switch).onmousedown = function() {

              if (alt_bag_toggle == 0) {

                for (var i = 0; i < cart.lineItems.length; i++) {

                  var line_item = document.createElement("li");
  
                  inc_line_item = document.createElement("button");
                  dec_line_item = document.createElement("button");
                  inc_line_item.id = "inc-line-item";
                  dec_line_item.id = "dec-line-item";
        
                  inc_line_item.innerHTML = "+";
                  dec_line_item.innerHTML = "-";
  
                  var line_img = document.createElement("img");
                  line_img.src = cart.lineItems[i].image.src;
  
                  var line_title = document.createElement("h3");
                  line_title.innerHTML = cart.lineItems[i].title;
  
                  var line_size = document.createElement("p");
                  line_size.innerHTML = "SIZE: " + cart.lineItems[i].variant_title;
  
                  var line_dollar = document.createElement("h3");
                  line_dollar.innerHTML = "$" + cart.lineItems[i].line_price;
  
                  var line_qty = document.createElement("h3");
                  line_qty.id = "line-quantity";
                  line_qty.innerHTML = "QUANTITY: " + cart.lineItems[i].quantity;

                  alt_bag_toggle = 1;
                }

                var line_details_container = document.createElement("div");

                line_details_container.append(line_title, line_dollar, line_size, line_qty, inc_line_item, dec_line_item);
                line_details_container.id = "line-details-container";

                line_item.append(line_img, line_details_container);
                document.getElementById("cart-list").appendChild(line_item);

                //increase and decrease quantity
                inc_line_item.onmousedown = function(e) {

                  item.quantity++
                  line_qty.innerHTML = "QUANTITY: " + item.quantity;

                  document.getElementById("sub-total").innerHTML = "SUB TOTAL: " + cart.subtotal;
                  
                  if (resolution_trig == 0) {
                    document.getElementById("cart-icon").innerHTML = cart.subtotal;
                  } else if (resolution_trig == 1 || resolution_trig == 2) {
                    document.getElementById("alt-bag").innerHTML = "SHOPPING BAG (" + cart.lineItemCount + ")";
                  }
                }

                dec_line_item.onmousedown = function(e) {

                  item.quantity--
                  line_qty.innerHTML = "QUANTITY: " + item.quantity;

                  if (item.quantity <= 0) {

                    item.quantity = 0;
                    
                    document.getElementById("sub-total").innerHTML = "SUB TOTAL: " + cart.subtotal;
                  
                    if (resolution_trig == 0) {
                      document.getElementById("cart-icon").innerHTML = cart.subtotal;
                    } else if (resolution_trig == 1 || resolution_trig == 2) {
                      document.getElementById("alt-bag").innerHTML = "SHOPPING BAG (" + cart.lineItemCount + ")";
                    }
                  
                  } else {

                    document.getElementById("sub-total").innerHTML = "SUB TOTAL: " + cart.subtotal;
                  
                    if (resolution_trig == 0) {
                      document.getElementById("cart-icon").innerHTML = cart.subtotal;
                    } else if (resolution_trig == 1 || resolution_trig == 2) {
                      document.getElementById("alt-bag").innerHTML = "SHOPPING BAG (" + cart.lineItemCount + ")";
                    }
                  }
                }
              }
            }
          });
        });
      });
    }
  }).catch(() => {

    console.error("request failed");
  });
});


