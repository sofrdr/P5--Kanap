let params = new URLSearchParams(window.location.search);
let idProduct = params.get('id');
console.log(idProduct);

fetch("http://localhost:3000/api/products")
      .then(function(res){
          if(res.ok){
              return res.json();
          }
      })
      .then(function (products) {
          console.log(products);
          for(let product of products){
              if(idProduct == product._id){
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

                //Ajout des options de couleur
                function createColor(valueColor){
                    let option = document.createElement("option");
                    option.setAttribute("value", valueColor);
                    document.querySelector("#colors")
                    .appendChild(option);
                    option.textContent = valueColor;
                }
                for(color of product.colors){
                    createColor(color);
                }
              }
          }
      })