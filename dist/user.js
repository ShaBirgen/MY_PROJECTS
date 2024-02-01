"use strict";
let item_cards = document.querySelector('.item-cards');
let cart_Btn = document.querySelector('#cartbtn');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let listCartHTML = document.querySelector(".listCart");
let badge = document.querySelector('.badge');
let totalDiv = document.querySelector('.total');
let checkOut = document.querySelector('.checkOut');
cart_Btn.addEventListener("click", () => {
    body === null || body === void 0 ? void 0 : body.classList.toggle("showCart");
});
closeCart === null || closeCart === void 0 ? void 0 : closeCart.addEventListener("click", () => {
    body === null || body === void 0 ? void 0 : body.classList.toggle("showCart");
});
let items_arr = [];
// GEt the stored array
window.onload = () => {
    let data = localStorage.getItem("mogrec");
    data = JSON.parse(data);
    if (data) {
        data.forEach((dataPiece) => {
            items_arr.push(dataPiece);
            instances.displayItem();
        });
    }
    else {
        console.log("Local storage is empty");
    }
};
let cart = [];
let cartContainer = document.querySelector('.cart-container');
window.onload = () => {
    let data = localStorage.getItem("mogrec");
    data = JSON.parse(data);
    if (data) {
        data.forEach((dataPiece) => {
            items_arr.push(dataPiece);
            instances.displayItem();
        });
    }
    else {
        console.log("Local storage is empty");
    }
    let storedCart = localStorage.getItem('mogrecCart');
    storedCart = JSON.parse(storedCart);
    storedCart.forEach((item) => {
        cart.push(item);
    });
    instances.displayCart();
    calc();
};
class userItems {
    addToCart(item) {
        this.displayCart();
    }
    displayCart() {
        cartContainer.textContent = "";
        listCartHTML.textContent = "";
        cart.forEach((cartItem, index) => {
            // <button onclick={decrementQuantity}> - </button>
            // <button onclick={incrementQuantity}> + </button>
            let negDel = document.createElement("button");
            negDel.className = "Del";
            negDel.textContent = '-';
            negDel.addEventListener;
            let addDel = document.createElement("button");
            addDel.className = "Add";
            addDel.textContent = "+";
            let cartItemElement = document.createElement("div");
            cartItemElement.className = "cart-item";
            let itemName = document.createElement("span");
            itemName.textContent = cartItem.itemName;
            let itemPrice = document.createElement("span");
            itemPrice.textContent = `Price: ${cartItem.price}`;
            let cartImg = document.createElement('img');
            cartImg.className = 'cart-img';
            cartImg.setAttribute('src', cartItem.imgUrl);
            let remCart = document.createElement('button');
            remCart.className = 'remove-btn';
            remCart.style.backgroundColor = 'transparent';
            remCart.innerHTML = "<img src='../public/assets/delete.png' width='20px'> ";
            remCart.addEventListener('click', () => {
                this.deleteCart(index);
            });
            cartItemElement.appendChild(cartImg);
            cartItemElement.appendChild(itemName);
            cartItemElement.appendChild(negDel);
            cartItemElement.appendChild(itemPrice);
            cartItemElement.appendChild(addDel);
            cartItemElement.appendChild(remCart);
            listCartHTML.appendChild(cartItemElement);
        });
    }
    displayItem() {
        item_cards.textContent = "";
        items_arr.forEach((item, index) => {
            let card = document.createElement("div");
            card.className = "card";
            let cardImg = document.createElement("img");
            cardImg.setAttribute("src", item.imgUrl);
            cardImg.className = "card-img";
            let cardDetails = document.createElement("div");
            cardDetails.className = "card-details";
            let title = document.createElement("h4");
            title.className = "title";
            title.textContent = item.itemName;
            let body = document.createElement("p");
            body.className = "body";
            body.textContent = item.description;
            let price = document.createElement("h3");
            price.className = "price";
            price.textContent = `${item.price}`;
            cardDetails.appendChild(title);
            cardDetails.appendChild(body);
            cardDetails.appendChild(price);
            let actionButtons = document.createElement("div");
            actionButtons.className = "action-btns";
            let addBtn = document.createElement("a");
            addBtn.className = "add";
            addBtn.textContent = "Add to cart";
            addBtn.addEventListener("click", () => {
                // console.log(item);
                cart.push(item);
                calc();
                this.displayCart();
                localStorage.setItem('mogrecCart', JSON.stringify(cart));
            });
            actionButtons.appendChild(addBtn);
            card.appendChild(cardImg);
            card.appendChild(cardDetails);
            card.appendChild(actionButtons);
            item_cards.appendChild(card);
        });
    }
    deleteItem(index) {
        items_arr.splice(index, 1);
        localStorage.setItem("mogrec", JSON.stringify(items_arr));
        this.displayItem();
    }
    deleteCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("mogrecCart", JSON.stringify(cart));
        this.displayCart();
        calc();
    }
}
let instances = new userItems;
function calc() {
    let count = 0;
    let totalCost = 0;
    cart.forEach((item) => {
        // console.log(item.price);
        totalCost += item.price;
        count += 1;
    });
    console.log(totalCost);
    totalDiv.textContent = `Total: ${totalCost}`;
    badge.textContent = `${count}`;
}
checkOut.addEventListener('click', () => {
    alert("Your order is being processed");
    cart = [];
    calc();
    instances.displayCart();
});
