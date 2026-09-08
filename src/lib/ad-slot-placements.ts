// Pre-existing <ResponsiveAdSlot slotKey="..."> placements already wired into the pages.
// Keep this in sync with usages of ResponsiveAdSlot across src/app/**.
export interface AdSlotPlacement {
  page: string
  pageLabel: string
  key: string
  position: string
  positionLabel: string
}

export const AD_SLOT_PLACEMENTS: AdSlotPlacement[] = [
  { page: "home", pageLabel: "Αρχική", key: "home-ad-1", position: "after-stats", positionLabel: "Μετά την ενότητα στατιστικών" },
  { page: "home", pageLabel: "Αρχική", key: "home-ad-2", position: "before-footer", positionLabel: "Πριν το footer" },
  { page: "village", pageLabel: "Το Χωριό", key: "village-ad-1", position: "after-intro", positionLabel: "Μετά την εισαγωγή" },
  { page: "village", pageLabel: "Το Χωριό", key: "village-ad-2", position: "before-footer", positionLabel: "Πριν το footer" },
  { page: "photos", pageLabel: "Φωτογραφίες", key: "photos-ad-1", position: "in-page", positionLabel: "Μέσα στη σελίδα" },
  { page: "events", pageLabel: "Εκδηλώσεις", key: "events-ad-1", position: "in-page", positionLabel: "Μέσα στη σελίδα" },
  { page: "access", pageLabel: "Πώς να Έρθετε", key: "access-ad-1", position: "after-map", positionLabel: "Μετά τον χάρτη" },
  { page: "area", pageLabel: "Η Περιοχή", key: "area-ad-1", position: "in-page", positionLabel: "Μέσα στη σελίδα" },
  { page: "digital-museum", pageLabel: "Ψηφιακό Μουσείο", key: "digital-museum-ad-1", position: "after-intro", positionLabel: "Μετά την εισαγωγή" },
  { page: "history", pageLabel: "Ιστορία", key: "history-ad-1", position: "after-intro", positionLabel: "Μετά την εισαγωγή" },
  { page: "services", pageLabel: "Υπηρεσίες", key: "services-ad-1", position: "in-page", positionLabel: "Μέσα στη σελίδα" },
  { page: "village-voices", pageLabel: "Φωνές του Χωριού", key: "village-voices-ad-1", position: "after-intro", positionLabel: "Μετά την εισαγωγή" },
]

export const AD_SLOT_PAGES = Array.from(
  new Map(AD_SLOT_PLACEMENTS.map((p) => [p.page, p.pageLabel])).entries()
).map(([page, pageLabel]) => ({ page, pageLabel }))
