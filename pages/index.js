import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { useQuery, gql } from "@apollo/client";
// import PostForm from "../components/AddPost";

const POSTS_QUERY = gql`
  query MyQuery {
    postsConnection {
      edges {
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(POSTS_QUERY);

  if (error) {
    return <p>Error loading posts</p>;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {/* <PostForm /> */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.postsConnection.edges.map((post, index) => (
              <PostCard post={post.node} key={post.title} />
            ))
          )}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
