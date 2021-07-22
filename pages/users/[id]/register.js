import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {AuthContext} from '../../../hooks/useAuth'
import {useContext} from 'react'

export default function UserRegister() {

  const { currentUser } = useContext(AuthContext)
  const router = useRouter();
  const { id } = router.query;
  const [state, setState] = useState({
    address: "",
    born_year: "2004",
    pay_method: "cash",
    cardnumber: "",
  })

  const handleChange = (e) =>{
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(state)
    // TODO: register user info db
  };

  
  useEffect(() => {
    if (currentUser === null) {
      // TODO: or if not curernt user
      router.push('/login')
    }
  }, [currentUser])


  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <label htmlFor="address"> 住所</label>
            <input type="text" id="address" name="address" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="born_year">生まれ年（西暦）</label>
            <input type="number" id="born_year" name="born_year" defaultValue={2004} onChange={handleChange} />
          </div>
        </fieldset>
        <fieldset>
          <p>支払いタイプ</p>
          <div>
            <input
              type="radio"
              id="credit_card"
              value="credit_card"
              name="pay_method"
              onChange={handleChange}
            />
            <label htmlFor="credit_card">クレジットカード</label>
            <input
              type="radio"
              id="cash"
              value="cash"
              name="pay_method"
              defaultChecked={true}
              onChange={handleChange}
            />
            <label htmlFor="cash">現金</label>
          </div>
          <div>
            <label htmlFor="ccnum">カード番号</label>
            <input type="tell" id="ccnum" name="cardnumber" placeholder="0000 0000 0000 0000" onChange={handleChange} />
          </div>
        </fieldset>

        <input type="submit" />
      </form>
    </>
  );
}
