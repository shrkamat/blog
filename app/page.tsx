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
import Link from "next/link";
import path from "path";

export default function Home({ searchParams }) {
  const blogDir = "blogs";

  const files = fs.readdirSync(path.join(blogDir));

  const blogs = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");

    const { data: frontMatter } = matter(fileContent);
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });
  console.log({ searchParams });
  return (
    <main className="container pt-10 flex min-h-screen flex-col bg-background max-w-[1200px]">
      <header className="h-10 flex justify-between">
        <div className="underline text-2xl">Vignesh Iyer</div>
        <ModeToggle />
      </header>
      <br />
      <section>
        <h1 className="text-lg font-bold mb-2">Blogs</h1>
        <div className="py-2 flex flex-col gap-4">
          {blogs.map((blog) => (
            <Link href={"/" + blog.slug} passHref key={blog.slug}>
              <Card className="hover:outline hover:outline-purple-100 hover:shadow bg-purple-50 dark:bg-gradient-to-l dark:from-purple-400 dark:to-purple-600 shadow dark:shadow-purple-800">
                <CardHeader className="p-4">
                  <CardTitle>{blog.meta.title}</CardTitle>
                  <CardDescription>{blog.meta.date}</CardDescription>
                </CardHeader>
                <CardContent className="px-4">
                  <p>{blog.meta.description}</p>
                </CardContent>
                <CardFooter className="flex gap-2 px-4 overflow-x-hidden pt-1">
                  {blog.meta.tags.map((tag, index) => {
                    return (
                      <Badge
                        key={index}
                        variant={"outline"}
                        className="outline outline-1"
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
