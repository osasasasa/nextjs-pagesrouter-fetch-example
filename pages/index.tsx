// // SSG
// import Link from 'next/link';
// import { GetStaticProps } from 'next';

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// interface HomeProps {
//   posts: Post[];
// }

// export default function Home({ posts }: HomeProps) {
//   return (
//     <div>
//       <h1>Blog Posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <Link href={`/posts/${post.id}`}>
//               {post.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const posts: Post[] = await res.json();
//   return {
//     props: {
//       posts: posts.slice(0, 5), // 最初の5件のみを取得
//     },
//   };
// }


// ISR
import Link from 'next/link';
import { GetStaticProps } from 'next';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface HomeProps {
  posts: Post[];
  lastUpdated: string;
}

export default function Home({ posts, lastUpdated }: HomeProps) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <p>Last updated: {lastUpdated}</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();
  return {
    props: {
      posts: posts.slice(0, 5), // 最初の5件のみを取得
      lastUpdated: new Date().toISOString(),
    },
    revalidate: 10, // 10秒ごとに再検証
  };
}