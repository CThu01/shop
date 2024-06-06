import { categoryRender } from "../app/categoryRender.js";
import { productRender } from "../app/productRender.js";
import { categories, products } from "./data.js";


const initialRender = () => {
    categoryRender(categories);
    productRender(products);
}

export default initialRender();