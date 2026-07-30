const WORKER_URL = "https://sonner-paypal.ebsonn05.workers.dev";

async function checkout() {

    console.log("CHECKOUT CLICKED");


    const bag = JSON.parse(localStorage.getItem("bag")) || [];


    console.log("CURRENT BAG:", bag);


    if (bag.length === 0) {

        alert("Your bag is empty.");
        return;

    }


    try {

        const response = await fetch(WORKER_URL);


        console.log("WORKER STATUS:", response.status);


        const text = await response.text();


        console.log("WORKER RESPONSE:", text);


    } catch(error){

        console.error("CHECKOUT ERROR:", error);

    }

}
