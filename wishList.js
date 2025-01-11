document.addEventListener("DOMContentLoaded", function () {
    var wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    var container = document.getElementById("wishcontainer");

    if (wishlistItems.length === 0) {
        container.innerHTML = "<p>No items in wishlist</p>";
        return;
    }

    // SHOW PRODUCT
    wishlistItems.forEach(product => {
        var card = document.createElement("div");
        card.setAttribute("class", "item");

        var photo = document.createElement("div");
        photo.setAttribute("class", "containerImage");
       
        var image = document.createElement("img");
        image.setAttribute("src", product.image.src );
        photo.appendChild(image);

        // BUTTON (X) FOR REMOVE
        var removeToCartButton = document.createElement("button");
        removeToCartButton.setAttribute("class","removeButton") ;
        removeToCartButton.textContent = "X";
        photo.appendChild(removeToCartButton);

        // أPHOTO WHEN MOUSE OVER
        photo.addEventListener("mouseover", function () {
            image.style.transform = "scale(1.1)"; 
            removeToCartButton.style.display = "block"; 
        });

        photo.addEventListener("mouseout", function () {
            image.style.transform = "scale(1)"; 
            removeToCartButton.style.display = "none";
        });

        // CLICK X TO REMOVE
        removeToCartButton.addEventListener("click", function () {
            var wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
            var updatedWishlist = wishlist.filter(item => item.product.title !== product.product.title);
            localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
            container.removeChild(card);

            if (updatedWishlist.length === 0) {
                container.innerHTML = "<p>No items in wishlist</p>";
                return;
            }
        });

        var productDetails = document.createElement("div");
        productDetails.setAttribute("class","productDetails")
    
        var name = document.createElement("p");
        name.setAttribute("class","title")
        name.textContent = product.product.title;
        productDetails.appendChild(name);

        var price = document.createElement("p");
        price.setAttribute("class","price")
        price.textContent = product.price.amount + " " + product.price.currencyCode;
        productDetails.appendChild(price);

        // BUTTON ADD TO CART
        var addToCartButton = document.createElement("button");
        addToCartButton.setAttribute("class","addCart");
        addToCartButton.textContent = "ADD TO CART";

        addToCartButton.addEventListener('click', function () {
    let  cart = JSON.parse(localStorage.getItem('cart')) || [];
    let  existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        alert("Product already added to cart");
    } else {
        product.quantity = 1; 
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart)); 
        alert("Product successfully added to cart");
    }
});

        productDetails.appendChild(addToCartButton);

        card.appendChild(photo);
        card.appendChild(productDetails);

        container.appendChild(card);

        // ADD scroll TO PAGE

        var scrollToTopButton = document.createElement("button");
        scrollToTopButton.setAttribute("class","scrollButton")
        scrollToTopButton.textContent = "⬆";
        document.body.appendChild(scrollToTopButton);
    
        window.addEventListener("scroll", function () {
            if (window.scrollY > 200) { 
                scrollToTopButton.style.display = "block";
            } else {
                scrollToTopButton.style.display = "none";
            }
        });    
        
        scrollToTopButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth" 
            });
        });
    });
});
