// One-time script: moves the historical content that used to be hardcoded
// into src/app/history/page.tsx into real, admin-editable HistoricalPost
// rows (Markdown). Run once against your real database:
//   node scripts/seed-history-posts.js
require('dotenv').config({ path: '.env' });

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const posts = [
  {
    slug: 'apo-to-balmpa-kioi-os-ti-mesia',
    title: 'Από το Μπαλμπά Κιόϊ ως τη Μεσιά',
    excerpt: 'Η ιστορία του χωριού από την Τουρκοκρατία μέχρι σήμερα, μέσα από τρεις επίσημες μετονομασίες.',
    isPinned: true,
    content: `## Τουρκοκρατία

Η παλιά ονομασία του χωριού από την εποχή της τουρκοκρατίας είναι **«Μπαλμπά Κιόϊ»**. Με αυτό το όνομα αναφέρεται στα επίσημα έγγραφα μετά την απελευθέρωση της περιοχής από τον οθωμανικό ζυγό.

## 20ός Αιώνας — Σημαντικές Ημερομηνίες

**1918 — Προσάρτηση στην κοινότητα Πετρόβου**
Στο ΦΕΚ 152Α - 09/07/1918 η περιοχή προσαρτάται στην τότε κοινότητα Πετρόβου (Άγιος Πέτρος) με το όνομα Μπαλμπά Κιόϊ.

**1927 — Επίσημη μετονομασία σε Μεσιά**
Με το ΦΕΚ 179Α - 30/08/1927 μετονομάστηκε επίσημα σε Μεσιά.

**1949 — Ίδρυση της κοινότητας Μεσιάς**
Με το ΦΕΚ 193Α - 31/08/1949 ορίστηκε έδρα της ομώνυμης νεοϊδρυθείσας κοινότητας.

## Σύγχρονη Εποχή

Σήμερα η **Μεσιά** αποτελεί μια ζωντανή κοινότητα που διατηρεί τον παραδοσιακό της χαρακτήρα ενώ παράλληλα προσαρμόζεται στις σύγχρονες ανάγκες.

Η κοινότητα συμμετέχει ενεργά στις εκδηλώσεις και τις δραστηριότητες του **Δήμου Παιονίας**, διατηρώντας παράλληλα την ιδιαίτερη πολιτιστική της ταυτότητα και τις παραδόσεις που κληρονόμησε από τους προγόνους της.

> «Από το Μπαλμπά Κιόϊ στη σύγχρονη Μεσιά — μια διαδρομή αιώνων που συνεχίζεται»`,
  },
  {
    slug: 'ekklisia-agiou-konstantinou-kai-elenis',
    title: 'Εκκλησία Αγίου Κωνσταντίνου και Ελένης',
    excerpt: 'Οθωμανικός τουρμπές του 15ου αιώνα, που το 1930 μετατράπηκε σε χριστιανικό ναό.',
    isPinned: false,
    content: `Η εκκλησία του χωριού έχει κηρυχθεί ιστορικό διατηρητέο μνημείο λόγω του ιδιαίτερου αρχιτεκτονικού και ιστορικού της ενδιαφέροντος.

Ο τουρμπές (μαυσωλείο) βρίσκεται περίπου στο κέντρο του οικισμού και ανήκε σε ευρύτερο φιλανθρωπικό συγκρότημα των μέσων του 15ου αιώνα, που περιλάμβανε επίσης λουτρό και τέμενος. Έχει τετράγωνη κάτοψη και τρούλο. Μετά την ανταλλαγή των πληθυσμών το 1924, πρόσφυγες από την Ανατολική Θράκη τον μετέτρεψαν το 1930 στον ναό των Αγίων Κωνσταντίνου και Ελένης.

Πηγή: Εφορεία Αρχαιοτήτων Κιλκίς (efa-kilkis.gr).

**Περίοδος:** μέσα 15ου αιώνα`,
  },
  {
    slug: 'tafikos-tymvos-mesias',
    title: 'Ταφικός Τύμβος Μεσιάς',
    excerpt: 'Μνημειακός τάφος του 4ου–3ου αιώνα π.Χ., με διάμετρο 32 μέτρα, που αποκαλύφθηκε σε σωστικές ανασκαφές το 2020.',
    isPinned: false,
    content: `Σημαντικό μνημείο με διάμετρο 32 μέτρα και ύψος 5 μέτρα, που αποδίδεται στον ύστερο 4ο ή 3ο αιώνα π.Χ.

Ανακαλύφθηκε μνημειακός κιβωτιόσχημος τάφος με διακοσμήσεις στο εσωτερικό μετά από σωστικές ανασκαφές το 2020.

**Περίοδος:** 4ος – 3ος αι. π.Χ.`,
  },
  {
    slug: 'arxaiologikos-xoros-toumpas-papakioi',
    title: 'Αρχαιολογικός Χώρος «Τούμπας Παπάκιοϊ»',
    excerpt: 'Προϊστορικός αρχαιολογικός χώρος στην ευρύτερη περιοχή της Μεσιάς.',
    isPinned: false,
    content: `Στην ευρύτερη περιοχή βρίσκεται ομώνυμος αρχαιολογικός χώρος που μαρτυρεί την παρουσία ανθρώπινων δραστηριοτήτων από αρχαιότατους χρόνους.

**Περίοδος:** Προϊστορική εποχή`,
  },
]

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
  if (!admin) {
    console.error('No ADMIN user found — create one first (see scripts/create-admin.js).')
    process.exit(1)
  }

  for (const post of posts) {
    const existing = await prisma.historicalPost.findUnique({ where: { slug: post.slug } })
    if (existing) {
      console.log(`Skipping "${post.title}" — slug already exists`)
      continue
    }
    await prisma.historicalPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        images: [],
        isPinned: post.isPinned,
        creatorId: admin.id,
      },
    })
    console.log(`Created "${post.title}"`)
  }
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
