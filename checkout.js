const WORKER_URL = "https://sonner-paypal.ebsonn05.workers.dev";

async function checkout() {

    console.log("CHECKOUT CLICKED");


    const bag = JSON.parse(localStorage.getItem("bag")) || [];


    console.log("CURRENT BAG:", bag);


    if (bag.length === 0) {

        alert("Your bag is empty.");
        return;

    }


    const cart = bag.map(item => ({
        id: item.id,
        quantity: item.quantity
    }));


    console.log("SENDING CART:", cart);


    try {


        const response = await fetch(WORKER_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                cart: cart
            })

        });


        console.log("WORKER STATUS:", response.status);


        const text = await response.text();


        console.log("WORKER RESPONSE:", text);


    } catch(error){

        console.error("CHECKOUT ERROR:", error);

    }

}
