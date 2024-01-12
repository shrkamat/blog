import CopyToClipboard from "@/components/CopyToClipboard";
import Footer from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import ScrollProgress from "@/components/scroll-progress";
import TableExport from "@/components/table-export";
import fs from "fs";
import matter from "gray-matter";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
// import "./github-dark.css";
import "./github.css";
import CodeExport from "@/components/code-export";
import { Metadata, ResolvingMetadata } from "next";
// import "./default.css";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const props = getPost(params);

  return {
    title: props.fontMatter.title,
    description: props.fontMatter.description,
    authors: [props.fontMatter.author],
    keywords: props.fontMatter.tags,
    openGraph: {
      title: props.fontMatter.title,
      description: props.fontMatter.description,
      type: "article",
      images: [props.fontMatter.coverImageSrc],
    },
  };
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
  const highlightWords = props.fontMatter?.highlightWords ?? [];
  return (
    <section className="flex min-h-screen flex-col">
      <article className="pb-8">
        <div className="mb-4 sticky top-0 bg-background h-fit z-10">
          <ScrollProgress />
          <div className="flex justify-between items-center pt-10 px-2 container">
            <div className="flex gap-1 items-center">
              <Link href="/">
                <ArrowLeft className="cursor-pointer" />
              </Link>
              <div className="text-lg font-bold flex items-center gap-2 group ">
                {props.fontMatter.title}
                <CopyToClipboard />
              </div>
            </div>
            <ModeToggle />
          </div>
        </div>

        <div className="container px-8 prose prose-lg dark:prose-invert dark:prose-pre:bg-slate-100 prose-pre:shadow dark:prose-pre:text-slate-800  text-primary p-3 h-full rounded overflow-y-auto prose-pre:shadow-purple-200 break-words">
          <MDXRemote
            options={options}
            source={props.content}
            components={{
              code: (props) => {
                if (highlightWords.includes(props.children)) {
                  return (
                    <code className="mx-1 p-0.5 rounded bg-yellow-100 dark:text-slate-800">
                      {props.children}
                    </code>
                  );
                }
                return <code className="">{props.children}</code>;
              },
              a: (props) => <a target="_blank" {...props} />,
              table: (props) => {
                return (
                  <div className="group flex relative">
                    <table {...props} />
                    <TableExport tableChildren={props.children} />
                  </div>
                );
              },
              pre: (props) => <CodeExport {...props} />,
            }}
          ></MDXRemote>
        </div>
      </article>
      <div className="container">
        <Footer />
      </div>
    </section>
  );
}
