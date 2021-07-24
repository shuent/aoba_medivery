import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from "next/head";

export default function UserPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />
      </Head>
      
      user id : {id}
      <p>アカウント情報を編集</p>
      <Link href={`/users/${id}/register`}>
        <a>編集ページへ</a>
      </Link>
    </>
  )
}
