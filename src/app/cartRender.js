import Swal from "sweetalert2";
import { cartGroup, cartItemCount, cartItemTemplate, productGroup, showCartCount, totalPrice } from "../core/selectors.js"


export const cartRender = (product,quantity) => {
    
    const cartItem = cartItemTemplate.content.cloneNode(true);

    cartItem.querySelector("img").src = product.image;
    // console.log(cartItem.querySelector(".cart-item"));
    cartItem.querySelector(".cart-item").setAttribute("cart-product-id",product.id);
    cartItem.querySelector(".item-title").innerText = product.title;
    cartItem.querySelector(".item-price").innerText = product.price;
    cartItem.querySelector(".item-real-price").innerText = product.price;
    cartItem.querySelector(".item-quantity").innerText = quantity;

    cartGroup.append(cartItem);
}

export const calculateCartItem = () => {
    const totalItemCount = document.querySelectorAll(".cart-item");

    // console.log(totalItemCount);
    showCartCount.innerText = totalItemCount.length;
    cartItemCount.innerText = totalItemCount.length;
}

export const updateTotalPrice = () => {
    const eachPrices = document.querySelectorAll(".item-price");
    const total = [...eachPrices].reduce((pv,cv) => pv+parseFloat(cv.innerText),0);
    totalPrice.innerText = total.toFixed(2);
}

export const cartGroupHandler = (event) => {
    if(event.target.classList.contains("delete-cart-item")){
        const toDeleteItem = event.target.closest(".cart-item");
        // console.log(toDeleteItem);
        const deletedProductId = toDeleteItem.getAttribute("cart-product-id");
    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {

                const reactivateProduct = productGroup.querySelector(`[product-id='${deletedProductId}']`);
                console.log(reactivateProduct);

                if(reactivateProduct){
                    const reactivateBtn = reactivateProduct.querySelector(".change-btn");
                    console.log(reactivateBtn);
                    reactivateBtn.removeAttribute("disabled");
                    reactivateBtn.innerText = "Add to Cart";
                }

                toDeleteItem.remove();


                calculateCartItem();
                updateTotalPrice();
            }
          });
    } else if(event.target.classList.contains("add-cart-item")){
        const selectedCartItem = event.target.closest(".cart-item");
        numberOfCartItem(selectedCartItem,1);
    } else if(event.target.classList.contains("sub-cart-item")){
        const selectedCartItem = event.target.closest(".cart-item");
        numberOfCartItem(selectedCartItem,-1);
    }
}


export const numberOfCartItem = (selectedCartItem,newQuantity) => {

    const currentQuantity = selectedCartItem.querySelector(".item-quantity");
    const currentPrice = selectedCartItem.querySelector(".item-price");
    const currentRealPrice = parseFloat(selectedCartItem.querySelector(".item-real-price").innerText);
    if(newQuantity > 0 || currentQuantity.innerText > 1 ){
        currentQuantity.innerText = parseInt(currentQuantity.innerText) + newQuantity;
        currentPrice.innerText = (currentRealPrice * parseInt(currentQuantity.innerText)).toFixed(2);
        updateTotalPrice();
    }

    
    
}
    