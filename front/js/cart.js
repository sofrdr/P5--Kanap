

function getBasket(basket){
    const newBasketJson = localStorage.getItem("basket", basket);
    const newBasket = JSON.parse(newBasketJson);
    return newBasket;
    
}

const myBasket = getBasket();
console.log(myBasket)

for(let product of myBasket){
    console.log(product.id)
}