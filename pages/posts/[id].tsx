// // SSG
// import { GetStaticProps, GetStaticPaths } from 'next';

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// interface PostProps {
//   post: Post;
// }

// export default function Post({ post }: PostProps) {
//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.body}</p>
//     </div>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const posts: Post[] = await res.json();
//   const paths = posts.slice(0, 5).map((post) => ({
//     params: { id: post.id.toString() },
//   }));
//   return { paths, fallback: false };
// }

// export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
//   if (!params?.id) {
//     return { notFound: true };
//   }
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
//   const post: Post = await res.json();
//   return { props: { post } };
// }

// ISR
import { GetStaticProps, GetStaticPaths } from 'next';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostProps {
  post: Post;
  lastUpdated: string;
}

export default function Post({ post, lastUpdated }: PostProps) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Last updated: {lastUpdated}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();
  const paths = posts.slice(0, 5).map((post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true };
  }
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  const post: Post = await res.json();
  return { 
    props: { 
      post,
      lastUpdated: new Date().toISOString(),
    },
    revalidate: 10, // 10秒ごとに再検証
  };
}