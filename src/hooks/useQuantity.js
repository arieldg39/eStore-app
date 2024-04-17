import { useState } from "react";


export const useQuantity = () => {

    const [quantity, setQuantity] = useState(1);


    const sumQuantity = () => {
        console.log("sumar");
        setQuantity((prev) => prev + 1);
    }


    const restQuantity = () => {
        console.log("restar");
        if(quantity <= 0) return;
        setQuantity((prev) => prev - 1);
    }

    return {
        quantity,
        sumQuantity,
        restQuantity
    }
}
