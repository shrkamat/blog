const Footer = () => {
  return (
    <footer className="border-t mt-auto py-3 bg-dark">
      <div className="flex justify-between">
        <p className="text-light text-sm">
          © 2024 by The Your Name Blog. All rights reserved.
        </p>
        <a
          className="text-light text-sm hover:underline"
          href="#" // Add your social media URL here
          target="_blank"
          rel="noreferrer noopener"
        >
          Let&apos;s talk!
        </a>
      </div>
    </footer>
  );
};

export default Footer;
