import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name = 'SpanStay', type = 'website', image, noindex = false }) => {
  const siteTitle = title ? `${title} | SpanStay` : 'SpanStay - Premium Hotel Bookings in India';
  const siteDescription = description || 'Your trusted partner for booking premium stays across India. Experience comfort and luxury wherever you go.';

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name='description' content={siteDescription} />

      <meta property='og:type' content={type} />
      <meta property='og:title' content={siteTitle} />
      <meta property='og:description' content={siteDescription} />
      {image && <meta property='og:image' content={image} />}
      <meta property='og:site_name' content={name} />

      <meta name='twitter:card' content={image ? 'summary_large_image' : 'summary'} />
      <meta name='twitter:title' content={siteTitle} />
      <meta name='twitter:description' content={siteDescription} />
      {image && <meta name='twitter:image' content={image} />}

      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default SEO;
