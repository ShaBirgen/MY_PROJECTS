"use strict";
// Load the div and button elements
let addItemBtn = document.querySelector('#add-item-btn');
let itemForm = document.querySelector('.item-form');
let itemCards = document.querySelector('.item-cards');
// Load the inputs
let itemName = document.querySelector('#name');
let image = document.querySelector("#image");
let description = document.querySelector("#description");
let price = document.querySelector('#price');
// Load the error div
let nameError = document.querySelector('.nameerr');
let imageError = document.querySelector('.imageerr');
let descError = document.querySelector('.descerr');
let priceError = document.querySelector('.priceerr');
// Toggle the create form
addItemBtn.addEventListener('click', () => {
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
let Item = [];
// Handle create Item form submission
itemForm.addEventListener('submit', (e) => {
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
            id: Item.length + 1,
            itemName: item.itemName,
            imgUrl: item.image,
            description: item.description,
            price: parseFloat(item.price)
        };
        Item.push(newItem);
        instance.displayItem();
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
        price
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
        Item.forEach((item, index) => {
            let card = document.createElement('div');
            card.className = "card";
            let cardImg = document.createElement('img');
            cardImg.setAttribute('src', item.imgUrl);
            cardImg.className = "card-img";
            let cardDetails = document.createElement('div');
            cardDetails.className = "card-details";
            let title = document.createElement('h4');
            title.className = 'title';
            title.textContent = item.itemName;
            let body = document.createElement('p');
            body.className = 'body';
            body.textContent = item.description;
            let price = document.createElement('h3');
            price.className = 'price';
            price.textContent = `${item.price}`;
            cardDetails.appendChild(title);
            cardDetails.appendChild(body);
            cardDetails.appendChild(price);
            let actionButtons = document.createElement('div');
            actionButtons.className = 'action-btns';
            let deleteBtn = document.createElement('a');
            deleteBtn.className = "delete";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener('click', () => {
                this.deleteItem(index);
            });
            let viewItem = document.createElement('a');
            viewItem.textContent = "View Item";
            actionButtons.appendChild(deleteBtn);
            actionButtons.appendChild(viewItem);
            card.appendChild(cardImg);
            card.appendChild(cardDetails);
            card.appendChild(actionButtons);
            itemCards.appendChild(card);
        });
    }
    deleteItem(index) {
        Item.splice(index, 1);
        this.displayItem();
    }
}
let instance = new Items;
instance.displayItem();
