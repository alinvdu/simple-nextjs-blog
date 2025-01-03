import React from 'react';
import PostCard from '../components/PostCard';
import { getAllPosts, getAllBits } from '../lib/cosmic';

export default async function Page(): Promise<JSX.Element> {
  const posts = await getAllPosts();
  const bits = await getAllBits();

  return (
    <main className="mx-auto mt-4 w-full max-w-5xl px-4 lg:px-0">
      <section className="flex flex-col space-y-16">
        {!posts && <p>You must add at least one Post to your Bucket</p>}
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="mb-1">
              <PostCard post={post} type="post" />
            </div>
          ))}
      </section>
      <h1 className="text-2xl pb-[0px] font-bold text-white mb-2">Bits - Ideas & Pieces</h1>
      <div className="pb-[20px] text-white">
        Small articles with fast written ideas and bits, containing references to papers, other reading material or videos.
      </div>
      <section className="flex flex-col space-y-16">
        {!bits && <p>You must add at least one Bit to your Bucket</p>}
        {bits &&
          bits.map((bit) => (
            <div key={bit.id} className="mb-1">
              <PostCard post={bit} type="bit" />
            </div>
          ))}
      </section>
    </main>
  );
}

export const revalidate = 60;
