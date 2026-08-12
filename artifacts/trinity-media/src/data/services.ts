export type Service = {
  num: string;
  slug: string;
  title: string;
  short: string;
  overview: string;
  capabilities: string[];
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    num: '01',
    slug: 'exhibition-stand-design-construction',
    title: 'Exhibition Stand Design & Construction',
    short: 'Custom-built exhibition stands engineered to stop footfall and start conversations.',
    overview:
      'From concept to on-site handover, we design and build exhibition stands that make brands impossible to ignore. Our in-house team handles 3D design, structural engineering, fabrication, logistics and installation under one roof.',
    capabilities: ['Custom Booth Fabrication', 'Space Planning', '3D Rendering', 'On-site Installation'],
    deliverables: ['Concept & 3D visuals', 'Engineered build drawings', 'Fabrication & finishing', 'Warehousing & logistics', 'On-site install & dismantle'],
  },
  {
    num: '02',
    slug: 'event-branding-activation',
    title: 'Event Branding & Activation',
    short: 'End-to-end event branding and on-ground activations that bring brands to life.',
    overview:
      'We turn event spaces into immersive brand environments. From stage backdrops to experiential zones, every touchpoint is designed to engage audiences and amplify your message.',
    capabilities: ['Stage Backdrops', 'Registration Desks', 'Branded Archways', 'Experiential Zones'],
    deliverables: ['Creative concept', 'Environmental graphics', 'Custom build & install', 'Activation props', 'Event signage kit'],
  },
  {
    num: '03',
    slug: 'custom-kiosk-design-fabrication',
    title: 'Custom Kiosk Design & Fabrication',
    short: 'Bespoke retail and mall kiosks built to perform in high-traffic environments.',
    overview:
      'Compact, durable and conversion-focused. Our custom kiosks are engineered for malls, events and public spaces, combining smart storage, lighting and display into a single unit.',
    capabilities: ['Mall Kiosks', 'Interactive Displays', 'Vending Carts', 'Information Desks'],
    deliverables: ['Design & prototyping', 'Material specification', 'Fabrication', 'Lighting & wiring', 'Delivery & install'],
  },
  {
    num: '04',
    slug: 'retail-display-pos-solutions',
    title: 'Retail Display & Point-of-Sale Solutions',
    short: 'POS displays and retail units engineered to move product off the shelf.',
    overview:
      'We design and manufacture retail displays that drive attention at the shelf. From free-standing units to counter-top displays, every piece is built to brand spec and built to last.',
    capabilities: ['Gondolas', 'FSU (Free Standing Units)', 'Window Displays', 'Counter Top Units'],
    deliverables: ['Concept design', 'Structural engineering', 'Production', 'Branding & print', 'Rollout logistics'],
  },
  {
    num: '05',
    slug: 'interior-fit-out-solutions',
    title: 'Interior Fit-Out Solutions',
    short: 'Turnkey interior fit-outs for commercial, retail and hospitality spaces.',
    overview:
      'From offices to restaurants, we deliver complete interior fit-outs with precision joinery, MEP coordination and project management. One team, one timeline, one point of accountability.',
    capabilities: ['Corporate Offices', 'Retail Stores', 'Restaurants & Cafes', 'Bespoke Joinery'],
    deliverables: ['Design development', 'Bespoke joinery', 'Fit-out execution', 'MEP coordination', 'Snag & handover'],
  },
  {
    num: '06',
    slug: 'portable-display-branding',
    title: 'Portable Display & Branding Solutions',
    short: 'Lightweight, reusable displays for promotions, launches and roadshows.',
    overview:
      'Portable, pop-up and reusable branding that travels with your campaign. Fast to assemble, easy to store, and built to look sharp show after show.',
    capabilities: ['Pop-up Displays', 'Roll-up Banners', 'Promotional Counters', 'Flags & Tents'],
    deliverables: ['Print-ready artwork', 'Hardware kit', 'Carry cases', 'Setup guide', 'Reprints on demand'],
  },
  {
    num: '07',
    slug: 'corrugated-forex-stand-solutions',
    title: 'Corrugated & Forex Stand Solutions',
    short: 'Cost-effective corrugated and Forex POS stands for fast retail rollouts.',
    overview:
      'Lightweight, recyclable and budget-friendly. Our corrugated and Forex displays are ideal for seasonal campaigns, product launches and temporary retail activations.',
    capabilities: ['Cardboard POS', 'Dump Bins', 'Pallet Displays', 'Counter Displays'],
    deliverables: ['Structural design', 'Die-line & print', 'Prototyping', 'Bulk production', 'Flat-pack delivery'],
  },
  {
    num: '08',
    slug: 'indoor-outdoor-signage',
    title: 'Indoor & Outdoor Signage',
    short: 'Durable wayfinding, building and pylon signage built for visibility.',
    overview:
      'From wayfinding systems to building wraps, we manufacture signage that performs indoors and out. Weather-rated materials, precision fabrication and compliant installation.',
    capabilities: ['Wayfinding', 'Building Wraps', 'Pylon Signs', 'Safety Signs'],
    deliverables: ['Site survey', 'Engineering & permits', 'Fabrication', 'Installation', 'Maintenance plan'],
  },
  {
    num: '09',
    slug: 'led-neon-illuminated-signage',
    title: 'LED Neon & Illuminated Signage',
    short: 'Channel letters, lightboxes and LED neon that make brands glow.',
    overview:
      'Energy-efficient LED and neon signage engineered for brilliance and longevity. From 3D channel letters to flex-face signs, we handle design, build and electrical install.',
    capabilities: ['3D Channel Letters', 'Flex Face Signs', 'Neon Art', 'Lightboxes'],
    deliverables: ['Design & mockups', 'Internal lighting spec', 'Fabrication', 'Electrical install', 'Warranty support'],
  },
  {
    num: '10',
    slug: 'shell-scheme-furniture-rental',
    title: 'Shell Scheme & Furniture Rental',
    short: 'Standard and upgraded shell schemes with flexible furniture rental.',
    overview:
      'Exhibition-ready shell schemes with optional upgrades and a full rental furniture catalogue. Fast setup, clean finish, fully managed on site.',
    capabilities: ['Standard Booths', 'Upgraded Shells', 'Display Counters', 'Event Seating'],
    deliverables: ['Shell build', 'Furniture rental', 'Lighting & electrics', 'On-site management', 'Dismantle'],
  },
  {
    num: '11',
    slug: 'acrylic-fabrication',
    title: 'Acrylic Fabrication',
    short: 'Precision-cut acrylic podiums, cases and POS fabrication.',
    overview:
      'Crystal-clear, edge-lit and coloured acrylic work. We cut, bend, polish and fabricate acrylic into displays, podiums and awards with a premium finish.',
    capabilities: ['Podiums', 'Display Cases', 'Trophy & Awards', 'Leaflet Holders'],
    deliverables: ['Design & prototyping', 'CNC & laser cutting', 'Polishing & bonding', 'Branding', 'Quality check'],
  },
  {
    num: '12',
    slug: 'large-format-digital-printing',
    title: 'Large Format & Digital Printing',
    short: 'High-resolution large format print for banners, posters and vinyl.',
    overview:
      'Sharp, vibrant and weather-resistant. Our large format printing covers everything from banners to backlits, produced in-house for fast turnaround and colour accuracy.',
    capabilities: ['Banners', 'Posters', 'Vinyl Stickers', 'Backlits'],
    deliverables: ['Print-ready files', 'Material selection', 'Production', 'Finishing & lamination', 'Installation'],
  },
  {
    num: '13',
    slug: 'vehicle-branding-fleet-graphics',
    title: 'Vehicle Branding & Fleet Graphics',
    short: 'Full and partial vehicle wraps that turn fleets into moving billboards.',
    overview:
      'Mobile branding that works 24/7. We design, print and install vehicle wraps and graphics using cast vinyl built to withstand the climate.',
    capabilities: ['Full Wraps', 'Partial Wraps', 'Van Lettering', 'Food Trucks'],
    deliverables: ['Design & mockups', 'Print on cast vinyl', 'Surface prep', 'Professional install', 'Care guide'],
  },
  {
    num: '14',
    slug: 'custom-fabric-printing',
    title: 'Custom Fabric Printing',
    short: 'Dye-sublimated tension fabric, flags and soft signage on demand.',
    overview:
      'Lightweight, washable and vivid. Our custom fabric printing is perfect for tension-frame displays, flags and backdrops that pack small and look huge.',
    capabilities: ['Tension Fabric', 'Flags', 'Backdrops', 'Soft Signage'],
    deliverables: ['Artwork setup', 'Dye-sublimation print', 'Cut & sew finishing', 'Hardware options', 'Reorder service'],
  },
  {
    num: '15',
    slug: 'canvas-prints-wall-decor',
    title: 'Canvas Prints & Wall Décor',
    short: 'Gallery wraps, framed art and murals for interiors that impress.',
    overview:
      'Transform blank walls into branded or decorative statements. We produce canvas prints, framed art, acoustic panels and murals to spec.',
    capabilities: ['Gallery Wraps', 'Framed Art', 'Acoustic Panels', 'Custom Murals'],
    deliverables: ['Image sourcing & retouch', 'Print & stretch', 'Framing options', 'Wall prep', 'Installation'],
  },
  {
    num: '16',
    slug: 'kitchen-cabinet-wrapping',
    title: 'Kitchen Cabinet Wrapping',
    short: 'Architectural film and vinyl refacing to refresh kitchens without replacing.',
    overview:
      'A fast, clean alternative to replacement. We wrap cabinets, countertops and appliances in premium architectural film for a brand-new look with minimal disruption.',
    capabilities: ['Architectural Film', 'Vinyl Refacing', 'Countertop Wraps', 'Appliance Wrapping'],
    deliverables: ['Site assessment', 'Material selection', 'Surface preparation', 'Professional wrapping', 'Aftercare guide'],
  },
  {
    num: '17',
    slug: 'decorative-wallpaper-solutions',
    title: 'Decorative Wallpaper Solutions',
    short: 'Custom printed and textured wallpaper for feature walls and branding.',
    overview:
      'Bespoke wallpaper that turns walls into brand or design statements. Custom print, textured vinyl and mural graphics, supplied and installed.',
    capabilities: ['Custom Printed', 'Textured Vinyl', 'Mural Graphics', 'Installation'],
    deliverables: ['Design & pattern', 'Print to spec', 'Surface prep', 'Hanging & finishing', 'Warranty'],
  },
  {
    num: '18',
    slug: 'custom-awards-recognition',
    title: 'Custom Awards & Recognition',
    short: 'Crystal, wood and metal trophies crafted for memorable recognition.',
    overview:
      'Celebrate achievement with bespoke awards. We design and manufacture crystal, wood and metal trophies, plaques and medals tailored to your event.',
    capabilities: ['Crystal Awards', 'Wooden Plaques', 'Metal Trophies', 'Medals'],
    deliverables: ['Concept & 3D', 'Material sourcing', 'Engraving & finishing', 'Presentation packaging', 'Bulk delivery'],
  },
  {
    num: '19',
    slug: 'commercial-offset-printing',
    title: 'Commercial Offset Printing',
    short: 'Brochures, cards, catalogs and stationery printed to a premium finish.',
    overview:
      'Crisp, consistent, high-volume print. Our commercial offset service covers brochures, business cards, catalogs and stationery with a premium, brand-accurate finish.',
    capabilities: ['Brochures', 'Business Cards', 'Catalogs', 'Corporate Stationery'],
    deliverables: ['Pre-press & proofing', 'Offset production', 'Finishing & binding', 'Quality control', 'Pack & dispatch'],
  },
];

export function getServiceBySlug(slug?: string): Service | undefined {
  if (!slug) return undefined;
  return SERVICES.find((s) => s.slug === slug);
}
