const Footer = () => {
  return (
    <footer className="border-t mt-auto py-3 bg-dark">
      <div className="flex justify-between">
        <p className="text-light text-sm">
          © 2024 by The Vignesh Iyer Blog. All rights reserved.
        </p>
        <a
          className="text-light text-sm hover:underline"
          href="https://twitter.com/IyerVigneshR"
          target="_blank"
          rel="noreferrer noopener"
        >
          Let's talk!
        </a>
      </div>
    </footer>
  );
};

export default Footer;
