import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO.jsx';
import Section from '../components/ui/Section.jsx';

export default function NotFoundPage() {
  return (
    <Section title="Page not found" description="This route is prepared for future website sections.">
      <SEO title="Page Not Found" description="The requested Grand Royale page was not found." />
      <Link to="/">Return home</Link>
    </Section>
  );
}
