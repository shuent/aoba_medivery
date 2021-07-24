import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../../../hooks/useAuth'
import { useContext } from 'react'
import { setUserInfo } from '../../../repository/userRepository'
import Head from 'next/head'

export default function UserRegister() {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  const { id } = router.query
  const [state, setState] = useState({
    address: '',
    born_year: '2004',
    pay_method: 'cash',
    cardnumber: '',
  })

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentUser) {
      const uid = currentUser.uid
      const userData = {
        ...state,
        displayName: currentUser.displayName,
        email: currentUser.email,
      }
      setUserInfo(uid, userData).then((docRef) => {
        router.push({ pathname: '/users/[id]', query: { id: uid } })
      })
    }
  }

  useEffect(() => {
    if (currentUser === null) {
      router.push('/')
    }
  }, [currentUser])

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
        />
      </Head>
      <div
        style={{ paddingTop: '48px' }}
      ></div>
      <form className="box" onSubmit={handleSubmit} style={{ paddingTop: '48px', maxWidth: '425px', margin: '0 auto' }}>
        <div className="field">
          <label className="label" htmlFor="address">
            {' '}
            住所
          </label>
          <div class="control">
            <input
              className="input"
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="born_year">
            生まれ年（西暦）
          </label>
          <div class="control">
            <input
              className="input"
              type="number"
              id="born_year"
              name="born_year"
              defaultValue={2004}
              onChange={handleChange}
            />
          </div>
        </div>

        <p>支払いタイプ</p>
        <div className="field">
          <div class="control">
            <label className="label" htmlFor="credit_card">
              <input
                type="radio"
                id="credit_card"
                value="credit_card"
                name="pay_method"
                onChange={handleChange}
                style={{ paddingRight: '8px' }}
              />
              クレジットカード
            </label>
            <label className="label" htmlFor="cash">
              <input
                type="radio"
                id="cash"
                value="cash"
                name="pay_method"
                defaultChecked={true}
                onChange={handleChange}
                style={{ paddingRight: '8px' }}
              />
              現金
            </label>
            <label className="label" htmlFor="convini">
              <input
                type="radio"
                id="convini"
                value="convini"
                name="pay_method"
                defaultChecked={true}
                onChange={handleChange}
                style={{ paddingRight: '8px' }}
              />
              コンビニ支払い
            </label>
          </div>
        </div>
        <div className="field">
          <div class="control">
            <label htmlFor="ccnum" className="label">カード番号</label>
            <input
              type="tell"
              id="ccnum"
              name="cardnumber"
              placeholder="0000 0000 0000 0000"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div class="control">
            <input className="button" type="submit" />
          </div>
        </div>
      </form>
    </>
  )
}
