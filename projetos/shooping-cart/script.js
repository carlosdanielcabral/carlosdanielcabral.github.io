function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

const getPriceContainer = () => document.querySelector('.total-price');

const removeFromStorage = (element) => {
  const items = JSON.parse(getSavedCartItems());
  const index = items.indexOf(element.innerText);
  items.splice(index, 1);
  saveCartItems(JSON.stringify(items));
};

function cartItemClickListener(event) {
  const item = event.target;
  const { parentElement } = item;
  const price = Number.parseFloat(item.innerText.split('|')[2].slice(9), 10);
  const priceContainer = getPriceContainer();
  const priceNow = Number.parseFloat(priceContainer.innerText, 10);
  priceContainer.innerText = parseFloat((priceNow - price).toFixed(2));
  parentElement.removeChild(item);
  removeFromStorage(item);
}

const getSrc = async (sku) => {
  const data = await fetchItem(sku);
  return data;
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  getSrc(sku).then((data) => {
    const img = document.createElement('img');
    img.className = 'cart-item-img';
    img.src = data.thumbnail;
    li.appendChild(img);
  });

  li.addEventListener('click', cartItemClickListener);
  return li;
}

const displayProduct = (element) => {
  const itemContainer = document.querySelector('.items');
  itemContainer.appendChild(element);
};

const displayPrice = (price) => {
  const priceContainer = getPriceContainer();
  const priceNow = Number.parseFloat(priceContainer.innerText, 10);
  if (!Number.isNaN(priceNow)) {
    priceContainer.innerText = parseFloat((priceNow + price).toFixed(2));
  } else {
    priceContainer.innerText = price;
  }
};

const addToCart = (element) => {
  const cartContainer = document.querySelector('.cart__items');
  cartContainer.appendChild(element);
  const price = Number.parseFloat(element.innerText.split('|')[2].slice(9), 10);
  displayPrice(price);
};

const getProductId = (button) => {
  const { parentElement } = button;
  const productId = parentElement.firstChild.innerText;
  return productId;
};
const savedProducts = [];

const addProductsToCart = () => {
  const buttons = document.getElementsByClassName('item__add');
  Array.from(buttons).forEach((button) => {
    button.addEventListener('click', async () => {
      const productId = getProductId(button);
      const { id: sku, 
        title: name, 
        price: salePrice } = await fetchItem(productId);
      const product = createCartItemElement({ sku, name, salePrice });
      product.addEventListener('click', cartItemClickListener);
      addToCart(product);
      savedProducts.push(product.innerText);
      saveCartItems(JSON.stringify(savedProducts));
    });
  });
};

const displaySavedCartItems = () => {
  const savedItems = JSON.parse(getSavedCartItems());
  if (savedItems !== null) {
    savedItems.forEach((item) => {
      const [sku, name, price] = item.split('|');
      const productData = {
        sku: sku.slice(4).trim(),
        name: name.slice(6).trim(),
        salePrice: price.slice(9).trim(),
      };
      const element = createCartItemElement(productData);
      addToCart(element);
    });
  }
};

const removeLoading = () => {
  const itemContainer = document.querySelector('.items');
  itemContainer.innerHTML = '';
};

const getResults = async (query) => {
  const results = await fetchProducts(query).then((data) => {
    removeLoading();
    return data;
  });
  results.results.forEach((result) => {
    const { id: sku, title: name, thumbnail: image } = result;
    const element = createProductItemElement({ sku, name, image });
    displayProduct(element);
  });
  addProductsToCart();
};

const clearCart = () => {
  const cartItems = document.querySelector('.cart__items');
  cartItems.innerHTML = '';
  const priceContainer = getPriceContainer();
  priceContainer.innerText = 0;
  localStorage.removeItem('cartItems');
};

const addLoading = () => {
  const itemContainer = document.querySelector('.items');
  const spanLoading = document.createElement('span');
  spanLoading.className = 'loading';
  spanLoading.innerText = 'carregando...';
  itemContainer.appendChild(spanLoading);
};

const verifyInput = () => {
  const input = document.getElementById('search-bar');
  if (input.value !== "") {
    addLoading();
    getResults(input.value);
    console.log(input.value);
  }  
}

const displayDropdown = () => {
  const dropdown = document.querySelector('.dropdown-content');
  dropdown.classList.toggle('visible');
}

window.onload = () => {
  displaySavedCartItems();
  const clear = document.querySelector('.empty-cart');
  clear.addEventListener('click', clearCart);
  const searchBtn = document.getElementById('search-btn');
  searchBtn.addEventListener('click', verifyInput);
  const myCart = document.querySelector('.my-cart');
  myCart.addEventListener('click', displayDropdown);
};