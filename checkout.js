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



        const order = await response.json();



        console.log("PAYPAL ORDER:", order);



        if(order.links){


            const approveLink = order.links.find(
                link => link.rel === "approve"
            );


            if(approveLink){

                window.location.href = approveLink.href;

            } else {

                console.error("No PayPal approval link found");

            }


        } else {

            console.error("No PayPal order returned");

        }



    } catch(error){

        console.error("CHECKOUT ERROR:", error);

    }

}
