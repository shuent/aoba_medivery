import Head from "next/head";
import stylesForm from "../styles/form.module.css";
import styles from "../styles/Home.module.css";
import React, { useState } from 'react';
import Link from 'next/link'

export default function AppForm() {

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

  const SecondStage = [
    Headache,
    Fever,
    StomachAche,
    Menstruation
  ]

  const FirstStage = [
    {symptop:'頭痛', secondStage:Headache},
    {symptop:'熱', secondStage:Fever},
    {symptop:'胃痛・腹痛', secondStage:StomachAche},
    {symptop:'生理痛', secondStage:Menstruation},
  ]

  const [state, setState] = useState(FirstStage[0].symptop)
  const [stateSecond, setStateSecond] = useState(SecondStage[0][0].symptop)

  const handleFirstChecked = (e) => {
    setState(e.target.value)
  }

  const handleSecondChecked = (e) => {
    setStateSecond(e.target.value)
  }

  const secondView = () => {
    const index = FirstStage.findIndex(item => item.symptop === state)
    // console.log(index)
    const result = SecondStage[index]
    // console.log(result)
    return result
  }

  const handleTag = () => {
    console.log(stateSecond)
    const index = secondView().findIndex(item => item.symptop === stateSecond)
    console.log(index)
    const result = secondView()[index].tag
    // console.log(result)
    return result
  }

  return (
    <div>
      <Head>
        <title>診断</title>
      </Head>

      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">
            Medivery
          </p>
          <p className="subtitle">
            体調が悪いときのデリバリー
          </p>
        </div>
      </section>

      <main className={stylesForm.container}>
        <h1 className="title">診断</h1>
        <p>当てはまる症状を選択してください。</p>

        <div>
          <div className="section">
            <h2 className="has-text-primary has-text-weight-bold">症状を選択</h2>
            <ul>
              {FirstStage.map((value, index) => (
                <li key={index}>
                  <label>
                    <input
                      className={stylesForm.inputSize}
                      type="radio"
                      name="q1"
                      value={value.symptop}
                      defaultChecked={index === 0}
                      onChange={handleFirstChecked}
                    />
                    {value.symptop}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className={`section ${stylesForm.section2}`}>
            <h2 className="has-text-primary has-text-weight-bold">詳しい症状</h2>
            <ul>
              {secondView().map((value, index) => (
                <li key={index}>
                  <label>
                    <input
                      className={stylesForm.inputSize}
                      type="radio"
                      name="q2"
                      value={value.symptop}
                      defaultChecked={index === 0}
                      onChange={handleSecondChecked}
                    />
                    {value.symptop}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`section ${stylesForm.section2}`}>
          <Link href={{pathname: './products', query: {tag:handleTag()}}}>
            <button
              className="button is-vcentered"
              type="submit"
              value={secondView().tag}
            >
            決定
            </button>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>Powered by Aoba</footer>
    </div>
  );
} 