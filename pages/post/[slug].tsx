import Header from '../../components/Header'
import { sanityClient, urlFor } from '../sanity'

const Post = () => {
  return (
    <main>
      <Header />
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
        _id,
        slug{
          current
        }
      }`
  const posts = await sanityClient.post.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {slug.post.current},
  }))
  return {
      paths,
      fallback: 'blocking',
  }
}
