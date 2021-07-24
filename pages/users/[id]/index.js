import { useRouter } from 'next/router'
import Link from 'next/link'

export default function UserPage() {
  const router = useRouter()
  const { id } = router.query

  if( !id ) return <div> Not found</div>

  return (
    <div className="container box">

      <Link href={`/users/${id}/register`}>
        <a>アカウントを編集</a>
      </Link>
    </div>
  )
}
