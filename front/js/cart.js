

/* Fonction pour récupérer le panier du local storage*/
function getBasket(basket) {
    const newBasketJson = localStorage.getItem("basket", basket);
    const newBasket = JSON.parse(newBasketJson);
    return newBasket;
}

// On stocke le résultat de la fonction dans la variable myBasket
let myBasket = getBasket();
console.log(myBasket)

/* Fonction pour sauvegarder le panier */
function saveBasket(myBasket) {
    for (let item of myBasket) {
        delete item.price;
        delete item.img;
        delete item.alt;
    }
    localStorage.setItem("basket", JSON.stringify(myBasket))
}

/* Fonction pour supprimer le panier du local storage */

function removeBasket() {
    localStorage.removeItem("basket");
}


/*Fonction pour ajouter au DOM un élément img qui contiendra l'image de chaque produit du panier.
On ajoute 3 paramètres : 
image : la valeur de l'attribut "src" 
txt : la valeur de l'attribut "alt" 
parent : l'élement parent du nouvel élément divImg (la div contenant img)*/

function addImage(image, txt, parent) {
    let divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    let img = document.createElement("img");
    parent.appendChild(divImg);
    divImg.appendChild(img);
    img.setAttribute("src", image);
    img.setAttribute("alt", txt);

}

/*Fonction pour ajouter au DOM un élément h2 qui contiendra le nom de chaque produit du panier,
on ajoute 2 paramètres : 
name : le contenu de l'élément h2
parent : l'élement parent du nouvel élément h2 */

function addName(name, parent) {
    let title = document.createElement("h2");
    parent.appendChild(title).textContent = name;
}

/*Fonction pour ajouter au DOM un élément p qui contiendra la couleur de chaque produit du panier,
on ajoute 2 paramètres : 
color : le contenu de l'élément p
parent : l'élement parent du nouvel élément p */

function addColor(color, parent) {
    let colorParagraph = document.createElement("p");
    parent.appendChild(colorParagraph).textContent = color;

}

/*Fonction pour ajouter au DOM un élément p qui contiendra le prix de chaque produit du panier,
on ajoute 2 paramètres : 
price : le contenu de l'élément p
parent : l'élement parent du nouvel élément p */

function addPrice(price, parent) {
    let priceParagraph = document.createElement("p");
    parent.appendChild(priceParagraph).textContent = price + " €";
}




/* Création d'une fonction pour récupérer les caractéristiques de chaque produit du panier en appelant l'API
et les ajouter à la page panier */


async function getProductsAttributes() {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();
    //console.log(products);

    for (let item of myBasket) {

        for (let product of products) {
            if (item.id == product._id) {
                item.img = product.imageUrl;
                item.alt = product.altTxt;
                item.name = product.name;
                item.price = product.price;

            }
        }

        //console.log(item)
        let article = document.createElement("article");
        article.setAttribute("data-id", item.id);
        article.setAttribute("data-color", item.color)
        document.querySelector("#cart__items").appendChild(article);

        addImage(item.img, item.alt, article);

        let divContent = document.createElement("div");
        divContent.classList.add("cart__item__content");
        article.appendChild(divContent);
        let divDescription = document.createElement("div");
        divDescription.classList.add("cart__item__content__description");
        divContent.appendChild(divDescription);

        addName(item.name, divDescription);

        addColor(item.color, divDescription);

        addPrice(item.price, divDescription)

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


        // Création du bouton supprimer pour chaque article
        let buttonDelete = document.createElement("p");
        buttonDelete.textContent = "Supprimer";
        buttonDelete.classList.add("deleteItem");
        let divDelete = document.createElement("div");
        divDelete.classList.add("cart__item__content__settings__delete");
        divDelete.appendChild(buttonDelete);
        divSettings.appendChild(divDelete);




        /* Ajout d'un évènement pour écouter le changement de valeur de l'input quantité, 
        on modifie la quantité du produit dans le panier et dans le local storage à chaque changement */
        quantityInput.addEventListener("change", function () {
            let newQuantity = Number(quantityInput.value);
            // console.log("nouvelle qté : " + newQuantity)
            if (newQuantity >= 1 && newQuantity <= 100) {
                item.quantity = newQuantity;
            }

            let newBasket = [];
            for (let item of myBasket) {
                let newProduct = {
                    key: item.key,
                    id: item.id,
                    quantity: item.quantity,
                    color: item.color
                }
                newBasket.push(newProduct);
            }
            saveBasket(newBasket);


        })

        /* Ajout d'un évènement pour supprimer un article*/

        buttonDelete.addEventListener("click", function (e) {

            const closestItem = buttonDelete.closest("article");
            const closestID = closestItem.getAttribute("data-id");

            // On supprime l'article du DOM
            document.getElementById("cart__items").removeChild(closestItem);
            alert("Produit supprimé du panier");

            // On supprime l'article du panier + MAJ du local storage
            let index = myBasket.findIndex(element => {
                if (element.id == closestID) {
                    return true;
                }
            })
            myBasket.splice(index, 1)
            saveBasket(myBasket);

            // Si le panier est vide alors on le supprime du local storage
            if (!myBasket.length) {
                removeBasket();
                alert("Votre panier est vide");
            }

            // On actualise le nombre total de produit et le prix total
            document.querySelector("#totalQuantity").textContent = getTotalProducts();
            getTotalPrice();

        });
    }
}



