import { cartGroupHandler } from "../app/cartRender.js";
import { categoryGroupHandler } from "../app/categoryRender.js";
import { productGroupHandler } from "../app/productRender.js";
import { cartGroup, categoryGroup, productGroup } from "./selectors.js";


const listener = () => {
    
    categoryGroup.addEventListener("click",categoryGroupHandler);

    productGroup.addEventListener("click",productGroupHandler);

    cartGroup.addEventListener("click",cartGroupHandler);
}

export default listener;