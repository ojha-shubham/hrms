import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="eyebrow blue">404</span>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link className="submit link-button" to="/dashboard">
        Back to dashboard
      </Link>
    </main>
  );
}
