import React from 'react';
import PostCard from '../components/PostCard';
import { getAllPosts, getAllBits } from '../lib/cosmic';

export default async function Page(): Promise<JSX.Element> {
  const posts = await getAllPosts();
  const bits = await getAllBits();

  return (
    <main className="mx-auto mt-4 w-full max-w-5xl flex-col space-y-16 px-4 lg:px-0">
      <section>
        <h1 className="text-2xl font-bold text-white mb-4">Posts</h1>
        {!posts && <p>You must add at least one Post to your Bucket</p>}
        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <PostCard post={post} />
            </div>
          ))}
      </section>

      <div className="h-2 bg-gray-300 my-8"></div> {/* Subtle divider line */}

      <section>
        <h1 className="text-2xl font-bold text-white mb-4">Bits - Ideas & Pieces</h1>
        {!bits && <p>You must add at least one Bit to your Bucket</p>}
        {bits &&
          bits.map((bit) => (
            <div key={bit.id}>
              <PostCard post={bit} />
            </div>
          ))}
      </section>
    </main>
  );
}

export const revalidate = 60;
