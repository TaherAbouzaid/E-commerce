"use strict";
// هنحتاجها عند تحميل الصفحات لاستدعاء الدوال التي نحتاجها عند تحميل الصفحة 
document.addEventListener("DOMContentLoaded", function () {
    btnAddToCart();
    btnAddToWishList();
    btnBuyItNow();
    getFromSession();
    display_ImgProd_NameProd_Category_Price_Offer_Counter_Currency();
    color_size_Prod();
    setupCounter();
});

var single_product = {};
var counter = 1; // 

//   دالة لإضافة المنتج إلى السلة المؤقته
function getFromSession() {
    // محاولة استرجاع المنتج من أي مفتاح محتمل
    var product = JSON.parse(sessionStorage.getItem("productdetails"));

    if (product && Object.keys(product).length > 0) {
        single_product = product; // تعيين البيانات إلى المتغير العام
        console.log("تم استرجاع المنتج من الجلسة:", single_product);
    } else {
        console.log("لا يوجد منتج في الجلسة.");
    }
}

function btnAddToCart() {
    var button = document.getElementById("addToCart");
    button.addEventListener("click", function () {
        addToLocalCart();
    });
}

function btnAddToWishList() {
    var button = document.getElementById("toWishList");
    button.addEventListener("click", function () {
        addToWishList();
    });
}

function btnBuyItNow() {
    var button = document.getElementById("toPayment");
    button.addEventListener("click", function () {
        addToLocalCart();
        window.location.href = "cart.html";
    });
}


function addToLocalCart() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var existingProduct = cart.find(function (item) {
        return item.id === single_product.id;
    });

    if (existingProduct) {
        existingProduct.quantity += counter;
    } else {
        single_product.quantity = counter;
        cart.push(single_product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("تمت إضافة المنتج إلى السلة المحلية.");
}

function addToWishList() {
    if (Object.keys(single_product).length > 0) {
        var wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];

        var isProductExist = wishlist.some(function (item) {
            return item.id === single_product.id;
        });

        if (!isProductExist) {
            wishlist.push(single_product); // إضافة المنتج إلى قائمة الأمنيات
            localStorage.setItem("wishlistItems", JSON.stringify(wishlist)); // حفظ قائمة الأمنيات المحدثة
            alert("تمت إضافة المنتج إلى قائمة الأمنيات.");
        } else {
            alert("المنتج موجود بالفعل في قائمة الأمنيات.");
        }
    }
}

function display_ImgProd_NameProd_Category_Price_Offer_Counter_Currency() {
    var product = single_product; // استخدام المنتج العام
    if (!product || Object.keys(product).length === 0) {
        console.log("لا يوجد منتج في السلة.");
        return;
    }

    // عرض الصورة
    var imgElements = document.getElementsByClassName("imgPro");
    for (var i = 0; i < imgElements.length; i++) {
        imgElements[i].src = product.image.src;
    }

    // عرض اسم المنتج
    var nameElements = document.getElementsByClassName("proName");
    for (var i = 0; i < nameElements.length; i++) {
        nameElements[i].textContent = product.product.title;
    }

    // عرض الفئة
    var categoryElement = document.getElementById("info_Category");
    if (categoryElement) {
        categoryElement.textContent = product.product.type;
    }

    // عرض السعر والعرض
    var offer = product.price.amount;
    var price = offer * 2.5;

    var priceElement = document.getElementById("mainCost");
    if (priceElement) priceElement.textContent = price;

    var offerElement = document.getElementById("offerCost");
    if (offerElement) offerElement.textContent = offer;

    // عرض العملة
    var currencyElements = document.getElementsByClassName("currency");
    for (var i = 0; i < currencyElements.length; i++) {
        currencyElements[i].textContent = product.price.currencyCode;
    }
}

function color_size_Prod() {
    var product = single_product;
    if (!product || Object.keys(product).length === 0) {
        console.log("لا يوجد منتج في السلة.");
        return;
    }

    var color_size = product.title.split("/").map(function (item) {
        return item.trim();
    });

    console.log(color_size);

    var colorElement = document.getElementById("color_Value");
    if (colorElement && color_size.length > 0) {
        colorElement.textContent = color_size[0];
    }

    var sizeElement = document.getElementById("size");
    if (sizeElement && color_size.length > 1) {
        sizeElement.textContent = color_size[1];
    }
}

function setupCounter() {
    const product = single_product;
    if (!product || Object.keys(product).length === 0) {
        console.log("لا يوجد منتج في السلة.");
        return;
    }

    var offer = product.price.amount;

    var counterElement = document.getElementById("quantity_Counter");
    var subtotalElement = document.getElementById("final_Cost");

    var updateSubtotal = function () {
        if (subtotalElement) {
            subtotalElement.textContent = offer * counter;
        }
    }

    if (counterElement) {
        counterElement.textContent = counter;
        updateSubtotal();
    }

    var incButton = document.getElementById("quantity_Inc");
    if (incButton) {
        incButton.addEventListener("click", function () {
            counter++;
            counterElement.textContent = counter;
            updateSubtotal();
        });
    }

    var decButton = document.getElementById("quantity_Dec");
    if (decButton) {
        decButton.addEventListener("click", function () {
            if (counter > 1) {
                counter--;
                counterElement.textContent = counter;
                updateSubtotal();
            }
        });
    }
}
