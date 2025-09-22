const SEO = {
  title: 'Μεσιά Κιλκίς - Χωριό της Κεντρικής Μακεδονίας',
  description: 'Ιστοσελίδα για το χωριό Μεσιά Κιλκίς. Ανακαλύψτε την ιστορία, τις εκδηλώσεις και τις φωτογραφίες του παραδοσιακού μας χωριού στη Μακεδονία.',
  canonical: 'https://mesia.gr',
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: 'https://mesia.gr',
    siteName: 'Μεσιά Κιλκίς',
    title: 'Μεσιά Κιλκίς - Χωριό της Κεντρικής Μακεδονίας',
    description: 'Ιστοσελίδαγια το χωριό Μεσιά Κιλκίς. Ανακαλύψτε την ιστορία, τις εκδηλώσεις και τις φωτογραφίες του παραδοσιακού μας χωριού.',
    images: [
      {
        url: 'https://mesia.gr/images/mesia-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Μεσιά Κιλκίς - Χωριό στη Μακεδονία',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    handle: '@mesia_kilkis',
    site: '@mesia_kilkis',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'Μεσιά, Κιλκίς, χωριό, Μακεδονία, Ελλάδα, παράδοση, ιστορία, εκδηλώσεις, φωτογραφίες'
    },
    {
      name: 'author',
      content: 'Μεσιά Κιλκίς'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'robots',
      content: 'index,follow'
    },
    {
      name: 'geo.region',
      content: 'GR-61'
    },
    {
      name: 'geo.placename',
      content: 'Μεσιά, Κιλκίς, Ελλάδα'
    }
  ],
}

export default SEO
