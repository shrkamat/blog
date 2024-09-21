# Next.js Blog Template with MDX

This template provides a feature-rich starting point for creating a blog using Next.js and MDX. It includes several out-of-the-box features to enhance the blogging experience.

## Features

- **MDX-driven blog management**: Easily create and manage blog posts using MDX files.
- **Code Copy**: Allow readers to copy code snippets with a single click.
- **Table Export**: Enable exporting of tables to CSV format.
- **Keyword Highlighting**: Automatically highlight important keywords in your blog posts.
- **Blog Filtering**: Implement a filtering system to help readers find relevant content.
- **Sitemap Generation**: Automatically generate a sitemap for better SEO.
- **Robots.txt**: Customize search engine crawling with a pre-configured robots.txt file.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/nextjs-blog-template.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nextjs-blog-template
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. **Starting the development server**:
   ```bash
   npm run dev
   ```
   This will start the development server at `http://localhost:3000`.

2. **Creating blog posts**:
   - Add new MDX files to the `blogs/` directory.
   - Use the `.blog.mdx` extension for your blog post files.
   - Example: `blogs/my-new-post.blog.mdx`

3. **Customizing the layout**:
   - Edit `app/page.tsx` to modify the main page layout.
   - Adjust `components/footer.tsx` to customize the footer.

4. **Configuring blog filtering**:
   - Modify `components/blog-filter.tsx` to adjust filtering options.

5. **SEO optimization**:
   - Update `app/sitemap.ts` to customize sitemap generation.
   - Edit `app/robots.ts` to adjust search engine crawling rules.

6. **Styling**:
   - Use the `components.json` file to configure Tailwind CSS and other styling options.

7. **Building for production**:
   ```bash
   npm run build
   ```

8. **Starting the production server**:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
