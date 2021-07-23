import { useRouter } from 'next/router'
import Link from 'next/link'

export default function UserPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      user id : {id}
      <p>アカウント情報を編集</p>
      <Link href={`/users/${id}/register`}>
        <a>編集ページへ</a>
      </Link>
    </>
  )
}
