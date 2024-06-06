import { products } from "../core/data.js";
import { categoryGroup, categoryTemplate } from "../core/selectors.js";
import { productRender } from "./productRender.js";


export const createCategory = (category) => {

    const categoryTitle = categoryTemplate.content.cloneNode(true);
    categoryTitle.querySelector(".category-btn").innerText = category;
    return categoryTitle;
};

export const categoryRender = (categories) => {
    categories.forEach( category => categoryGroup.append(createCategory(category)));
}

export const categoryGroupHandler = (event) => {
    
    if(event.target.classList.contains("category-btn")){
        const currentCategory = event.target.innerText;

        categoryGroup.querySelector(".active")?.classList.remove("active");
        event.target.classList.add("active");
        
        const filterProduct = products.filter(product => product.category === currentCategory || currentCategory === 'All');
        productRender(filterProduct);

    }
}