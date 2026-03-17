export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <span>&copy; {year} Yash Suman</span>
      <div className="footer-links">
        <a
          href="https://www.linkedin.com/in/yash-raj-suman/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/yashsuman15"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://x.com/yashsuman69"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </div>
    </footer>
  );
}
