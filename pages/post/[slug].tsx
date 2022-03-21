import { GetStaticProps } from 'next'
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

export const getStaticProps: GetStaticProps = async ({params}) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createAt,
    title,
    author->{
      name,
      image,
    },
    'comments': *[
      _type == "comment" && 
      post.ref == ^._id &&
      approved == true],
      descritption,
      mainImage,
      slug,
      body
  }`

const post = await sanityClient.fetch(query, {
  slug: params?.slug,
})

}
