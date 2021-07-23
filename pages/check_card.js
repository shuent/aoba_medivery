import { getAllProducts } from "../repository/productRepository";
import React,{ useEffect, useState } from 'react';


export default function info_card() {

    const [products, setProducts] = useState([])
    useEffect(() => {
        getAllProducts().then((data)=>{
            setProducts(data)
           })  
    }, []);

    const selectedTag = "stomach"

    // const [suggestProducts,setSuggestProducts]= useState([])

    const suggestProducts = products.filter(item => item.tag.includes(selectedTag))

    console.log(products)
    console.log(suggestProducts)
    return (
        <>
        {suggestProducts.map((suggestProduct) => (
            <div>
                <p><label>{suggestProduct.name}</label></p>    
                <p><label>{suggestProduct.price}</label></p>
                <p><label>{suggestProduct.explanation}</label></p>
            </div>
        ))}
        </>
    );
}
  export { info_card };

