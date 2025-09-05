// src/components/StructuredData.tsx
interface StructuredDataProps {
  type: 'website' | 'article' | 'imageGallery' | 'place' | 'localBusiness' | 'event' | 'breadcrumb' | 'organization'
  data?: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseUrl = 'https://mesia.gr' // Update with your actual domain
    
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Μεσιά Κιλκίς',
          alternateName: 'Mesia Kilkis Village',
          url: baseUrl,
          description: 'Iστοσελίδα του  χωριού Μεσιά Κιλκίς στην Κεντρική Μακεδονία, Ελλάδα',
          inLanguage: 'el-GR',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Μεσιά Κιλκίς',
            url: baseUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/logo.png`
            }
          },
          sameAs: [
            'https://www.facebook.com/mesia.kilkis',
            'https://www.instagram.com/mesia_kilkis'
          ]
        }

      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Μεσιά Κιλκίς',
          description: 'Xωριό της Κεντρικής Μακεδονίας με πλούσια ιστορία και παράδοση',
          url: baseUrl,
          telephone: data?.phone || '+30-xxx-xxxxxxx',
          email: data?.email || 'info@mesia.gr',
          address: {
            '@type': 'PostalAddress',
            streetAddress: data?.address || 'Μεσιά',
            addressLocality: 'Μεσιά',
            addressRegion: 'Κιλκίς',
            postalCode: '61100',
            addressCountry: 'GR'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '40.8825',
            longitude: '22.5764'
          },
          openingHours: data?.openingHours || ['Mo-Su 00:00-23:59'],
          priceRange: data?.priceRange || '€',
          image: data?.image || `${baseUrl}/images/village-main.jpg`,
          logo: `${baseUrl}/images/logo.png`,
          sameAs: [
            'https://www.facebook.com/mesia.kilkis',
            'https://www.instagram.com/mesia_kilkis'
          ],
          aggregateRating: data?.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating.value,
            reviewCount: data.rating.count,
            bestRating: '5',
            worstRating: '1'
          } : undefined
        }

      case 'place':
        return {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: 'Μεσιά Κιλκίς',
          alternateName: ['Mesia Kilkis', 'Μεσιά'],
          description: 'Xωριό της Κεντρικής Μακεδονίας με 173 κατοίκους και πλούσια ιστορική κληρονομιά',
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
            name: 'Κεντρική Μακεδονία',
            containedInPlace: {
              '@type': 'Country',
              name: 'Ελλάδα'
            }
          },
          hasMap: `https://www.google.com/maps/place/40.8825,22.5764`,
          photo: data?.photos || [`${baseUrl}/images/village-aerial.jpg`],
          touristType: ['Cultural Tourism', 'Rural Tourism', 'Historical Tourism']
        }

      case 'event':
        return {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: data?.name || 'Εκδήλωση Μεσιάς Κιλκίς',
          description: data?.description || 'Παραδοσιακή εκδήλωση στο χωριό Μεσιά Κιλκίς',
          startDate: data?.startDate,
          endDate: data?.endDate,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: data?.attendanceMode || 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: data?.locationName || 'Πλατεία Μεσιάς',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Μεσιά',
              addressRegion: 'Κιλκίς',
              addressCountry: 'GR'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '40.8825',
              longitude: '22.5764'
            }
          },
          organizer: {
            '@type': 'Organization',
            name: 'Μεσιά Κιλκίς',
            url: baseUrl
          },
          performer: data?.performer ? {
            '@type': 'Person',
            name: data.performer
          } : undefined,
          offers: data?.offers ? {
            '@type': 'Offer',
            price: data.offers.price || '0',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/events/${data.slug}`
          } : undefined,
          image: data?.image || `${baseUrl}/images/events-default.jpg`,
          isAccessibleForFree: data?.isFree !== false
        }

      case 'imageGallery':
        return {
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: data?.name || 'Γκαλερί Φωτογραφιών - Μεσιά Κιλκίς',
          description: data?.description || 'Φωτογραφίες από το παραδοσιακό χωριό Μεσιά Κιλκίς, εκδηλώσεις και καθημερινή ζωή',
          url: `${baseUrl}/photos`,
          image: data?.images || [`${baseUrl}/images/gallery-cover.jpg`],
          author: {
            '@type': 'Organization',
            name: 'Μεσιά Κιλκίς',
            url: baseUrl
          },
          publisher: {
            '@type': 'Organization',
            name: 'Μεσιά Κιλκίς',
            url: baseUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/logo.png`
            }
          },
          contentLocation: {
            '@type': 'Place',
            name: 'Μεσιά Κιλκίς',
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '40.8825',
              longitude: '22.5764'
            }
          },
          associatedMedia: data?.media || []
        }

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data?.items?.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          })) || []
        }

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Μεσιά Κιλκίς',
          alternateName: 'Mesia Kilkis Community',
          description: 'Ιστοσελίδα του χωριού Μεσιά Κιλκίς στην Κεντρική Μακεδονία',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo.png`,
            width: 600,
            height: 200
          },
          image: `${baseUrl}/images/village-header.jpg`,
          telephone: data?.phone,
          email: data?.email,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Μεσιά',
            addressRegion: 'Κιλκίς', 
            addressCountry: 'GR',
            postalCode: '61100'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '40.8825',
            longitude: '22.5764'
          },
          foundingDate: data?.foundingDate,
          sameAs: [
            'https://www.facebook.com/mesia.kilkis',
            'https://www.instagram.com/mesia_kilkis'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: data?.phone,
            contactType: 'customer service',
            availableLanguage: ['Greek', 'English']
          }
        }

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.title || 'Άρθρο από Μεσιά Κιλκίς',
          description: data?.description,
          image: data?.image || `${baseUrl}/images/article-default.jpg`,
          datePublished: data?.publishedDate,
          dateModified: data?.modifiedDate || data?.publishedDate,
          author: {
            '@type': 'Person',
            name: data?.authorName || 'Μεσιά Κιλκίς'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Μεσιά Κιλκίς',
            url: baseUrl,
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/images/logo.png`
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data?.url || baseUrl
          },
          articleSection: data?.category || 'Χωριό',
          wordCount: data?.wordCount,
          inLanguage: 'el-GR',
          about: {
            '@type': 'Place',
            name: 'Μεσιά Κιλκίς'
          }
        }

      default:
        return null
    }
  }

  const schema = generateSchema()
  
  if (!schema) return null

  // Sanitize the JSON to prevent XSS attacks (Next.js recommendation)
  const sanitizedSchema = JSON.stringify(schema).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizedSchema }}
    />
  )
}
