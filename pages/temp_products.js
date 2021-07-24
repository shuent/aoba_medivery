import { takeOrder } from "../usecases/takeOrder"

export default function TemporalProductsPage() {

    const handleClick = ()=>{
        // this is example to use takeOrder()
        const userId = "BZlUBvQz7tRRuT50yaIOS86AiPl2" // should be currentUser id
        // Array of orderId, quantity
        const productsOrderd=[
            { id: '4Ag3lr2e8R1Vg5UAqEBm', quantity: 2 },
            { id: '5hcgmkwITaWHesmp81ry', quantity: 1 },
          ]
        takeOrder(userId, productsOrderd)
    }

  return <button onClick={handleClick}>submit order</button>
}
