import BlogFilter from "@/components/blog-filter";
import Footer from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    images: [
      {
        url: '/avatar.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  // ... other metadata properties
}

export default function Home({ searchParams }) {
  const blogDir = "blogs";
  const searchKey = searchParams.search;
  let files = [];
  try {
    files = fs.readdirSync(path.join(process.cwd(), blogDir));
  } catch (e) {
    throw new Error("File read error");
  }

  const blogs =
    files
      .map((filename) => {
        const fileContent = fs.readFileSync(
          path.join(blogDir, filename),
          "utf-8"
        );

        const { data: frontMatter } = matter(fileContent);
        return {
          meta: frontMatter,
          slug: filename.replace(".mdx", ""),
        };
      })
      ?.filter((blog) => {
        return searchKey
          ? blog.meta.title.toLowerCase().includes(searchKey.toLowerCase())
          : true;
      })
      .sort(function (
        a: { meta: { [key: string]: any }; slug: string },
        b: { meta: { [key: string]: any }; slug: string }
      ) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.meta.date) - new Date(a.meta.date);
      }) ?? [];

  return (
    <main className="container flex pt-10 min-h-screen flex-col bg-background ">
      <header className="h-10 flex justify-between ">
        <div className="text-2xl flex items-center">
          <Image
            src={"/avatar.png"}
            alt="avatar"
            width={40}
            height={40}
            className="h-fit"
          />
          Your Name
        </div>
        <ModeToggle />
      </header>
      <br />
      <section>
        <div className="flex justify-between mb-2 ">
          <h1 className="text-lg font-bold ">Blogs</h1>
          <BlogFilter />
        </div>
        <div className="py-2 flex flex-col gap-6 pb-4">
          {blogs.map((blog) => (
            <Link href={"/" + blog.slug} passHref key={blog.slug}>
              <Card className="hover:outline hover:outline-purple-100 hover:shadow bg-purple-50 dark:bg-gradient-to-l dark:from-purple-400 dark:to-purple-600 shadow dark:shadow-purple-800">
                <CardHeader className="p-4 pb-2">
                  <CardTitle>{blog.meta.title}</CardTitle>
                  <CardDescription>{blog.meta.date}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="line-clamp-3">{blog.meta.description}</p>
                </CardContent>
                <CardFooter className="flex gap-2 px-4 overflow-x-hidden pt-1 flex-wrap">
                  {blog.meta.tags.map((tag, index) => {
                    return (
                      <Badge
                        key={index}
                        variant={"outline"}
                        className="outline outline-1 flex"
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
