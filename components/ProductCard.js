import React,{ useEffect, useState } from 'react';

function ProductCard(props) {
    // console.log(props.name)

    const [orderNumbers,setorderNumbers] =  useState(0)

    return(
    <>
        <div>
            <p>{props.product.name}</p>
            <p>{props.product.explanation}</p>    
            <p>{props.product.price * orderNumbers}円</p>
            <p><button onClick={() => setorderNumbers(orderNumbers + 1)}>+</button>{orderNumbers}<button onClick={() => {if (orderNumbers!=0) setorderNumbers(orderNumbers - 1)}}>-</button></p>
        </div>
    </>
  );
}

export default ProductCard