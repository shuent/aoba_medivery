import Head from "next/head";
import { useRouter } from "next/router";

import stylesForm from "../styles/form.module.css";
import styles from "../styles/Home.module.css";
import Link from 'next/link'
import { AuthContext } from "../hooks/useAuth";
import { useContext, useEffect, useState } from "react";

export default function AppForm() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  //第二段階
  const Headache = [
    {symptop:'熱もある', tag:'headache1'},
    {symptop:'頭が重い', tag:'headache2'},
    {symptop:'頭がズキズキする', tag:'headache3'},
  ]

  const Fever = [
    {symptop:'とにかく熱がひどい', tag:'fever1'},
    {symptop:'頭痛・喉の痛みがする', tag:'fever2'},
    {symptop:'くしゃみ・鼻水が止まらない', tag:'fever3'},
    {symptop:'せきが止まらない', tag:'fever4'},
  ]

  const StomachAche = [
    {symptop:'胃がキリキリする', tag:'stomach'},
    {symptop:'お腹の調子が悪い', tag:'colon1'},
    {symptop:'下痢がする', tag:'colon2'},
  ]

  const Menstruation = [
    {symptop:'生理痛', tag:'cramp'},
  ]

  const Symptoms = [
    {symptop:'頭痛', secondStage:Headache},
    {symptop:'熱', secondStage:Fever},
    {symptop:'胃痛・腹痛', secondStage:StomachAche},
    {symptop:'生理痛', secondStage:Menstruation},
  ]

  const [state, setState] = useState({first: Symptoms[0].symptop, secondTag: undefined})
  const [secondState, setSecondState] = useState(Headache)

  const handleFirstChecked = (e) => {

    setState({first: e.target.value})
    setSecondState(selectSecondView(e.target.value))
  }

  const handleSecondChecked = (e) => {

    setState({...state, secondTag: e.target.value})
  }


  const selectSecondView = (firstSymptop) =>{
    return Symptoms.find(first=>first.symptop === firstSymptop).secondStage
  }

  useEffect(() => {
    if (currentUser === null) {
      router.push('/')
    }
  }, [currentUser])

  return (
    <div>
      <Head>
        <title>最適な商品を診断します</title>
      </Head>
      <div style={{width: "100%"}}>
      <main className={stylesForm.container}>
      {/* <main className="container box"> */}
        <h1 className="title">最適な商品を診断します</h1>
        <p style={{marginBottom: "32px"}}>当てはまる症状を選択してください。</p>

        <div className="box">
          <div style={{marginBottom: "32px"}}>
            <h2 className="title is-5 has-text-primary">症状を選択</h2>
            <ul>
              {Symptoms.map((value, index) => (
                <li key={index}>
                  <label>
                    <input
                      className={stylesForm.inputSize}
                      type="radio"
                      name="q1"
                      value={value.symptop}
                      defaultChecked={index===0}
                      onChange={handleFirstChecked}
                    />
                    {value.symptop}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div >
            <h2 className="title is-5 has-text-primary">詳しい症状</h2>
            <ul>
              {secondState.map((value, index) => (
                <li key={index}>
                  <label>
                    <input
                      className={stylesForm.inputSize}
                      type="radio"
                      name="q2"
                      value={value.tag}
                      onChange={handleSecondChecked}
                    />
                    {value.symptop}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div >
          <Link href={{pathname: '/products', query: {tag: state.secondTag}}}>
            <button
              className="button is-primary"
              type="submit"
              disabled={!state.secondTag}
            >
            決定
            </button>
          </Link>
        </div>
      </main>
      </div>

      <footer className={styles.footer}>Powered by Aoba</footer>
    </div>
  );
} 