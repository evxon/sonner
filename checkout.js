const WORKER_URL = "https://sonner-paypal.ebsonn05.workers.dev";

async function checkout() {

    const bag = JSON.parse(localStorage.getItem("bag")) || [];

    if (bag.length === 0) {
        alert("Your bag is empty.");
        return;
    }

    const cart = bag.map(item => ({
        id: item.id,
        quantity: item.quantity
    }));

    console.log(cart);

}
