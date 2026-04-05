#!/bin/bash
# One-off: Copies 31 design assets from .planning/design-references to public/gallery/
# Usage: bash harsha-portfolio/scripts/migrate-gallery-assets.sh

set -e

SRC="/Users/lakshmanturlapati/Documents/Codes/Harsha/.planning/design-references/My Designs"
DST="/Users/lakshmanturlapati/Documents/Codes/Harsha/harsha-portfolio/public/gallery"

copy_asset() {
  local src_file="$1"
  local dst_dir="$2"
  local dst_name="$3"
  cp "$src_file" "$dst_dir/$dst_name"
  echo "copied: $dst_name"
}

# Digital Signage
copy_asset "$SRC/Digital Signage/[ISSO] Arrive & Thrive Digital Signage.png" "$DST/digital-signage" "isso-arrive-and-thrive.png"
copy_asset "$SRC/Digital Signage/[OIE] Study Abroad Digital Signage.png" "$DST/digital-signage" "oie-study-abroad.png"

# Instagram Posts
copy_asset "$SRC/Instagram Posts/[IC][IG] Black History Month Post.png" "$DST/instagram-posts" "ic-black-history-month.png"
copy_asset "$SRC/Instagram Posts/[IC][IG] Season's Greeting Card Post.png" "$DST/instagram-posts" "ic-seasons-greeting-card.png"
copy_asset "$SRC/Instagram Posts/[II][IG] DIR Lunch Post.png" "$DST/instagram-posts" "ii-dir-lunch.png"
copy_asset "$SRC/Instagram Posts/[II][IG] Francisco Dinner Post.png" "$DST/instagram-posts" "ii-francisco-dinner.png"
copy_asset "$SRC/Instagram Posts/[ISSO][IG] Pizza & Plagiarism Post.png" "$DST/instagram-posts" "isso-pizza-and-plagiarism.png"
copy_asset "$SRC/Instagram Posts/[ISSO][IG] Preparing for the U.S Port of Entry Webinar Post.png" "$DST/instagram-posts" "isso-us-port-of-entry-webinar.png"
copy_asset "$SRC/Instagram Posts/[ISSO][IG] Townhall Meeting Post.png" "$DST/instagram-posts" "isso-townhall-meeting.png"
copy_asset "$SRC/Instagram Posts/[OIE][IG] Slice of Study Abroad Post.png" "$DST/instagram-posts" "oie-slice-of-study-abroad.png"
copy_asset "$SRC/Instagram Posts/[PP][IG] Real ID Post.png" "$DST/instagram-posts" "pp-real-id.png"
copy_asset "$SRC/Instagram Posts/[UTDG][IG] Last Call Deadline Reminder Post.png" "$DST/instagram-posts" "utdg-last-call-deadline.png"

# LinkedIn Ads
copy_asset "$SRC/LinkedIn/LinkedIn Ads/[UTDG][LI] Pre-Master's Pathway Ad - 1.png" "$DST/linkedin-ads" "utdg-pre-masters-pathway-ad-1.png"
copy_asset "$SRC/LinkedIn/LinkedIn Ads/[UTDG][LI] Scholarships Ad - 1.png" "$DST/linkedin-ads" "utdg-scholarships-ad-1.png"
copy_asset "$SRC/LinkedIn/LinkedIn Ads/[UTDG][LI] Scholarships Ad - 2.png" "$DST/linkedin-ads" "utdg-scholarships-ad-2.png"
copy_asset "$SRC/LinkedIn/LinkedIn Ads/[UTDG][LI] Scholarships Ad - 3.png" "$DST/linkedin-ads" "utdg-scholarships-ad-3.png"

# LinkedIn Events
copy_asset "$SRC/LinkedIn/LinkedIn Events/[ISSO][LI] Let's Talk Event.png" "$DST/linkedin-events" "isso-lets-talk.png"
copy_asset "$SRC/LinkedIn/LinkedIn Events/[UTD][LI] Pre-Master's Pathway Event.png" "$DST/linkedin-events" "utd-pre-masters-pathway.png"

# LinkedIn Posts
copy_asset "$SRC/LinkedIn/LinkedIn Posts/[IC][LI] International Youth Day Post.png" "$DST/linkedin-posts" "ic-international-youth-day.png"
copy_asset "$SRC/LinkedIn/LinkedIn Posts/[IC][LI] National Hispanic Heritage Month Post.png" "$DST/linkedin-posts" "ic-national-hispanic-heritage-month.png"
copy_asset "$SRC/LinkedIn/LinkedIn Posts/[IC][LI] Weeks of Welcome Post.png" "$DST/linkedin-posts" "ic-weeks-of-welcome.png"
copy_asset "$SRC/LinkedIn/LinkedIn Posts/[IC][LI] Welcome Back To Campus Post.png" "$DST/linkedin-posts" "ic-welcome-back-to-campus.png"
copy_asset "$SRC/LinkedIn/LinkedIn Posts/[IC][LI] Women's Equality Day Post.png" "$DST/linkedin-posts" "ic-womens-equality-day.png"
copy_asset "$SRC/LinkedIn/LinkedIn Posts/[ISSO][LI] Raising Cans Participation Post .png" "$DST/linkedin-posts" "isso-raising-cans.png"
copy_asset "$SRC/LinkedIn/LinkedIn Posts/[OIE][LI] Study Abroad Post.png" "$DST/linkedin-posts" "oie-study-abroad.png"

# Printables (PNG)
copy_asset "$SRC/Printables/[IC] Donor Thank You Cards Print.png" "$DST/printables" "ic-donor-thank-you-cards.png"
copy_asset "$SRC/Printables/[IC] IEW Poster Print.png" "$DST/printables" "ic-iew-poster.png"
copy_asset "$SRC/Printables/[IC] Independence Day Poster Print.png" "$DST/printables" "ic-independence-day-poster.png"
copy_asset "$SRC/Printables/[IC] Juneteenth Poster Print.png" "$DST/printables" "ic-juneteenth-poster.png"

# Printables (PDF)
copy_asset "$SRC/Printables/[OICS] Brochure Refined Print.pdf" "$DST/printables" "oics-brochure-refined.pdf"
copy_asset "$SRC/Printables/[UTDG] Pre-Master's Pathway Brochure Printed.pdf" "$DST/printables" "utdg-pre-masters-pathway-brochure.pdf"

# Generate PDF previews (first page as PNG)
if command -v sips >/dev/null 2>&1; then
  echo "Generating PDF previews..."
  sips -s format png "$DST/printables/oics-brochure-refined.pdf" --out "$DST/printables/oics-brochure-refined.png" 2>/dev/null || echo "  (sips could not convert oics-brochure; using placeholder)"
  sips -s format png "$DST/printables/utdg-pre-masters-pathway-brochure.pdf" --out "$DST/printables/utdg-pre-masters-pathway-brochure.png" 2>/dev/null || echo "  (sips could not convert utdg-brochure; using placeholder)"
fi

echo ""
echo "Asset migration complete. Counts:"
for dir in "$DST"/*/; do
  count=$(ls "$dir" | wc -l | tr -d ' ')
  echo "  $(basename $dir): $count files"
done
