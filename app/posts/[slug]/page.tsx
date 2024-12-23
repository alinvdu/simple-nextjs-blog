import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowLeft from '../../../components/icons/ArrowLeft';
import { getPost } from '../../../lib/cosmic';
import { getRelatedPosts } from '../../../lib/cosmic';
import SuggestedPostCard from '../../../components/SuggestedPostCard';
import Tag from '../../../components/Tag';
import AuthorAvatar from '../../../components/AuthorAvatar';
import AuthorAttribution from '../../../components/AuthorAttribution';
import { sanitize } from 'isomorphic-dompurify';
import CodeBlock from "./codeblock";

const MailchimpForm = () => {
  return (
    <div id="mc_embed_shell">
      <link
        href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
        rel="stylesheet"
        type="text/css"
      />
      <style>{`
        #mc_embed_signup {
          background: #000;
          color: #fff;
          clear: left;
          font: 14px Helvetica, Arial, sans-serif;
          width: 600px;
        }
        #mc_embed_signup h2,
        #mc_embed_signup .indicates-required,
        #mc_embed_signup label {
          color: #fff;
        }
        #mc_embed_signup input[type="email"],
        #mc_embed_signup input[type="text"],
        #mc_embed_signup input[type="submit"] {
          background: #333;
          color: #fff;
          border: 1px solid #666;
        }
        #mc_embed_signup input[type="submit"] {
          background: #555;
          border: 1px solid #777;
          color: #fff;
          cursor: pointer;
        }
        #mc_embed_signup input[type="submit"]:hover {
          background: #777;
        }
        .response {
          color: #fff;
        }
        a {
          color: #00f;
        }
        .refferal_badge {
          background-color: #000;
        }
      `}</style>
      <div id="mc_embed_signup">
        <form
          action="https://cogitomachina.us11.list-manage.com/subscribe/post?u=ddca95e547b5b94c61e581877&amp;id=1cf140bb69&amp;f_id=004d0fe1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe</h2>
            <div className="indicates-required">
              <span className="asterisk">*</span> indicates required
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">
                Email Address <span className="asterisk">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                className="required email"
                id="mce-EMAIL"
                required
                defaultValue=""
              />
            </div>
            <div id="mce-responses" className="clear foot">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-5000px" }}
            >
              <input
                type="text"
                name="b_ddca95e547b5b94c61e581877_1cf140bb69"
                tabIndex="-1"
                defaultValue=""
              />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                  value="Subscribe"
                />
                <p style={{ margin: "0px auto" }}>
                  <a
                    href="http://eepurl.com/i6J8VA"
                    title="Mailchimp - email marketing made easy and fun"
                  >
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "black",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        className="refferal_badge"
                        src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-light.svg"
                        alt="Intuit Mailchimp"
                        style={{
                          width: "220px",
                          height: "40px",
                          display: "flex",
                          padding: "2px 0px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <script
        type="text/javascript"
        src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
      ></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function($) {
              window.fnames = new Array();
              window.ftypes = new Array();
              fnames[0] = 'EMAIL';
              ftypes[0] = 'email';
              fnames[1] = 'FNAME';
              ftypes[1] = 'text';
              fnames[2] = 'LNAME';
              ftypes[2] = 'text';
              fnames[3] = 'ADDRESS';
              ftypes[3] = 'address';
              fnames[4] = 'PHONE';
              ftypes[4] = 'phone';
              fnames[5] = 'BIRTHDAY';
              ftypes[5] = 'birthday';
              fnames[6] = 'COMPANY';
              ftypes[6] = 'text';
            }(jQuery));
            var $mcj = jQuery.noConflict(true);
          `,
        }}
      ></script>
    </div>
  );
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost({ params });
  return {
    title: `${post.title}`,
  };
}

const containsCode = (data: string) => {
  if (data.includes('```python') || data.includes('```javascrippt')) {
    return true
  }

  return false
}

const parseContent = (post: string) => {
  const regex = /```python(.*?)```/gms;
  let result = [];
  let lastIndex = 0;

  // Extract text and code alternately
  post.replace(regex, (match, code, index) => {
    const text = post.slice(lastIndex, index);
    lastIndex = index + match.length;
    result.push({ type: 'text', content: text });
    result.push({ type: 'code', content: code.trim() });
    return match;
  });

  // Add any remaining text after the last code block
  if (lastIndex < post.length) {
    result.push({ type: 'text', content: post.slice(lastIndex) });
  }

  return result;
};

const renderContent = (post: string) => {
  const content = parseContent(post);
  return content.map((item, index) => {
    if (item.type === 'text') {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: sanitize(item.content) ?? '',
          }}
        ></div>
      );
    } else if (item.type === 'code') {
      return (
        <CodeBlock code={item.content} index={index} />
      )
    }
  });
}

export default async ({ params }: { params: { slug: string } }) => {
  const post = await getPost({ params });
  const suggestedPosts = await getRelatedPosts({ params });

  return (
    <>
      {post && post.metadata.hero?.imgix_url && (
        <Image
          width={1400}
          height={720}
          className="mb-5 h-[720px] w-full bg-no-repeat object-cover object-center"
          src={`${post.metadata.hero?.imgix_url}?w=1400&auto=format`}
          priority
          alt={post.title}
          placeholder="blur"
          blurDataURL={`${post.metadata.hero?.imgix_url}?auto=format,compress&q=1&blur=500&w=2`}
        />
      )}
      <main className="mx-auto flex flex-col justify-center">
        <div className="mx-auto flex w-full flex-col items-start justify-center px-4 md:flex-row">
          <div className="mt-4 flex justify-start pb-4 md:justify-center md:pb-0 md:pr-20">
            <Link
              href="/"
              className="rounded-full border border-zinc-100 bg-white p-2 text-zinc-700 shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="mr-20 flex w-full max-w-5xl flex-col justify-start md:w-3/4">
            <h2>
              {!post && <div className="text-center">Post Not found</div>}
              {post && <Link href={`/posts/${post.slug}`}>{post.title}</Link>}
            </h2>
            {post && (
              <>
                <div className="flex flex-col justify-between space-y-4 pb-8 md:flex-row md:space-y-0">
                  <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400 md:space-y-0">
                    <AuthorAvatar post={post} />
                    <AuthorAttribution post={post} />
                  </div>
                  <div className="flex select-none justify-start space-x-2 md:justify-end">
                    {post.metadata.categories &&
                      post.metadata.categories.map((category) => (
                        <Tag key={category.title}>{category.title}</Tag>
                      ))}
                  </div>
                </div>
                <hr className="w-full border-t border-zinc-300 pb-8 dark:border-zinc-700" />
                {containsCode(post.metadata.content) ? renderContent(post.metadata.content) : (
                  <div
                  dangerouslySetInnerHTML={{
                    __html: sanitize(post.metadata.content) ?? '',
                  }}
                ></div>
                )}
              </>
            )}
            <div className="mx-auto mt-8 w-full">
              <hr className="w-full border-t border-zinc-300 pb-8 dark:border-zinc-700" />
              <h3 className="pb-3 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                Subscribe to articles like this
              </h3>
              <MailchimpForm />
            </div>
            <div className="mx-auto mt-8 w-full">
              <hr className="w-full border-t border-zinc-300 pb-8 dark:border-zinc-700" />
              {suggestedPosts && suggestedPosts.length && (
                <div className="flex w-full flex-col">
                  <h3 className="pb-3 text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                    Suggested Posts
                  </h3>
                  <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    {suggestedPosts
                      // .filter((nextPost) => nextPost?.id !== post?.id)
                      .slice(0, 2)
                      .map((post) => {
                        return <SuggestedPostCard key={post.id} post={post} />;
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export const revalidate = 60;
