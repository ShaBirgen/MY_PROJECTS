"use strict";
// Load the div and button elements
let addItemBtn = document.querySelector("#add-item-btn");
let itemForm = document.querySelector(".item-form");
let itemCards = document.querySelector(".item-cards");
// Load the inputs
let itemName = document.querySelector("#name");
let image = document.querySelector("#image");
let description = document.querySelector("#description");
let price = document.querySelector("#price");
// Load the error div
let nameError = document.querySelector(".nameerr");
let imageError = document.querySelector(".imageerr");
let descError = document.querySelector(".descerr");
let priceError = document.querySelector(".priceerr");
let itemsArr = [];
// GEt the stored array
window.onload = () => {
    let data = localStorage.getItem("mogrec");
    data = JSON.parse(data);
    if (data) {
        data.forEach((dataPiece) => {
            itemsArr.push(dataPiece);
            instance.displayItem();
        });
    }
    else {
        console.log("Local storage is empty");
    }
};
// Toggle the create form
addItemBtn.addEventListener("click", () => {
    if (itemForm.style.display == "none") {
        itemForm.style.display = "flex";
        addItemBtn.style.backgroundColor = "red";
        addItemBtn.textContent = "close";
    }
    else {
        itemForm.style.display = "none";
        addItemBtn.style.backgroundColor = "#3457D5";
        addItemBtn.textContent = "Add Item";
    }
});
// Handle create Item form submission
itemForm.addEventListener("submit", (e) => {
    // Refresh the error divs
    nameError.textContent = "";
    imageError.textContent = "";
    descError.textContent = "";
    priceError.textContent = "";
    // Prevent HTML default action(Reloading the page)
    e.preventDefault();
    // Check if the user has submitted a blank input
    let item = verifyInput(itemName.value, image.value, description.value, price.value);
    if (item) {
        let newItem = {
            id: itemsArr.length + 1,
            itemName: item.itemName,
            imgUrl: item.image,
            description: item.description,
            price: parseFloat(item.price),
        };
        itemsArr.push(newItem);
        instance.displayItem();
        localStorage.setItem("mogrec", JSON.stringify(itemsArr));
    }
    else {
        console.log(item);
    }
});
function verifyInput(itemName, image, description, price) {
    let itemObject = {
        itemName,
        image,
        description,
        price,
    };
    if (itemName.trim() != "") {
        itemObject.itemName = itemName;
    }
    else {
        nameError.textContent = "The item name required";
        return false;
    }
    if (image.trim() != "") {
        itemObject.image = image;
    }
    else {
        imageError.textContent = "The image link is required";
        return false;
    }
    if (description.trim() != "") {
        itemObject.description = description;
    }
    else {
        descError.textContent = "The item description is required";
        return false;
    }
    if (price.trim() != "") {
        itemObject.price = price;
    }
    else {
        priceError.textContent = "The image link is required";
        return false;
    }
    return itemObject;
}
class Items {
    displayItem() {
        itemCards.textContent = "";
        itemsArr.forEach((item, index) => {
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
            let deleteBtn = document.createElement("a");
            deleteBtn.className = "delete";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                this.deleteItem(index);
            });
            actionButtons.appendChild(deleteBtn);
            card.appendChild(cardImg);
            card.appendChild(cardDetails);
            card.appendChild(actionButtons);
            itemCards.appendChild(card);
        });
    }
    deleteItem(index) {
        itemsArr.splice(index, 1);
        localStorage.setItem("mogrec", JSON.stringify(itemsArr));
        this.displayItem();
    }
}
let instance = new Items;
