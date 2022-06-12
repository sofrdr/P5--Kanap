// on récupère l'id du de la commande dans l'URL
const queryString = window.location;
const url = new URL(queryString);
const orderId = url.searchParams.get("id");



function displayOrderId(orderId){
    document.getElementById("orderId").textContent = orderId;
}

displayOrderId(orderId);