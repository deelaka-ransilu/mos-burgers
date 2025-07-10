let allItems = [];
let cart = [];

function loadItems() {
  const localData = localStorage.getItem("items");

  if (localData) {
    allItems = JSON.parse(localData);
    renderItems(allItems);
  } else {
    fetch("items.json").then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Failed to load items.json");
      }
    }).then((data) => {
      if (data) {
        allItems = data;
        localStorage.setItem("items", JSON.stringify(allItems));
        renderItems(allItems);
      }
    });
  }
}

function renderItems(items) {
  const container = document.querySelector(".grid-cols-12.gap-4 > .col-span-4")?.parentNode;
  container.innerHTML = ''; 

  items.forEach((item) => {
    const card = `
      <div class="col-span-4 bg-zinc-700 rounded-lg p-4 flex flex-col justify-between h-[310px]">
        <div class="text-center">
          <h3 class="text-white font-bold">${item.itemName}</h3>
          <span class="text-gray-400 text-xs">${item.itemCode}</span>
        </div>
        <div class="flex justify-center my-2">
          <img src="https://placehold.co/103x103" class="w-24 h-24 rounded" />
        </div>
        <div class="text-white text-xs space-y-1">
          <div class="flex justify-between"><span>Price</span><span>${item.price.toFixed(2)}</span></div>
          <div class="flex justify-between"><span>Qty</span><span>${item.qty}</span></div>
          <div class="flex justify-between"><span>Exp</span><span>${item.expDate}</span></div>
        </div>
        <div class="flex justify-between gap-1 mt-2">
          <button class="flex-1 bg-green-500 text-black text-xs py-1 rounded hover:bg-green-600">Update</button>
          <button onclick="addToCart('${item.itemCode}')" class="flex-1 bg-orange-400 text-black text-xs py-1 rounded hover:bg-orange-500">Add</button>
          <button class="flex-1 bg-red-600 text-black text-xs py-1 rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

function searchBtnOnClick() {
  const input = document.querySelector("input").value.trim().toLowerCase();
  const filtered = allItems.filter(
    (item) =>
      item.itemCode.toLowerCase().includes(input) ||
      item.itemName.toLowerCase().includes(input)
  );
  renderItems(filtered);
}

function burgersBtnOnClick() {
  filterByCategory("burgers");
}
function submarinesBtnOnClick() {
  filterByCategory("submarines");
}
function friesBtnOnClick() {
  filterByCategory("fries");
}
function pastaBtnOnClick() {
  filterByCategory("pasta");
}
function chickenBtnOnClick() {
  filterByCategory("chicken");
}
function beveragesBtnOnClick() {
  filterByCategory("beverages");
}

function filterByCategory(categoryName) {
  const filtered = allItems.filter((item) => item.category.toLowerCase() === categoryName);
  renderItems(filtered);
}

function addToCart(itemCode) {
  const item = allItems.find((i) => i.itemCode === itemCode);
  if (!item) return;

  const existingItem = cart.find((i) => i.itemCode === itemCode);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      itemCode: item.itemCode,
      itemName: item.itemName,
      qty: 1,
      price: item.price
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cartData;

  const cartContainer = document.querySelector(".col-span-4.bg-[#2E2E2E] .space-y-2");
  cartContainer.innerHTML = '';

  cart.forEach((item) => {
    const itemTotal = (item.qty * item.price).toFixed(2);
    const row = `
      <div class="flex justify-between text-white border-b border-gray-600 py-2">
        <span>${item.itemName}</span>
        <span>(${item.qty})</span>
        <span>Rs ${itemTotal}</span>
      </div>
    `;
    cartContainer.innerHTML += row;
  });
}



window.onload = () => {
  loadItems();
  renderCart();
};
