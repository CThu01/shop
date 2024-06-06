import initialRender from "./core/initialRender.js";
import listener from "./core/listener.js";

class Shop{

    init(){
        console.log("Shop Add is started");
        initialRender;
        listener();
    }
}

export default Shop;