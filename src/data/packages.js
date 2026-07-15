export const celebrationPackages = [
  {
    name: 'Silver Celebration',
    description: 'A graceful entry package for close-knit family functions, intimate ring ceremonies, milestone birthdays, and refined private gatherings.',
    price: 'Starting from ₹1.25L',
    bestFor: 'Engagements, birthdays & private gatherings',
    capacity: '80–250 guests',
    tag: 'Elegant Starter',
    inclusions: ['Decor-ready banquet space', 'Basic stage setup', 'Standard buffet planning', 'Event floor coordination'],
  },
  {
    name: 'Gold Wedding',
    description: 'A thoughtfully balanced wedding package with elevated décor direction, polished hospitality, and generous indoor celebration flow.',
    price: 'Starting from ₹2.75L',
    bestFor: 'Weddings, receptions & sangeet nights',
    capacity: '250–600 guests',
    tag: 'Most Popular',
    popular: true,
    inclusions: ['Luxury banquet access', 'Premium stage styling', 'Curated catering support', 'Guest hospitality desk', 'Bridal preparation room'],
  },
  {
    name: 'Royal Premium',
    description: 'A high-touch celebration plan for families who want richer décor, curated dining, refined guest comfort, and attentive event supervision.',
    price: 'Starting from ₹4.50L',
    bestFor: 'Grand weddings & reception evenings',
    capacity: '500–900 guests',
    tag: 'Royal Choice',
    inclusions: ['Banquet + dining pavilion', 'Theme decoration support', 'Dedicated event manager', 'Valet-ready parking flow', 'Premium lighting assistance'],
  },
  {
    name: 'Grand Luxury',
    description: 'A complete luxury venue experience for large weddings with multiple spaces, premium styling, and full hospitality support.',
    price: 'Starting from ₹7.50L',
    bestFor: 'Luxury weddings & multi-event celebrations',
    capacity: '800–1200 guests',
    tag: 'Signature Experience',
    inclusions: ['Full venue experience', 'Banquet + lawn access', 'Luxury décor concepting', 'VIP family support', 'Complete event coordination', 'Premium guest arrival flow'],
  },
];

export const comparisonPackages = ['Silver Celebration', 'Gold Wedding', 'Royal Premium', 'Grand Luxury'];

export const packageComparisonRows = [
  { feature: 'Banquet Access', values: ['Single hall', 'Luxury banquet', 'Banquet + dining', 'Full venue access'] },
  { feature: 'Guest Capacity', values: ['80–250', '250–600', '500–900', '800–1200'] },
  { feature: 'Decoration', values: ['Basic stage', 'Premium theme', 'Luxury theme', 'Signature concept'] },
  { feature: 'Catering Support', values: ['Standard buffet', 'Curated buffet', 'Premium dining', 'Luxury dining + counters'] },
  { feature: 'Stage Design', values: ['Standard', 'Premium', 'Luxury', 'Signature'] },
  { feature: 'DJ & Sound', values: [false, true, true, true] },
  { feature: 'Bridal Suite', values: [false, true, true, true] },
  { feature: 'Guest Rooms', values: [false, false, 'Limited support', true] },
  { feature: 'Valet Parking', values: [false, 'On request', true, true] },
  { feature: 'Event Manager', values: ['Floor coordinator', true, true, true] },
  { feature: 'Photography Support', values: [false, 'Vendor support', true, true] },
  { feature: 'Live Food Counters', values: [false, 'Add-on', true, true] },
  { feature: 'Power Backup', values: [true, true, true, true] },
  { feature: 'Security', values: [true, true, true, true] },
  { feature: 'Best For', values: ['Small functions', 'Weddings & receptions', 'Grand weddings', 'Luxury multi-event celebrations'] },
];

