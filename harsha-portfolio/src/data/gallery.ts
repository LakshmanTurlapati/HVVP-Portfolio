import type { GalleryData } from '@/types'

// 31 user-facing assets across 6 categories
// Client tags: IC (International Center), ISSO (International Students & Scholars Office),
// OIE (Office of International Education), II (International Initiatives),
// UTDG (UTD Global), PP (Passport Services), UTD, OICS

export const galleryData: GalleryData = {
  intro:
    "This section showcases a selection of my design work across social media campaigns, event promotions, and digital marketing assets. Each piece reflects my ability to combine creativity with strategic marketing objectives.",
  closing:
    "These are a few designs out of the 30+ marketing assets I've created and posted across social media, events, and digital campaigns.",
  categories: [
    {
      slug: 'instagram-posts',
      label: 'Instagram Posts',
      aspectRatio: '4 / 5',
      assets: [
        { slug: 'black-history-month', title: 'Black History Month', client: 'IC', src: '/gallery/instagram-posts/ic-black-history-month.png', width: 1080, height: 1350, alt: 'Black History Month Instagram post with cultural patterns and portrait' },
        { slug: 'seasons-greeting-card', title: "Season's Greeting Card", client: 'IC', src: '/gallery/instagram-posts/ic-seasons-greeting-card.png', width: 1080, height: 1350, alt: "Season's greeting card Instagram post from International Center" },
        { slug: 'dir-lunch', title: 'DIR Lunch', client: 'II', src: '/gallery/instagram-posts/ii-dir-lunch.png', width: 1080, height: 1350, alt: 'DIR lunch event Instagram post' },
        { slug: 'francisco-dinner', title: 'Francisco Dinner', client: 'II', src: '/gallery/instagram-posts/ii-francisco-dinner.png', width: 1429, height: 2000, alt: 'Francisco dinner event Instagram post' },
        { slug: 'pizza-and-plagiarism', title: 'Pizza & Plagiarism', client: 'ISSO', src: '/gallery/instagram-posts/isso-pizza-and-plagiarism.png', width: 1080, height: 1350, alt: 'Pizza and Plagiarism academic integrity event Instagram post' },
        { slug: 'us-port-of-entry-webinar', title: 'U.S. Port of Entry Webinar', client: 'ISSO', src: '/gallery/instagram-posts/isso-us-port-of-entry-webinar.png', width: 940, height: 788, alt: 'Preparing for the U.S. Port of Entry webinar Instagram post' },
        { slug: 'townhall-meeting', title: 'Town Hall Meeting', client: 'ISSO', src: '/gallery/instagram-posts/isso-townhall-meeting.png', width: 1080, height: 1350, alt: 'Town Hall Meeting immigration updates Instagram post' },
        { slug: 'slice-of-study-abroad', title: 'Slice of Study Abroad', client: 'OIE', src: '/gallery/instagram-posts/oie-slice-of-study-abroad.png', width: 1080, height: 1350, alt: 'Slice of Study Abroad pizza promotion Instagram post' },
        { slug: 'real-id', title: 'Real ID', client: 'PP', src: '/gallery/instagram-posts/pp-real-id.png', width: 1080, height: 1350, alt: 'Be Real ID Ready passport services Instagram post with mascot' },
        { slug: 'last-call-deadline', title: 'Last Call Deadline', client: 'UTDG', src: '/gallery/instagram-posts/utdg-last-call-deadline.png', width: 1080, height: 1350, alt: 'Last call deadline reminder Instagram post' },
      ],
    },
    {
      slug: 'linkedin-posts',
      label: 'LinkedIn Posts',
      aspectRatio: '940 / 788',
      assets: [
        { slug: 'international-youth-day', title: 'International Youth Day', client: 'IC', src: '/gallery/linkedin-posts/ic-international-youth-day.png', width: 940, height: 788, alt: 'International Youth Day LinkedIn post' },
        { slug: 'national-hispanic-heritage-month', title: 'National Hispanic Heritage Month', client: 'IC', src: '/gallery/linkedin-posts/ic-national-hispanic-heritage-month.png', width: 940, height: 788, alt: 'National Hispanic Heritage Month LinkedIn post with dancer' },
        { slug: 'weeks-of-welcome', title: 'Weeks of Welcome', client: 'IC', src: '/gallery/linkedin-posts/ic-weeks-of-welcome.png', width: 940, height: 788, alt: 'Weeks of Welcome campus event LinkedIn post' },
        { slug: 'welcome-back-to-campus', title: 'Welcome Back to Campus', client: 'IC', src: '/gallery/linkedin-posts/ic-welcome-back-to-campus.png', width: 940, height: 788, alt: 'Welcome back to campus LinkedIn post' },
        { slug: 'womens-equality-day', title: "Women's Equality Day", client: 'IC', src: '/gallery/linkedin-posts/ic-womens-equality-day.png', width: 940, height: 788, alt: "Women's Equality Day magazine-style LinkedIn post" },
        { slug: 'raising-cans', title: 'Raising Cans Participation', client: 'ISSO', src: '/gallery/linkedin-posts/isso-raising-cans.png', width: 1200, height: 1200, alt: 'Raising Cans food drive participation LinkedIn post' },
        { slug: 'study-abroad', title: 'Study Abroad', client: 'OIE', src: '/gallery/linkedin-posts/oie-study-abroad.png', width: 940, height: 788, alt: 'Study Abroad LinkedIn post' },
      ],
    },
    {
      slug: 'linkedin-ads',
      label: 'LinkedIn Ads',
      aspectRatio: '1200 / 627',
      assets: [
        { slug: 'pre-masters-pathway-ad-1', title: "Pre-Master's Pathway Ad", client: 'UTDG', src: '/gallery/linkedin-ads/utdg-pre-masters-pathway-ad-1.png', width: 1200, height: 627, alt: "Pre-Master's Pathway LinkedIn ad with phone chat mockup" },
        { slug: 'scholarships-ad-1', title: 'Scholarships Ad 1', client: 'UTDG', src: '/gallery/linkedin-ads/utdg-scholarships-ad-1.png', width: 1200, height: 627, alt: 'Scholarships LinkedIn ad variant 1' },
        { slug: 'scholarships-ad-2', title: 'Scholarships Ad 2', client: 'UTDG', src: '/gallery/linkedin-ads/utdg-scholarships-ad-2.png', width: 1200, height: 627, alt: 'Scholarships LinkedIn ad variant 2' },
        { slug: 'scholarships-ad-3', title: 'Scholarships Ad 3', client: 'UTDG', src: '/gallery/linkedin-ads/utdg-scholarships-ad-3.png', width: 1200, height: 627, alt: 'Scholarships LinkedIn ad variant 3' },
      ],
    },
    {
      slug: 'linkedin-events',
      label: 'LinkedIn Events',
      aspectRatio: '16 / 9',
      assets: [
        { slug: 'lets-talk', title: "Let's Talk Event", client: 'ISSO', src: '/gallery/linkedin-events/isso-lets-talk.png', width: 1600, height: 900, alt: "Let's Talk counseling event LinkedIn event graphic" },
        { slug: 'pre-masters-pathway', title: "Pre-Master's Pathway Event", client: 'UTD', src: '/gallery/linkedin-events/utd-pre-masters-pathway.png', width: 1200, height: 627, alt: "Pre-Master's Pathway LinkedIn event graphic" },
      ],
    },
    {
      slug: 'digital-signage',
      label: 'Digital Signage',
      aspectRatio: '16 / 9',
      assets: [
        { slug: 'arrive-and-thrive', title: 'Arrive & Thrive', client: 'ISSO', src: '/gallery/digital-signage/isso-arrive-and-thrive.png', width: 1600, height: 900, alt: 'Arrive & Thrive international student orientation digital signage' },
        { slug: 'study-abroad', title: 'Study Abroad the UTD Way', client: 'OIE', src: '/gallery/digital-signage/oie-study-abroad.png', width: 1920, height: 1080, alt: 'Study Abroad the UTD Way digital signage with travel photography' },
      ],
    },
    {
      slug: 'printables',
      label: 'Printables',
      aspectRatio: '3 / 4',
      assets: [
        { slug: 'donor-thank-you-cards', title: 'Donor Thank You Cards', client: 'IC', src: '/gallery/printables/ic-donor-thank-you-cards.png', width: 606, height: 343, alt: 'Donor thank you cards print layout' },
        { slug: 'iew-poster', title: 'International Education Week Poster', client: 'IC', src: '/gallery/printables/ic-iew-poster.png', width: 1545, height: 2000, alt: 'International Education Week poster with cultural icons' },
        { slug: 'independence-day-poster', title: 'Independence Day Poster', client: 'IC', src: '/gallery/printables/ic-independence-day-poster.png', width: 1545, height: 2000, alt: 'Independence Day poster print' },
        { slug: 'juneteenth-poster', title: 'Juneteenth Poster', client: 'IC', src: '/gallery/printables/ic-juneteenth-poster.png', width: 1545, height: 2000, alt: 'Juneteenth commemoration poster with raised fist imagery' },
        { slug: 'brochure-refined', title: 'Brochure (Refined)', client: 'OICS', src: '/gallery/printables/oics-brochure-refined.png', width: 792, height: 612, alt: 'Refined brochure print design', isPdf: true, pdfHref: '/gallery/printables/oics-brochure-refined.pdf' },
        { slug: 'pre-masters-pathway-brochure', title: "Pre-Master's Pathway Brochure", client: 'UTDG', src: '/gallery/printables/utdg-pre-masters-pathway-brochure.png', width: 792, height: 612, alt: "Pre-Master's Pathway printed brochure", isPdf: true, pdfHref: '/gallery/printables/utdg-pre-masters-pathway-brochure.pdf' },
      ],
    },
  ],
}
