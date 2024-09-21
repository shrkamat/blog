import { MetadataRoute } from 'next';
import path from "path";
import fs from "fs";
import matter from "gray-matter";

export default function sitemap(): MetadataRoute.Sitemap {
    const blogDir = "blogs";
    let files = [];
    try {
        files = fs.readdirSync(path.join(process.cwd(), blogDir));
    } catch (e) {
        console.error(e);
        return [
            {
                url: ``, // Add your site URL here
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1,
            }
        ]
    }

    return files
        .map((filename) => {
            const fileContent = fs.readFileSync(
                path.join(blogDir, filename),
                "utf-8"
            );

            const { data: frontMatter } = matter(fileContent);
            return {
                url: `{Your-blog-url}/${filename.replace(".mdx", "")}`,
                lastModified: new Date(frontMatter.date),
                changeFrequency: 'weekly',
                priority: 1,
            };
        })

}