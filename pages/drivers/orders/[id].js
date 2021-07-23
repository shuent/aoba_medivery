import {useRouter} from "next/router"


const DriverOrderTakePage = () => {
    const router = useRouter()
    const {id} = router.query

  return <>order id is{id}</>
}

export default DriverOrderTakePage
