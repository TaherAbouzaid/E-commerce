var twocolumn = document.getElementById('two-column');
var threecolumn = document.getElementById('three-column');

var jsonFiles = {
    men: '../Api/men.json',
    kids: '../Api/kids.json',
    newarrival: '../Api/newarrival.json',
    summer: '../Api/summer.json',
    winter: '../Api/winter.json'
};

var container = document.getElementById('products-container');
container.style.flexWrap = 'wrap';
container.style.justifyContent = 'space-evenly';
container.style.gap = '20px';


function getQueryParam(param) {
    //console.log(window.location.search);

    const urlParams = new URLSearchParams(window.location.search);
    // console.log("==========");
    // console.log(urlParams);
    // console.log("==========");

    return urlParams.get(param);
}

window.onload = function () {
    var category = getQueryParam("category");

    if (category) {
        loadProducts(category);
    } else {
        container.innerHTML = '<p>Please select a category.</p>';
    }
};

// Load products based on the category and subcategory
function loadProducts(category) {
    container.innerHTML = '<p>Loading...</p>';


    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", jsonFiles[category], true);
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            var response = JSON.parse(this.responseText);
            container.innerHTML = '';
            var collection = response.collection[category];


            collection.forEach(function (product) {
                // console.log("============================");
                // console.log(subcategory);
                // console.log("============================");

                var productDiv = document.createElement('div');
                productDiv.classList.add('product');

                var divimg = document.createElement('div');
                divimg.classList.add('product-img');
                var img = document.createElement('img');
                img.src = product.image?.src || "assets/placeholder.png";
                divimg.appendChild(img);
                img.addEventListener('click', function () {
                    sessionStorage.setItem('productdetails', JSON.stringify(product));
                    window.location.href = 'product.html';
                });

                var button = document.createElement('button');
                button.textContent = 'Add to Cart';
                button.classList.add('add-to-cart');
                button.addEventListener('click', function () {
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    let existingProduct = cart.find(function (item) {
                        return item.id === product.id
                    });



                    if (existingProduct) {
                        alert("Product already added to cart");
                    } else {
                        product.quantity = 1;
                        cart.push(product);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        alert("Product successfully added to cart");
                    }
                });

                const buttonWishlist = document.createElement('button');
                buttonWishlist.id = 'buttonWishlist';
                buttonWishlist.classList.add('fa-solid', 'fa-heart');
                divimg.appendChild(buttonWishlist);

                function getWishlist() {
                    return JSON.parse(localStorage.getItem('wishlistItems')) || [];
                }

                function saveWishlist(wishlist) {
                    localStorage.setItem('wishlistItems', JSON.stringify(wishlist));
                }

                function isProductInWishlist(productId) {
                    const wishlist = getWishlist();
                    return wishlist.some(function (item) {
                        return item.id === productId;
                    });
                }

                function updateButtonStyle(button, isInWishlist) {
                    if (isInWishlist) {
                        button.style.color = 'red';
                        button.style.backgroundColor = 'white';
                        button.style.border = '1px solid red';
                    } else {
                        button.style.color = 'black';
                        button.style.backgroundColor = 'white';
                        button.style.border = '1px solid black';
                    }
                }

                updateButtonStyle(buttonWishlist, isProductInWishlist(product.id));

                buttonWishlist.addEventListener('click', function () {
                    const wishlist = getWishlist(); // Get the current wishlist

                    if (isProductInWishlist(product.id)) {
                        const updatedWishlist = wishlist.filter(item => item.id !== product.id);
                        saveWishlist(updatedWishlist);

                        updateButtonStyle(buttonWishlist, false);

                        alert("Product removed from favorites");
                    } else {
                        wishlist.push(product);
                        saveWishlist(wishlist);

                        updateButtonStyle(buttonWishlist, true);

                        alert("Product successfully added to favorites");
                    }

                    console.log("Updated Wishlist:", getWishlist());
                });


                divimg.appendChild(button);
                productDiv.appendChild(divimg);

                var title = document.createElement('div');
                title.classList.add('product-title');
                title.textContent = product.product.title;
                let type = document.createElement('p');
                type.classList.add('product-type');
                type.textContent = product.product.type;
                productDiv.appendChild(title);
                productDiv.appendChild(type);
                
                var price = document.createElement('div');
                price.classList.add('product-price');
                price.textContent = product.price.amount + ' ' + product.price.currencyCode;
                productDiv.appendChild(price);

                container.appendChild(productDiv);

            });

        } else {
            container.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }

    };
    xhttp.send();
}

twocolumn.addEventListener('click', function () {
    var products = document.querySelectorAll('.product');
    products.forEach(function (product) {
        product.style.width = '500px';

    });
});

threecolumn.addEventListener('click', function () {
    var products = document.querySelectorAll('.product');
    products.forEach(function (product) {
        product.style.width = '320px';
    });
});


let btn = document.getElementById('up')

window.onscroll = function () {
    if (window.scrollY >= 400) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

btn.onclick = function () {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
    });
};

/// filter & search

var priceRange = document.getElementById('price-range');
var priceValue = document.getElementById('price-value');


priceRange.addEventListener('input', function () {
  priceValue.textContent = priceRange.value;
});

document.getElementById('apply-filters').addEventListener('click', function () {
  let typeSearch = document.getElementById('type-search').value.toLowerCase();
  let maxPrice = parseFloat(priceRange.value);

  let products = document.querySelectorAll('.product');
  products.forEach(function (product) {
    let productType = product.querySelector('.product-type').textContent.toLowerCase();
    let productPrice = parseFloat(product.querySelector('.product-price').textContent);

    if (
      (typeSearch === '' || productType.includes(typeSearch)) &&
      productPrice <= maxPrice
    ) {
      product.style.display = 'block'; 
    } else {
      product.style.display = 'none'; 
    }
  });
});

  
