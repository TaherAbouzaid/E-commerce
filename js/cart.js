
    let cartContainer = document.querySelector(".cart-items");
    let cartSubtotal = document.getElementById("cart-subtotal");
    let total = document.querySelector('.aftercoupon');
    let cop = document.getElementById('code');
    let cont = document.querySelector('.cartlayout')
    let cobtn = document.getElementById('continue-shopping-btn')
      cobtn.onclick= function(){
        window.location.href="home.html?category=men"
      }
    let subtotal = 0;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

  
    function renderCartItems() {
        cartContainer.innerHTML = ""; 
        
         if (cart.length === 0) {
            cont.innerHTML = `<p style="text-align: center;">Your cart is empty.</p>`; 
            cobtn.style.width= '500px'
            cont.appendChild(cobtn)
            cont.style.display= 'grid';
            cont.style.padding = '10%';
          cont.style.justifyContent = 'center'; 

            return;
        }
        
        subtotal = 0; 

        cart.forEach((item) => {
            let itemTotal = item.price.amount * item.quantity;
            subtotal += itemTotal;

            
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

      
            let imgDiv = document.createElement("div");
            imgDiv.classList.add("img");
            imgDiv.innerHTML = `
                <img src="${item.image.src}" alt="${item.product.title}">
            `;

        
            let detailsDiv = document.createElement("div");
            detailsDiv.classList.add("details");
            detailsDiv.innerHTML = `
                <p>${item.product.title}</p>
                <span class="color">${item.title}</span>
                <p class="town">Town Team</p>
            `;
          let priceDiv = document.createElement("div");
            priceDiv.classList.add("price");
            priceDiv.textContent = `LE ${item.price.amount.toFixed(2)}`;

            let quantityDiv = document.createElement("div");
            quantityDiv.classList.add("quantity");
            quantityDiv.innerHTML = `
                <button class="decrease-qty">-</button>
                <span>${item.quantity}</span>
                <button class="increase-qty">+</button>
            `;


            let totalDiv = document.createElement("div");
            totalDiv.classList.add("total");
            totalDiv.textContent = `LE ${itemTotal.toFixed(2)}`;

            let removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-item");
            removeBtn.textContent = "×";

            quantityDiv.querySelector(".decrease-qty").addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCart();
                }
            });

            quantityDiv.querySelector(".increase-qty").addEventListener("click", () => {
                item.quantity++;
                updateCart();
            });

            removeBtn.addEventListener("click", () => {
                let productId = item.id;
                cart = cart.filter((product) => product.id !== productId); 
                updateCart(); 
            });

            let imd = document.createElement("div");
            imd.classList.add("imd");
            imd.appendChild(imgDiv);
            imd.appendChild(detailsDiv);
            cartItem.appendChild(imd);
            cartItem.appendChild(priceDiv);
            cartItem.appendChild(quantityDiv);
            cartItem.appendChild(totalDiv);
            cartItem.appendChild(removeBtn);

            cartContainer.appendChild(cartItem);
        });

        cartSubtotal.textContent = `LE ${subtotal.toFixed(2)}`;
        applyCoupon(); 
    }

  function applyCoupon() {
    let coupons = ['kermina','aya', 'taher', 'mohamed'];
    
    if (coupons.includes(cop.value)) {
        let discount = subtotal * 0.3; 
        let discountedTotal = subtotal - discount;
        total.textContent = `LE ${discountedTotal.toFixed(2)}`;
    } else {
      
        total.textContent = `LE ${subtotal.toFixed(2)}`;
    }
}
  cop.addEventListener('blur', applyCoupon);

    
    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart)); 
        renderCartItems();
    }


    renderCartItems();

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
    top: 0,
    behavior: "smooth",
  });
};
