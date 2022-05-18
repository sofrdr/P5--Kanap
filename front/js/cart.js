


function getBasket(basket) {
    const newBasketJson = localStorage.getItem("basket", basket);
    const newBasket = JSON.parse(newBasketJson);
    return newBasket;

}

const myBasket = getBasket();
console.log(myBasket)

if (!myBasket) {
    alert("Votre panier est vide");
} else {

    for (let item of myBasket) {
        //Ajout d'une balise article pour chaque élement du panier
        let article = document.createElement("article");
        article.setAttribute("data-id", item.id);
        article.setAttribute("data-color", item.color)
        document.querySelector("#cart__items").appendChild(article);

        //Création de la div contenant l'image du produit
        let divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");
        let img = document.createElement("img");
        article.appendChild(divImg);
        divImg.appendChild(img);

        //Création de la div contenant la description du produit
        let divContent = document.createElement("div");
        divContent.classList.add("cart__item__content");
        article.appendChild(divContent);
        let divDescription = document.createElement("div");
        divDescription.classList.add("cart__item__content__description");
        divContent.appendChild(divDescription);

        //Ajout des éléments de description
        let name = document.createElement("h2");
        let colorParagraph = document.createElement("p");
        let priceParagraph = document.createElement("p");
        divDescription.appendChild(name);
        divDescription.appendChild(colorParagraph).textContent = item.color;
        divDescription.appendChild(priceParagraph);

        //Création des div et de leurs élements pour gérer la quantité
        let divSettings = document.createElement("div");
        divSettings.classList.add("cart__item__content__settings");
        divContent.appendChild(divSettings);
        let divQuantity = document.createElement("div");
        divQuantity.classList.add("cart__item__content__settings__quantity");
        divSettings.appendChild(divQuantity);

        let quantityParagraph = document.createElement("p");
        divQuantity.appendChild(quantityParagraph).textContent = "Qté : ";
        let quantityInput = document.createElement("input");
        divQuantity.appendChild(quantityInput);
        quantityInput.setAttribute("type", "number");
        quantityInput.setAttribute("name", "itemQuantity");
        quantityInput.setAttribute("min", "1");
        quantityInput.setAttribute("max", "100");
        quantityInput.setAttribute("value", item.quantity);
        quantityInput.classList.add("itemQuantity");


    }
}


const dataID = document.querySelector("article").getAttribute("data-id");



async function getProducts() {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();
    console.log(products);

    for (let product of products) {
        //Si l'id d'un produit de l'API correspond à l'id du produit du panier
        if (product._id == dataID) {
            //On affiche l'image du produit du panier
            let img = document.querySelector(".cart__item__img img");
            img.setAttribute("src", product.imageUrl);
            img.setAttribute("alt", product.altTxt);
            // On affiche le nom du produit
            document.querySelector(".cart__item__content__description h2").textContent = product.name;
            // On affiche le prix du produit à l'unité
            document.querySelector(".cart__item__content__description p:last-child").textContent = product.price + "€";
        }
    }
}
getProducts()



let totalQuantity = [];
let sum = 0;

/* Création d'une fonction getTotalProducts() pour obtenir le nombre total de produits
ajoutés au panier */

function getTotalproducts() {
    //Pour chaque produit du panier, on récupère sa quantité et on l'ajoute dans un array
    for (let item of myBasket) {
        totalQuantity.push(Number(item.quantity));
    }
    //On additionne chaque élément de cet array et on récupère le total dans une variable sum
    for (let i = 0; i < totalQuantity.length; i++) {
        sum += totalQuantity[i];
    }
    return sum;
}

const totalProducts = getTotalproducts();
console.log(totalProducts);

document.querySelector("#totalQuantity").textContent = totalProducts;


/* Création d'une fonction getTotalPrice() pour calculer le prix total du panier */

let totalPrice = 0;
let price = [];
async function getTotalPrice() {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();
    for (let item of myBasket) {
        for (let product of products) {
            if (product._id == dataID) {
                price.push(product.price);
            }
        }
    }
    console.log(price)
    let quantity = [];
    for (let item of myBasket) {
        quantity.push(Number(item.quantity))
    }
    console.log(quantity)

    for (let i = 0; i < quantity.length; i++) {
        totalPrice += (price[i] * quantity[i]);
    }
    console.log(totalPrice);
    document.querySelector("#totalPrice").textContent = totalPrice;


}

getTotalPrice();


/* Supprimer un article du panier */




const divSettings = document.querySelectorAll(".cart__item__content__settings");

for (let i = 0; i < divSettings.length; i++) {
    let pDelete = document.createElement("p");
    pDelete.textContent = "Supprimer";
    pDelete.classList.add("deleteItem");

    let divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");
    divDelete.appendChild(pDelete);
    divSettings[i].appendChild(divDelete)

}

function removeFromBasket(elt) {
    localStorage.removeItem(elt);
}

pDelete.addEventListener("click", function (e) {

})