/* Création d'une fonction getTotalProducts() pour obtenir le nombre total de produits
ajoutés au panier */

function getTotalProducts() {
    let totalQuantity = [];
    let sum = 0;

    //Pour chaque produit du panier, on récupère sa quantité et on l'ajoute dans un array
    for (let item of myBasket) {
        totalQuantity.push(Number(item.quantity));
    }
    //On additionne chaque élément de cet array et on récupère le total dans une variable sum
    for (let i = 0; i < totalQuantity.length; i++) {
        sum += totalQuantity[i];
    }

    //document.querySelector("#totalQuantity").textContent = sum;
    return sum;

}



/* Création d'une fonction getTotalPrice() pour calculer le prix total du panier */


async function getTotalPrice() {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();
    let totalPrice = 0;
    let price = [];
    for (let item of myBasket) {
        for (let product of products) {
            if (product._id == item.id) {
                price.push(product.price);
            }
        }
    }

    let quantity = [];
    for (let item of myBasket) {
        quantity.push(Number(item.quantity))
    }


    for (let i = 0; i < quantity.length; i++) {
        totalPrice += (price[i] * quantity[i]);
    }

    document.querySelector("#totalPrice").textContent = totalPrice;


}


//Appel des fonctions si le panier n'est pas vide

if (!myBasket) {
    document.querySelector("#totalPrice").textContent = "0";
    document.querySelector("#totalQuantity").textContent = "0";
    alert("Votre panier est vide");

} else {
    getProductsAttributes().catch(err => console.error(err));
    getTotalPrice().catch(err => console.error(err));;
    document.querySelector("#totalQuantity").textContent = getTotalProducts();
    document.addEventListener("change", function () {
        document.querySelector("#totalQuantity").textContent = getTotalProducts();
        getTotalPrice();
    })

}




/* -------------------- VALIDATION DU FORMULAIRE ------------------------ */

let regexString = /^(?=.\D{0,}$)[\u00c0-\u01ffa-zA-Z]+(?:['-\s][\u00c0-\u01ffa-zA-Z]+)*$/
let regexMail = /^((?!\.)[\w_.-]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
let regexAddress = /^(([a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ'.]*\s)\d*(\s[a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ']*)*,)*\d*(\s[a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ']*)+\s([\d]{5})$/


/*Fonction pour vérifier la validité de la valeur de l'input avec 2 paramètres :
- inputValue : le contenu qu'on veut tester
- regex : la regex à appliquer */
function isValid(inputValue, regex) {
    if (regex.test(inputValue)) {
        return true;
    }
}

/*Fonction pour vérifier la validité de tous les inputs */
function isFormValid() {
    if (isValid(firstNameInput.value, regexString) &&
        isValid(lastNameInput.value, regexString) &&
        isValid(addressInput.value, regexAddress) &&
        isValid(emailInput.value, regexMail) &&
        isValid(cityInput.value, regexString)) {
        return true;
    }


}

/*Fonction pour afficher un message d'erreur sur la page si la valeur de l'input n'est pas valide.
Fonction avec 4 paramètres :
- input : le champ où on ajoute un évènement
- id : l'id du champ où on affiche le message d'erreur
- msg : le message d'erreur à afficher
- regex : la regex à utiliser pour contrôler la validité */
function showErrorMsg(input, id, msg, regex) {

    input.addEventListener("keyup", function (e) {
        let inputValue = e.target.value;
        if (!isValid(inputValue, regex)) {
            document.getElementById(id).textContent = "Veuillez saisir " + msg + " valide";
        } else {
            document.getElementById(id).textContent = "";
        }
    })
}


let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let addressInput = document.getElementById("address");
let emailInput = document.getElementById("email");
let cityInput = document.getElementById("city");


showErrorMsg(lastNameInput, "lastNameErrorMsg", "un nom", regexString);
showErrorMsg(firstNameInput, "firstNameErrorMsg", "un prénom", regexString);
showErrorMsg(addressInput, "addressErrorMsg", "une adresse", regexAddress);
showErrorMsg(emailInput, "emailErrorMsg", "un email", regexMail);
showErrorMsg(cityInput, "cityErrorMsg", "un nom de ville", regexString);



/* ---------------- ENVOI DU FORMULAIRE ---------------- */

let submitButton = document.getElementById("order");

submitButton.addEventListener("click", function (e) {
    /* Si tous les inputs sont valides ET que la quantité est inférieure à 100 article
    ALORS on envoie le formulaire
    SINON on bloque l'envoi du formulaire et on affiche un message d'erreur*/
    e.preventDefault();
    let totalQuantity = getTotalProducts();
    if (!isFormValid()) {

        alert("Veuillez vérifier les informations du formulaire");
    } else if (totalQuantity > 100 || totalQuantity < 1) {

        alert("Quantité maximale atteinte (100 produits max)");
    } else {

        const contact = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            address: addressInput.value,
            city: cityInput.value,
            email: emailInput.value
        }

        let products = [];
        for (let item of myBasket) {
            products.push(item.id);
        }

        const orderInfo = { contact, products };

        const options = {
            method: 'POST',
            body: JSON.stringify(orderInfo),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then(response => response.json())
            .then(data => {             
                window.location.href = "confirmation.html?id=" + data.orderId;
                localStorage.clear();
            })
            .catch(err => console.error(err))

    }
})

