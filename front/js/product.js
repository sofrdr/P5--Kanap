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

                let productImage = document.createElement("img");
                productImage.setAttribute("src", product.imageUrl);
                productImage.setAttribute("alt", product.altTxt);
                document.querySelector(".item__img")
                .appendChild(productImage);

                document.querySelector("#title")
                .textContent = product.name;
              }
          }
      })