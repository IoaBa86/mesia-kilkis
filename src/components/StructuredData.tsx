// src/components/StructuredData.tsx
interface StructuredDataProps {
  type: 'website' | 'article' | 'imageGallery' | 'place'
  data?: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseUrl = 'https://mesia-kilkis.gr' // Replace with your domain
    
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Μεσιά Κιλκίς',
          alternateName: 'Mesia Kilkis',
          url: baseUrl,
          description: 'Παραδοσιακό χωριό της Κεντρικής Μακεδονίας στην Περιφερειακή Ενότητα Κιλκίς',
          inLanguage: 'el-GR',
          author: {
            '@type': 'Organization',
            name: 'Μεσιά Κιλκίς'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Μεσιά Κιλκίς'
          }
        }
      
      case 'place':
        return {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: 'Μεσιά Κιλκίς',
          alternateName: 'Mesia Kilkis',
          description: 'Παραδοσιακό χωριό της Κεντρικής Μακεδονίας με 173 κατοίκους',
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '40.8825',
            longitude: '22.5764'
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Μεσιά',
            addressRegion: 'Κιλκίς',
            addressCountry: 'GR',
            postalCode: '61100'
          },
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: 'Κεντρική Μακεδονία'
          }
        }

      case 'imageGallery':
        return {
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Γκαλερί Φωτογραφιών - Μεσιά Κιλκίς',
          description: 'Φωτογραφίες από το παραδοσιακό χωριό Μεσιά Κιλκίς',
          url: `${baseUrl}/photos`,
          author: {
            '@type': 'Organization',
            name: 'Μεσιά Κιλκίς'
          }
        }

      default:
        return null
    }
  }

  const schema = generateSchema()
  
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
