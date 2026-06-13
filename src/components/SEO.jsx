import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, type = "website" }) {
  const siteName = "THE ADS TAG | BEYOND ADS";
  const fullTitle = title === "Home" ? siteName : `${title} | ${siteName}`;
  const domain = "https://theadstag.com"; // Placeholder domain

  // Structured Data for Google (LocalBusiness & Organization)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "THE ADS TAG",
    "image": `${domain}/logo.png`,
    "url": domain,
    "description": description,
    "sameAs": [
      "https://instagram.com/theadstag",
      "https://linkedin.com/company/theadstag",
      "https://twitter.com/theadstag"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`${domain}${url}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${domain}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${domain}${url}`} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${domain}/og-image.jpg`} />

      {/* Canonical URL */}
      <link rel="canonical" href={`${domain}${url}`} />

      {/* Structured JSON-LD Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}