export const packageBuilderOptions = [
  { label: 'Event Type', options: ['Wedding', 'Reception', 'Engagement', 'Sangeet', 'Corporate Event'] },
  { label: 'Guest Count', options: ['100–250', '250–500', '500–800', '800+'] },
  { label: 'Decoration Style', options: ['Traditional Indian', 'Floral Luxury', 'Royal Gold', 'Modern Minimal'] },
  { label: 'Catering Preference', options: ['Classic Buffet', 'Premium Buffet', 'Live Counters', 'Luxury Dining'] },
  { label: 'Rooms Required', options: ['No Rooms', 'Bridal Suite', 'Family Rooms', 'Guest Rooms'] },
  { label: 'DJ / Sound', options: ['Not Required', 'Basic Sound', 'DJ Setup', 'Premium Sound'] },
  { label: 'Photography', options: ['Vendor Support', 'Photo Booth', 'Highlight Coverage', 'Full Event Team'] },
  { label: 'Budget Range', options: ['₹1L–₹2L', '₹2L–₹5L', '₹5L–₹8L', '₹8L+'] },
];

export const packageBenefits = [
  { icon: '✦', title: 'Calm Planning Journey', description: 'One organized package reduces vendor confusion, repeated decisions, and last-minute coordination pressure.' },
  { icon: '♕', title: 'Dedicated Event Manager', description: 'A single venue expert helps align guest flow, setup timing, vendor movement, and family comfort.' },
  { icon: '❦', title: 'Curated Décor Direction', description: 'Theme-ready décor support gives every function a refined, photo-friendly celebration mood.' },
  { icon: '◈', title: 'Flexible Customization', description: 'Adjust spaces, styling, dining, rooms, and event support around your family requirements.' },
  { icon: '✓', title: 'Clear Package Guidance', description: 'Clear package inclusions make it easier to compare options and plan your celebration budget.' },
  { icon: '◆', title: 'Trusted Vendors', description: 'Venue-friendly partners help create smoother execution for décor, sound, photography, and hospitality.' },
];

export const packageInclusionCards = [
  ['Venue Booking', 'Elegant venue access planned around your event size and celebration schedule.'],
  ['Decoration', 'Theme-ready décor support with floral, entrance, and ambience styling guidance.'],
  ['Stage Design', 'Photo-friendly stage layouts for rituals, reception, sangeet, and family portraits.'],
  ['Dining Arrangement', 'Comfortable dining flow with buffet planning and premium guest movement.'],
  ['Catering Assistance', 'Menu planning support for classic, premium, and live-counter style dining.'],
  ['Guest Seating', 'Well-spaced seating layouts designed for comfort, visibility, and family flow.'],
  ['Parking', 'Organized parking support for smooth guest arrivals and departures.'],
  ['Generator Backup', 'Reliable power support for lights, sound, kitchen, and essential operations.'],
  ['Bridal Room', 'Private bridal preparation space for makeup, family support, and photography.'],
  ['Groom Room', 'Comfortable groom-side preparation room for dressing and family coordination.'],
  ['Power Backup', 'Backup planning for uninterrupted celebrations and guest comfort.'],
  ['Housekeeping', 'Venue cleaning and upkeep support during the event experience.'],
  ['Cleaning', 'Pre-event and post-event cleaning support for a polished venue feel.'],
  ['Security', 'Security and monitored public spaces for safe family celebrations.'],
  ['Lighting', 'Warm ambience lighting support for stage, dining, entry, and photo zones.'],
  ['Sound System', 'Sound coordination support for announcements, rituals, and celebration moments.'],
  ['Event Coordination', 'On-ground coordination for setup, guest flow, and vendor timing.'],
  ['Photography Support', 'Vendor-friendly spaces, photo corners, and timing support for key moments.'],
];

