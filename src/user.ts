let item_cards = document.querySelector('.item-cards') as HTMLDivElement;
let cart_Btn = document.querySelector('#cartbtn') as HTMLAnchorElement;
let body= document.querySelector('body');
let closeCart = document.querySelector('.close') as HTMLButtonElement;
let listCartHTML= document.querySelector(".listCart") as HTMLDivElement;
let badge = document.querySelector('.badge') as HTMLSpanElement;
let totalDiv = document.querySelector('.total') as HTMLDivElement;
let checkOut = document.querySelector('.checkOut') as HTMLButtonElement;

cart_Btn.addEventListener("click", () => {
  body?.classList.toggle("showCart");
});
closeCart?.addEventListener("click", () => {
  body?.classList.toggle("showCart");
});


let items_arr: Item[] = [];

// GEt the stored array
window.onload = () => {
  let data: any = localStorage.getItem("mogrec");
  data = JSON.parse(data);
  if (data) {
    data.forEach((dataPiece: any) => {
      items_arr.push(dataPiece);
      instances.displayItem();
    });
  } else {
    console.log("Local storage is empty");
  }
};

interface CartItem {
  id: string;
  itemName: string;
  price: number;
  imgUrl:string;
  description: string;
}


let cart:any = []
let cartContainer = document.querySelector('.cart-container') as HTMLDivElement;


window.onload = () => {
  let data: any = localStorage.getItem("mogrec");
  data = JSON.parse(data);
  if (data) {
    data.forEach((dataPiece: any) => {
      items_arr.push(dataPiece);
      instances.displayItem();
    });
  } else {
    console.log("Local storage is empty");
  }

  let storedCart:any = localStorage.getItem('mogrecCart');
  storedCart = JSON.parse(storedCart);

  storedCart.forEach((item:any) =>{
    cart.push(item)
  })
  instances.displayCart();
  calc()
};

class userItems {
  addToCart(item: CartItem[]) {
   
    this.displayCart();
  }

  
  displayCart() {
    cartContainer.textContent = "";
    listCartHTML.textContent="";

    cart.forEach((cartItem:any, index:number) => {
      // <button onclick={decrementQuantity}> - </button>
      // <button onclick={incrementQuantity}> + </button>
      let negDel= document.createElement("button");
      negDel.className = "Del";
      negDel.textContent = '-';
      negDel.addEventListener

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
      cartImg.className = 'cart-img'
      cartImg.setAttribute('src', cartItem.imgUrl)

      let remCart = document.createElement('button');
      remCart.className = 'remove-btn';
      remCart.style.backgroundColor = 'transparent'
      remCart.innerHTML = "<img src='../public/assets/delete.png' width='20px'> ";
      remCart.addEventListener('click', () =>{
        this.deleteCart(index)
      })

      cartItemElement.appendChild(cartImg);
      cartItemElement.appendChild(itemName);
      cartItemElement.appendChild(negDel);
      cartItemElement.appendChild(itemPrice);
      cartItemElement.appendChild(addDel);
      cartItemElement.appendChild(remCart)

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
        cart.push(item)
        calc();
        this.displayCart();
        localStorage.setItem('mogrecCart', JSON.stringify(cart))
        
      });

      actionButtons.appendChild(addBtn);

      card.appendChild(cardImg);
      card.appendChild(cardDetails);
      card.appendChild(actionButtons);

      item_cards.appendChild(card);
    });
  }


  deleteItem(index: number) {
    items_arr.splice(index, 1);
    localStorage.setItem("mogrec", JSON.stringify(items_arr));
    this.displayItem();
  }

  deleteCart(index:number) {
    cart.splice(index,1);
    localStorage.setItem("mogrecCart", JSON.stringify(cart));
    this.displayCart();
    calc();
  }
}

let instances =  new userItems;

function calc() {
  let count:number = 0;
  let totalCost = 0;

  cart.forEach((item:any) => {
    // console.log(item.price);
    totalCost += item.price
    count += 1
  })
  console.log(totalCost);
  totalDiv.textContent = `Total: ${totalCost}`
  badge.textContent = `${count}`
}
checkOut.addEventListener('click', ()=> {
  alert("Your order is being processed");
  cart = []
  calc()
  instances.displayCart()
})
