// on récupère l'id du produit dans l'URL
let params = new URLSearchParams(window.location.search);
let idProduct = params.get('id');


//Fonction pour ajouter des options de couleur
function createColor(valueColor) {
    let option = document.createElement("option");
    option.setAttribute("value", valueColor);
    document.querySelector("#colors")
        .appendChild(option);
    option.textContent = valueColor;
}

function getProductElt(){

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
                document.querySelector(".item__img")
                    .appendChild(productImage);

                //Ajout du nom du produit
                document.querySelector("#title")
                    .textContent = product.name;

                //Ajout du prix du produit
                document.querySelector("#price")
                    .textContent = product.price;

                //Ajout de la description du produit
                document.querySelector("#description")
                    .textContent = product.description;

                // Création des options de couleur en fonction du produit
                for (color of product.colors) {
                    createColor(color);
                }
            }
        }
    })
    .catch(error =>{
        console.error(error);
    })
} 

getProductElt();

/*Ajouter le produit au panier*/


let basket = [];



let quantityOfProduct = 0;

let quantity = document.querySelector("#quantity");
quantityOfProduct = quantity.value;
//Evenement pour observer le changement de valeur de l'input #quantity
quantity.addEventListener("change", function (e) {
    quantityOfProduct = quantity.value;
    e.stopPropagation();
    //console.log(quantityOfProduct)
})


let colorOfProduct;
let colors = document.querySelector("#colors");
//Evenement pour observer le changement de valeur du select #colors
colors.addEventListener("change", function (e) {
    colorOfProduct = colors.value;
    e.stopPropagation();
    console.log(colorOfProduct);
})


function addtoBasket() {
    let shoppedProduct = {
        id: idProduct,
        quantity: quantityOfProduct,
        color: colorOfProduct
    };
/*Si on trouve l'id ET la couleur du produit dans le panier
alors on augmente la quantité
sinon on ajoute le produit */
    let foundProduct = basket.find(function (p) {
            return p.id == idProduct && p.color == colorOfProduct;
        });
    
        
    if (foundProduct) {
        let total = Number(foundProduct.quantity) + Number(quantityOfProduct);
        foundProduct.quantity = total;
    } else {
        basket.push(shoppedProduct)
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    alert("Le produit a bien été ajouté au panier");
}




let button = document.querySelector("#addToCart");
button.addEventListener("click", function (e) {
    //Si pas de couleur définie on empêche l'ajout du produit au panier
    if (!colorOfProduct) {
        e.preventDefault();
        alert("Veuillez choisir une couleur");

        //Si la quantité est supérieure à 100 et inférieure à 1 alors on empêche l'ajout du produit au panier
    } else if (quantityOfProduct > 100 || quantityOfProduct < 1) {
        e.preventDefault();
        alert("Veuillez saisir une valeur entre 1 et 100");
    } else {
        addtoBasket();
    }

})







