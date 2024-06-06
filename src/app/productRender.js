import { products } from "../core/data.js";
import { cartBtn, cartGroup, openDrawerIcon, productGroup, productTemplate } from "../core/selectors.js";
import { calculateCartItem, cartRender, updateTotalPrice } from "./cartRender.js";

export const star = ({rating}) => {
    let demoStar = '';
    for(let i=1; i <=5; i++){
        demoStar += `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
            class="w-3 h-3 ${Math.round(rating.rate) >= i ? `text-gray-900` : `text-gray-400`}">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
        </svg> 
        `;
    }

    return demoStar;
}

export const createProduct = (product,hide) => {

    const productToShow = productTemplate.content.cloneNode(true);

    // if(hide){
    //     productToShow.querySelector(".product-selected").classList.add("hidden");
    // }

    productToShow.querySelector(".product-selected").setAttribute("product-id",product.id);
    productToShow.querySelector("img").src = product.image;
    productToShow.querySelector(".product-title").innerText = product.title;
    productToShow.querySelector(".product-description").innerText = product.description;
    productToShow.querySelector(".product-rate").innerText = product.rating.rate;
    productToShow.querySelector(".product-count").innerText = product.rating.count;
    productToShow.querySelector(".product-price").innerText = product.price;

    productToShow.querySelector(".stars").innerHTML = star(product);

    const isExisted = cartGroup.querySelector(`[cart-product-id='${product.id}']`);
    // console.log(isExisted);
    if(isExisted){
        productToShow.querySelector(".change-btn").setAttribute("disabled",true);
        productToShow.querySelector(".change-btn").innerText = "Added";
    }

    return productToShow;
};

export const productRender = (showProducts) => {

    productGroup.innerHTML = "";
    showProducts.forEach( product => productGroup.append(createProduct(product,false)));
    
    // products.forEach( el => productGroup.append(createProduct(el,true)));
};

export const productGroupHandler = (event) => {
    
    if(event.target.innerText === "Add to Cart"){
        const productId= parseInt(event.target.closest(".product-selected").getAttribute("product-id"));
        const productToCart = products.find(product => product.id === productId);

        const changeBtnState = event.target;
        // console.log(changeBtnState);
        changeBtnState.setAttribute("disabled",true);
        changeBtnState.innerText = "Added"

        const currentProduct = event.target.closest(".product-selected");
        const currentImage = currentProduct.querySelector("img");
        
        const animateImage = new Image();
        animateImage.src = currentImage.src;
        animateImage.style.position = "fixed";
        animateImage.style.top = currentImage.getBoundingClientRect().top + "px";
        animateImage.style.left = currentImage.getBoundingClientRect().left + "px";
        animateImage.style.height = currentImage.getBoundingClientRect().height + "px";

        document.body.append(animateImage);
        console.log(animateImage.getBoundingClientRect());

        const animateKeyFrame = [
            {
                left : animateImage.getBoundingClientRect().left + "px",
                top :animateImage.getBoundingClientRect().top + "px"
            },
            {
                left : openDrawerIcon.querySelector("svg").getBoundingClientRect().left + "px",
                top : openDrawerIcon.querySelector("svg").getBoundingClientRect().top + "px",
                transform : "rotate(2turn) scale(0)"
            }
        ];

        const duration = 1000;

        const cloneImageAnimation = animateImage.animate(animateKeyFrame,duration);

        const cloneImageAnimationHandler = () => {
            animateImage.remove();

            cartBtn.classList.add("animate__shakeX");

            openDrawerIcon.addEventListener("animationend",() => {
                cartBtn.classList.remove("animate__shakeX");
            })

            cartRender(productToCart,1);
            calculateCartItem();
            updateTotalPrice();

        };

        cloneImageAnimation.addEventListener("finish",cloneImageAnimationHandler);

        
    }
    // console.log(event.target);
}