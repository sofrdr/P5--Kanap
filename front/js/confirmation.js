// on récupère l'id du de la commande dans l'URL
let params = new URLSearchParams(window.location.search);
let orderId = params.get("id");


document.getElementById("orderId").textContent = orderId;