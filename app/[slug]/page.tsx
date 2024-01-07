import fs from "fs";
import matter from "gray-matter";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import path from "path";

import remarkGfm from "remark-gfm";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blogs", slug + ".mdx"),
    "utf-8"
  );

  const { data: fontMatter, content } = matter(markdownFile);

  return {
    fontMatter,
    slug,
    content,
  };
}

export default function Page({ params }: any) {
  const props = getPost(params);

  return (
    <section className="flex min-h-screen flex-col container pt-10 px-20">
      <article className="pb-8">
        <div className="flex gap-1 items-center mb-4 sticky top-0 bg-background h-10">
          <Link href="/">
            <ArrowLeft className="cursor-pointer" />
          </Link>
          <div className="text-lg font-bold">{props.fontMatter.title}</div>
        </div>

        <div className="prose prose-lg dark:prose-invert dark:prose-pre:bg-slate-100 prose-pre:shadow dark:prose-pre:text-slate-800  text-primary p-3 h-full rounded overflow-y-auto ">
          <MDXRemote options={options} source={props.content}></MDXRemote>
        </div>
      </article>
    </section>
  );
}
