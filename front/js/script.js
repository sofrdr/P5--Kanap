

function getProducts() {
    fetch("http://localhost:3000/api/products")
      .then(function (res) {
        if (res.ok) {
          return res.json();
        } 
  
      })
      .then(function (products) {
        console.log(products);      
        for (let product of products) {
  
          // Ajout d'un lien avec id pour chaque produit
          let productLink = document.createElement("a");
          document.querySelector("#items")
            .appendChild(productLink)
            .setAttribute("href", "./product.html?id=" + product._id);
  
          // Création de la balise <article>
          let article = document.createElement("article");
          productLink.appendChild(article);
  
          // Ajout de l'image des produits
  
          let productImage = document.createElement("img");
          article.appendChild(productImage);
          productImage.setAttribute("src", product.imageUrl);
          productImage.setAttribute("alt", product.altTxt);
  
          // Ajout du nom pour chaque produit
          let productName = document.createElement("h3");
          productName.classList.add("productName");
          article.appendChild(productName)
            .textContent = product.name;
  
          // Ajout de la description du produit
  
          let productDescription = document.createElement("p");
          productDescription.classList.add("productDescription");
          article.appendChild(productDescription)
            .textContent = product.description;
        }
  
  
      })

      .catch(function(err){
        console.error(err);
      })
  
  }
  
  getProducts();