export const packageAddOns = [
  ['addonFloralVisual', 'Premium Floral Decoration', 'Fresh floral arches, mandap accents, aisle styling, and luxury backdrop layers.'],
  ['addonLedVisual', 'LED Wall', 'Large-format LED display support for sangeet, reception, and corporate presentation moments.'],
  ['addonMusicVisual', 'Live Music', 'Live singers, instrumental mood sets, and reception-friendly music experiences.'],
  ['addonDjVisual', 'DJ Setup', 'Dance-floor sound, lighting, and DJ coordination for energetic celebration nights.'],
  ['addonEntryVisual', 'Luxury Entry', 'Bride, groom, or couple entry styling with lights, florals, and coordinated music.'],
  ['addonFireworksVisual', 'Fireworks', 'Celebration-safe fireworks or sparkling entry concepts subject to local permissions.'],
  ['addonPhotoVisual', 'Photography', 'Professional photography vendor support for rituals, portraits, and candid moments.'],
  ['addonVideoVisual', 'Videography', 'Event film support for ceremony coverage, reception highlights, and family moments.'],
  ['addonDroneVisual', 'Drone Coverage', 'Aerial-style coverage planning for exterior, lawn, and cinematic celebration views.'],
  ['addonCateringVisual', 'Luxury Catering Upgrade', 'Premium menu upgrades, live counters, curated desserts, and refined service flow.'],
  ['addonValetVisual', 'Valet Parking', 'Polished arrival experience with valet support for VIP guests and family members.'],
  ['addonLiveCountersVisual', 'Live Food Counters', 'Chaat, tandoor, dessert, mocktail, and chef-led live counter experiences.'],
  ['addonMocktailVisual', 'Mocktail Bar', 'Elegant non-alcoholic beverage bar setup with premium serving presentation.'],
  ['addonCarVisual', 'Luxury Wedding Car', 'Luxury car arrangement support for couple entry or family arrival moments.'],
  ['addonRoomsVisual', 'Guest Accommodation', 'Room support and stay coordination for close family or outstation guests.'],
];

export const packageFaqs = [
  ['Can packages be customized?', 'Yes. Packages can be adjusted around guest count, preferred venue space, decoration theme, catering style, rooms, and event schedule.'],
  ['Can outside decorators be hired?', 'Outside decorators can be discussed with the venue team. The final approval depends on setup timing, safety, vendor policy, and venue protection requirements.'],
  ['Is catering compulsory?', 'Catering can be planned through recommended support or discussed as per your event requirement. The team can guide you based on guest count and menu expectations.'],
  ['Can guest count change later?', 'Yes, guest count can usually be revised before final planning. Large changes may affect seating layout, dining flow, and final quotation.'],
  ['What is the advance payment policy?', 'Advance payment confirms the booking and blocks the selected date. Exact advance terms are shared by the event team during enquiry.'],
  ['Are rooms included?', 'Some packages include suite or room support, while others offer rooms as add-ons. Availability depends on date and package selection.'],
  ['Is parking free?', 'Venue parking support is included for guests. Valet or extended parking management can be added depending on event scale.'],
  ['Can we visit before booking?', 'Yes. Families are encouraged to schedule a physical venue visit before finalizing the date, package, and event plan.'],
];

export const packageTerms = [
  ['Advance Booking', 'Dates are confirmed only after package discussion and booking advance. High-season dates should be checked early.'],
  ['Cancellation', 'Cancellation terms depend on date, package, vendor commitments, and the timeline of cancellation.'],
  ['Payment Schedule', 'Payments are usually divided into booking advance, planning milestone, and final pre-event settlement.'],
  ['Extra Guests', 'Additional guests may require changes in seating, dining, service staff, and final package quote.'],
  ['Decoration Timing', 'Decoration setup timing is planned with the event team to avoid overlap with venue operations or other functions.'],
  ['Venue Access Time', 'Access timing depends on the selected venue space, event slot, decoration requirements, and package terms.'],
  ['Vendor Policy', 'Outside vendors may need prior approval, ID details, timing coordination, and safety compliance.'],
  ['Noise Regulations', 'Sound and music timings follow venue policy and local regulation guidelines for guest safety and comfort.'],
];
