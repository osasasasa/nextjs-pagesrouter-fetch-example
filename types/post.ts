export interface Post {
  id: number;
  title: string;
  content: string;
}

export const posts: Post[] = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
  { id: 3, title: "Third Post", content: "This is the third post." },
  { id: 4, title: "Fourth Post", content: "This is the fourth post." },
  { id: 5, title: "Fifth Post", content: "This is the fifth post." },
];

