function getProducts() {
    fetch("http://localhost:3000/api/products")
      .then(function (res) {
        if (res.ok) {
          return res.json();
        } else {
          console.error("error", code);
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
  
        
        }
  
  
      })
  
  }
  
  getProducts();