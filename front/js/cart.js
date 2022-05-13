


function getBasket(basket){
    const newBasketJson = localStorage.getItem("basket", basket);
    const newBasket = JSON.parse(newBasketJson);
    return newBasket;
    
}

const myBasket = getBasket();
console.log(myBasket)

for(let item of myBasket){
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
    divQuantity.appendChild(quantityParagraph);
    let quantityInput = document.createElement("input");
    divQuantity.appendChild(quantityInput);
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("name", "itemQuantity");
    quantityInput.setAttribute("min", "1");
    quantityInput.setAttribute("max", "100");
    quantityInput.setAttribute("value", item.quantity);
    quantityInput.classList.add("itemQuantity");

    
}


const dataID = document.querySelector("article").getAttribute("data-id");
console.log(dataID)

async function getProducts(){
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();
    console.log(products)

    for(let product of products){
        if(product.id == dataID){
            let
        }
    }
}
 getProducts()




                