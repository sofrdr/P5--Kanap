// on récupère l'id du produit dans l'URL
let params = new URLSearchParams(window.location.search);
let idProduct = params.get('id');
console.log(idProduct);

//Fonction pour ajouter des options de couleur
function createColor(valueColor) {
    let option = document.createElement("option");
    option.setAttribute("value", valueColor);
    document.querySelector("#colors")
        .appendChild(option);
    option.textContent = valueColor;
}

fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (products) {
        console.log(products);
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

/*Ajouter le produit au panier*/


let cart = [];

function addToCart() {

    let quantityOfProduct = 1;
    let quantity = document.querySelector("#quantity")
    quantity.addEventListener("change", function (e) {
        quantityOfProduct = quantity.value;
        e.stopPropagation();
        console.log(quantityOfProduct)
    })


    let colorOfProduct;
    let colors = document.querySelector("#colors");
    colors.addEventListener("change", function (e) {
        colorOfProduct = colors.value;
        e.stopPropagation();
        console.log(colorOfProduct);
    })

    let button = document.querySelector("#addToCart");
    button.addEventListener("click", function (e) {



        if (!colorOfProduct) {
            e.preventDefault();
            alert("Veuillez choisir une couleur");


        } else if (quantityOfProduct > 100) {
            e.preventDefault();
            alert("Veuillez saisir une quantité inférieure à 100 articles");
        } else {
            let shoppedProductJSON = {
                id: idProduct,
                quantity: quantityOfProduct,
                color: colorOfProduct

            }
            let shoppedProduct = JSON.stringify(shoppedProductJSON);
            localStorage.setItem("product", shoppedProduct);
            alert("Le produit a bien été ajouté au panier");
        }


    })
}

addToCart();
