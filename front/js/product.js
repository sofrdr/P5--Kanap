// on récupère l'id du produit dans l'URL
let params = new URLSearchParams(window.location.search);
let idProduct = params.get("id");

//Fonction pour ajouter des options de couleur
function createColor(valueColor) {
  let option = document.createElement("option");
  option.setAttribute("value", valueColor);
  document.querySelector("#colors").appendChild(option);
  option.textContent = valueColor;
}

function getProductElt() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (products) {
      for (let product of products) {
        if (idProduct == product._id) {
          //Ajout de l'image du produit
          let productImage = document.createElement("img");
          productImage.setAttribute("src", product.imageUrl);
          productImage.setAttribute("alt", product.altTxt);
          document.querySelector(".item__img").appendChild(productImage);

          //Ajout du nom du produit
          document.querySelector("#title").textContent = product.name;

          //Ajout du prix du produit
          document.querySelector("#price").textContent = product.price;

          //Ajout de la description du produit
          document.querySelector("#description").textContent =
            product.description;

          // Création des options de couleur en fonction du produit
          for (let color of product.colors) {
            createColor(color);
          }
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

getProductElt();

/*Ajouter le produit au panier*/

const button = document.getElementById("addToCart");

button.addEventListener("click", (e) => {

  let quantitySelected = document.getElementById("quantity").value;
  let colorSelected = document.getElementById("colors").value;

  const shoppedProduct = {
    key: idProduct + "-" + colorSelected,
    id: idProduct,
    quantity: Number(quantitySelected),
    color: colorSelected,
  };
  controlInputs(quantitySelected, colorSelected, shoppedProduct);
});

function controlInputs(quantitySelected, colorSelected, shoppedProduct) {
  //Si pas de couleur définie on empêche l'ajout du produit au panier
  if (colorSelected === "") {
    alert("Veuillez choisir une couleur");
    return false;
  } else if (quantitySelected > 100 || quantitySelected < 1) {
    alert("Veuillez saisir une valeur entre 1 et 100");
    return false;
  } else {
    addtoBasket(shoppedProduct);
  }
}


// Function ajouter au panier
function addtoBasket(shoppedProduct) {
  let basket = [];
  basket = localStorage.getItem("basket");
  basket = JSON.parse(basket);

  if (basket == null) {
    let newBasket = [shoppedProduct];
    localStorage.setItem("basket", JSON.stringify(newBasket));
    alert("Produit ajouté au panier 0");
  } else {
    let isDouble = false;

    for (const product of basket) {
      if (product.key === shoppedProduct.key) {
        const newQuantity = product.quantity + shoppedProduct.quantity;
        if (newQuantity <= 100 && newQuantity >= 1) {
          product.quantity = newQuantity;
          localStorage.setItem("basket", JSON.stringify(basket));
          alert("Produit ajouté au panier 1");
          return true;
        } else {
          alert("Quantité maximale atteinte");
          return true;
        }
      }
    }
    if (isDouble === false) {
      basket.push(shoppedProduct);
      localStorage.setItem("basket", JSON.stringify(basket));
      console.log(basket);
      alert("Produit ajouté au panier 2");
    }
  }
}








