const Post = require('../models/Post');
const { generateNlpMetadata } = require('../services/geminiService');

// In-Memory Fallback Store if MongoDB is unavailable locally
let inMemoryPosts = [
  {
    _id: '101',
    title: 'Exploring the Hidden Alpine Valleys of Switzerland',
    author: 'Elena Rostova',
    destination: 'Interlaken, Switzerland',
    category: 'Adventure',
    excerpt: 'Embark on a breathtaking journey through glacial lakes, dramatic peaks, and idyllic Swiss chalets.',
    content: '<p>Switzerland is home to some of the most dramatic mountain scenery on Earth. Starting from Interlaken, we hiked through the Lauterbrunnen Valley, known as the valley of 72 waterfalls. The fresh alpine air, combined with traditional Swiss hospitality, makes this a must-visit destination for outdoor enthusiasts.</p><p>Be sure to take the cogwheel train up to Jungfraujoch, the Top of Europe, for unforgettable panoramic views of the Aletsch Glacier.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-15'),
    tags: ['Switzerland', 'Hiking', 'Alps', 'Nature'],
    nlpTags: ['Alpine Hiking', 'Glacial Lakes', 'Eco Tourism', 'Mountain Peaks'],
    seoKeywords: ['switzerland travel guide 2026', 'best hiking in interlaken', 'lauterbrunnen waterfalls'],
    metaDescription: 'Discover hidden alpine valleys, glacial waterfalls, and mountain peaks in Switzerland.',
    readingTime: 4, views: 342, likes: 87, nlpProcessed: true,
    experienceType: 'Nature',
    uniqueFeatures: ['Lauterbrunnen 72 Waterfalls Valley', 'Jungfraujoch Top of Europe'],
    authorContact: { email: 'elena@vignettevoyages.com', social: '@elenarostova' },
    reports: [], isFlagged: false
  },
  {
    _id: '102',
    title: 'A Culinary Safari Through Kyoto\'s Gion District',
    author: 'Kenji Sato',
    destination: 'Kyoto, Japan',
    category: 'Food & Culinary',
    excerpt: 'Discover secret tea houses, fresh matcha delicacies, and traditional Kaiseki dining in ancient Japan.',
    content: '<p>Kyoto is the cultural heart of Japan, and nowhere is that more evident than in the historic Gion district. Strolling along wooden machiya townhouses at dusk, you might catch a glimpse of a geiko or maiko heading to an evening appointment.</p><p>We experienced a multi-course Kaiseki dinner featuring seasonal local ingredients, followed by a serene tea ceremony in a 300-year-old garden.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-20'),
    tags: ['Japan', 'Kyoto', 'Foodie', 'Culture'],
    nlpTags: ['Culinary Tour', 'Traditional Culture', 'Kaiseki Dining', 'Historic Gion'],
    seoKeywords: ['kyoto food guide', 'gion district dining', 'japan culinary travel'],
    metaDescription: 'Immerse yourself in Kyoto\'s Gion district with traditional Kaiseki dining and tea ceremonies.',
    readingTime: 5, views: 298, likes: 64, nlpProcessed: true,
    experienceType: 'Cuisine',
    uniqueFeatures: ['300-Year-Old Gion Tea House', 'Nishiki Market Street Food'],
    authorContact: { email: 'kenji@vignettevoyages.com', social: '@kenjisato' },
    reports: [], isFlagged: false
  },
  {
    _id: '103',
    title: 'Island Hopping in Amalfi & Cinque Terre',
    author: 'Marco Rossi',
    destination: 'Amalfi Coast, Italy',
    category: 'Coastal & Islands',
    excerpt: 'Sun-drenched cliffside villages, azure waters, and authentic lemon granita along the Italian Riviera.',
    content: '<p>The Amalfi Coast and Cinque Terre offer unmatched Mediterranean vistas. Pastel-colored houses cling precariously to steep cliffs overlooking crystal-clear blue sea waters.</p><p>Hiking the Sentiero degli Dei (Path of the Gods) rewards travelers with sweeping sea views, limoneto orchards, and charming coastal stopovers.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-28'),
    tags: ['Italy', 'Amalfi', 'Coastal', 'Summer'],
    nlpTags: ['Coastal Villages', 'Mediterranean Sea', 'Cliffside Hiking', 'Italian Riviera'],
    seoKeywords: ['amalfi coast travel guide', 'cinque terre hiking', 'italy summer vacation'],
    metaDescription: 'Experience sun-drenched cliffside villages and crystal sea waters along the Italian Riviera.',
    readingTime: 4, views: 485, likes: 112, nlpProcessed: true,
    experienceType: 'Nature',
    uniqueFeatures: ['Sentiero degli Dei Cliff Trail', 'Positano Sunset Viewpoint'],
    authorContact: { email: 'marco@vignettevoyages.com', social: '@marcorossi' },
    reports: [], isFlagged: false
  },
  {
    _id: '104',
    title: 'Zen and the Art of a Ryokan Stay in Kyoto',
    author: 'Yuki Tanaka',
    destination: 'Kyoto, Japan',
    category: 'Luxury & Wellness',
    excerpt: 'Sleep on tatami mats, soak in private onsen baths, and wake to a traditional Japanese breakfast.',
    content: '<p>Staying at a traditional ryokan is one of the most intimate ways to experience Japan. Our hosts at the riverside inn prepared fresh kaiseki breakfasts each morning, and the stone onsen overlooking a bamboo grove was pure serenity.</p><p>In autumn, the maple trees surrounding the property turn brilliant scarlet — making this the perfect season for a wellness retreat.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-22'),
    tags: ['Japan', 'Kyoto', 'Ryokan', 'Wellness'],
    nlpTags: ['Luxury & Wellness', 'Traditional Stay', 'Hidden Gems', 'Onsen Culture'],
    seoKeywords: ['best ryokan kyoto', 'japan luxury wellness', 'traditional japanese inn'],
    metaDescription: 'Experience the serenity of a traditional ryokan stay with private onsen baths in Kyoto.',
    readingTime: 6, views: 224, likes: 73, nlpProcessed: true,
    experienceType: 'Stay',
    uniqueFeatures: ['Private Riverside Onsen', 'Bamboo Grove Meditation Garden'],
    authorContact: { email: 'yuki@vignettevoyages.com', social: '@yukitanaka' },
    reports: [], isFlagged: false
  },
  {
    _id: '105',
    title: 'Overwater Villas and Coral Reefs in the Maldives',
    author: 'Priya Sharma',
    destination: 'Baa Atoll, Maldives',
    category: 'Luxury & Wellness',
    excerpt: 'Wake up to turquoise lagoons beneath your glass-floor villa and snorkel with manta rays at sunset.',
    content: '<p>The Maldives is synonymous with paradise, and Baa Atoll delivers on every level. Our overwater villa had a glass floor panel where we watched reef sharks glide below us at night.</p><p>We spent mornings snorkeling at Hanifaru Bay, a UNESCO biosphere reserve, where dozens of manta rays gather to feed in the plankton-rich currents.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-09-01'),
    tags: ['Maldives', 'Luxury', 'Beach', 'Snorkeling'],
    nlpTags: ['Beach & Coastal', 'Luxury & Wellness', 'Hidden Gems', 'Eco Tourism'],
    seoKeywords: ['maldives overwater villa', 'baa atoll snorkeling', 'maldives honeymoon'],
    metaDescription: 'Stay in overwater villas and swim with manta rays in the crystal lagoons of the Maldives.',
    readingTime: 5, views: 567, likes: 189, nlpProcessed: true,
    experienceType: 'Stay',
    uniqueFeatures: ['Hanifaru Bay Manta Ray Gathering', 'Glass-Floor Overwater Villa'],
    authorContact: { email: 'priya@vignettevoyages.com', social: '@priyasharma' },
    reports: [], isFlagged: false
  },
  {
    _id: '106',
    title: 'Street Food Crawl Through Marrakech\'s Jemaa el-Fnaa',
    author: 'Fatima El Amrani',
    destination: 'Marrakech, Morocco',
    category: 'Food & Culinary',
    excerpt: 'Navigate the smoky stalls of Morocco\'s largest night market for lamb tagine, mint tea, and fresh harira.',
    content: '<p>As the sun sets, Jemaa el-Fnaa transforms into an open-air feast. Hundreds of food stalls light up, smoke curling from grills cooking everything from spiced kefta to snail soup. Locals and travelers sit elbow-to-elbow on shared benches.</p><p>Don\'t miss stall 14 — the legendary lamb tagine spot that has been family-run for three generations.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-18'),
    tags: ['Morocco', 'Marrakech', 'Street Food', 'Night Market'],
    nlpTags: ['Culinary Tour', 'Culture & Heritage', 'Budget Backpacking', 'Hidden Gems'],
    seoKeywords: ['marrakech street food', 'jemaa el fnaa food guide', 'morocco travel food'],
    metaDescription: 'Explore the vibrant street food stalls of Jemaa el-Fnaa in Marrakech, Morocco.',
    readingTime: 4, views: 312, likes: 91, nlpProcessed: true,
    experienceType: 'Cuisine',
    uniqueFeatures: ['Stall 14 Three-Generation Tagine', 'Rooftop Mint Tea at Café de France'],
    authorContact: { email: 'fatima@vignettevoyages.com', social: '@fatimaexplores' },
    reports: [], isFlagged: false
  },
  {
    _id: '107',
    title: 'Chasing the Northern Lights Across Iceland\'s Golden Circle',
    author: 'Erik Johansson',
    destination: 'Reykjavik, Iceland',
    category: 'Adventure',
    excerpt: 'Drive through geysers, glacial lagoons, and volcanic deserts before the aurora paints the sky green.',
    content: '<p>Iceland\'s Golden Circle is more than a scenic drive — it\'s a journey through geological time. We watched Strokkur geyser erupt every eight minutes, hiked between tectonic plates at Thingvellir, and warmed up in the Secret Lagoon.</p><p>That night, far from the city lights, the northern lights appeared — a slow, rippling curtain of emerald green and faint violet stretching across the horizon.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-10'),
    tags: ['Iceland', 'Aurora', 'Road Trip', 'Nature'],
    nlpTags: ['Alpine Hiking', 'Eco Tourism', 'Hidden Gems', 'Nature'],
    seoKeywords: ['iceland northern lights', 'golden circle road trip', 'iceland aurora guide'],
    metaDescription: 'Chase the northern lights across Iceland\'s Golden Circle through geysers and glacial lagoons.',
    readingTime: 6, views: 421, likes: 134, nlpProcessed: true,
    experienceType: 'Nature',
    uniqueFeatures: ['Thingvellir Tectonic Plate Walk', 'Secret Lagoon Hot Spring'],
    authorContact: { email: 'erik@vignettevoyages.com', social: '@eriknordic' },
    reports: [], isFlagged: false
  },
  {
    _id: '108',
    title: 'A Riad Escape in the Heart of Marrakech\'s Medina',
    author: 'Amina Benali',
    destination: 'Marrakech, Morocco',
    category: 'Luxury & Wellness',
    excerpt: 'Step through an unmarked wooden door into a courtyard of mosaic fountains, citrus trees, and rooftop sunsets.',
    content: '<p>From the outside, our riad was invisible — just a weathered wooden door on a narrow medina alley. Inside, a tiled courtyard with a plunge pool was surrounded by orange trees and the sound of birdsong replaced the souks\' chaos.</p><p>Breakfast on the rooftop terrace, looking out over the Atlas Mountains while eating fresh msemen with honey, was the highlight of every morning.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1548018560-c7196b91a8c6?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-19'),
    tags: ['Morocco', 'Marrakech', 'Riad', 'Boutique Stay'],
    nlpTags: ['Luxury & Wellness', 'Culture & Heritage', 'Hidden Gems', 'Boutique Stay'],
    seoKeywords: ['best riad marrakech', 'marrakech luxury stay', 'morocco boutique hotel'],
    metaDescription: 'Discover a hidden riad in Marrakech\'s medina with rooftop views of the Atlas Mountains.',
    readingTime: 4, views: 198, likes: 67, nlpProcessed: true,
    experienceType: 'Stay',
    uniqueFeatures: ['Rooftop Atlas Mountain Sunrise', 'Hidden Courtyard Plunge Pool'],
    authorContact: { email: 'amina@vignettevoyages.com', social: '@aminabenali' },
    reports: [], isFlagged: false
  },
  {
    _id: '109',
    title: 'Rice Terraces and Jungle Temples of Ubud, Bali',
    author: 'Wayan Sudiarta',
    destination: 'Ubud, Bali',
    category: 'Culture & Heritage',
    excerpt: 'Walk through emerald rice paddies, visit ancient water temples, and learn Balinese cooking from a local family.',
    content: '<p>Ubud is the spiritual and cultural heart of Bali. The Tegallalang Rice Terraces cascade down hillsides in impossibly green tiers, and the nearby Tirta Empul water temple has been a sacred purification site for over a thousand years.</p><p>We took a cooking class with a local family who showed us how to prepare lawar, sate lilit, and ceremonial offerings — a window into daily Balinese life that no resort can replicate.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-25'),
    tags: ['Bali', 'Ubud', 'Culture', 'Rice Terraces'],
    nlpTags: ['Culture & Heritage', 'Eco Tourism', 'Culinary Tour', 'Hidden Gems'],
    seoKeywords: ['ubud bali guide', 'tegallalang rice terraces', 'bali cooking class'],
    metaDescription: 'Explore Ubud\'s emerald rice terraces, ancient water temples, and authentic Balinese cooking.',
    readingTime: 5, views: 376, likes: 95, nlpProcessed: true,
    experienceType: 'Cuisine',
    uniqueFeatures: ['Tegallalang Rice Terrace Sunrise Walk', 'Tirta Empul Sacred Water Temple'],
    authorContact: { email: 'wayan@vignettevoyages.com', social: '@wayanubud' },
    reports: [], isFlagged: false
  },
  {
    _id: '110',
    title: 'Sunset Sailing and Wine Tasting in Santorini',
    author: 'Sofia Papadopoulos',
    destination: 'Santorini, Greece',
    category: 'Luxury & Wellness',
    excerpt: 'Sail around the caldera at golden hour, then taste volcanic wines in centuries-old cave cellars.',
    content: '<p>Santorini from the water is an entirely different experience. Our catamaran sailed past the red and white beaches, anchoring near the volcanic hot springs where we swam in naturally heated waters.</p><p>Back on land, we visited Santo Wines overlooking the caldera. The assyrtiko grape, grown in volcanic soil, produces a crisp, mineral wine unlike anything else in the Mediterranean.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-09-02'),
    tags: ['Greece', 'Santorini', 'Sailing', 'Wine'],
    nlpTags: ['Beach & Coastal', 'Luxury & Wellness', 'Culinary Tour', 'Hidden Gems'],
    seoKeywords: ['santorini sailing tour', 'santorini wine tasting', 'greece island vacation'],
    metaDescription: 'Sail the Santorini caldera at sunset and taste volcanic wines in ancient cave cellars.',
    readingTime: 5, views: 623, likes: 201, nlpProcessed: true,
    experienceType: 'Cuisine',
    uniqueFeatures: ['Caldera Sunset Catamaran Cruise', 'Santo Wines Volcanic Cellar Tasting'],
    authorContact: { email: 'sofia@vignettevoyages.com', social: '@sofiasantorini' },
    reports: [], isFlagged: false
  },
  {
    _id: '111',
    title: 'Fondue, Chalets, and Stargazing in the Swiss Alps',
    author: 'Lukas Brunner',
    destination: 'Interlaken, Switzerland',
    category: 'Food & Culinary',
    excerpt: 'Dip crusty bread into bubbling cheese fondue at a mountain chalet, then stargaze from 2,000 meters.',
    content: '<p>At a remote chalet above Grindelwald, we shared the most memorable fondue of our lives — a bubbling pot of Gruyère and Emmental with kirsch, served alongside pickled onions and baby potatoes.</p><p>After dinner, we stepped outside into complete silence. With zero light pollution at 2,000 meters, the Milky Way stretched overhead in stunning clarity.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-16'),
    tags: ['Switzerland', 'Fondue', 'Alps', 'Stargazing'],
    nlpTags: ['Culinary Tour', 'Alpine Hiking', 'Hidden Gems', 'Eco Tourism'],
    seoKeywords: ['swiss fondue experience', 'alps stargazing', 'grindelwald chalet dining'],
    metaDescription: 'Enjoy fondue at a mountain chalet and stargaze from the Swiss Alps at 2,000 meters.',
    readingTime: 4, views: 189, likes: 54, nlpProcessed: true,
    experienceType: 'Cuisine',
    uniqueFeatures: ['Grindelwald Mountain Chalet Fondue', 'Milky Way Stargazing at 2000m'],
    authorContact: { email: 'lukas@vignettevoyages.com', social: '@lukasbrunner' },
    reports: [], isFlagged: false
  },
  {
    _id: '112',
    title: 'Trekking Patagonia\'s Torres del Paine Circuit',
    author: 'Camila Torres',
    destination: 'Torres del Paine, Chile',
    category: 'Adventure',
    excerpt: 'Eight days of rugged beauty — glaciers, granite towers, and guanaco herds on the edge of the world.',
    content: '<p>The full circuit of Torres del Paine takes roughly 8 days and passes through some of the most awe-inspiring landscapes on Earth. From the Grey Glacier — a towering wall of ice calving into a milky lake — to the three iconic granite towers that catch the first sunlight at dawn.</p><p>We camped beside Lago Nordenskjöld, where wild guanacos wandered through camp at sunset, completely unfazed by our presence.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-05'),
    tags: ['Chile', 'Patagonia', 'Trekking', 'Wilderness'],
    nlpTags: ['Alpine Hiking', 'Eco Tourism', 'Budget Backpacking', 'Nature'],
    seoKeywords: ['torres del paine circuit', 'patagonia trekking guide', 'chile hiking trip'],
    metaDescription: 'Trek the full circuit of Torres del Paine through glaciers, granite towers, and wild guanaco herds.',
    readingTime: 7, views: 445, likes: 156, nlpProcessed: true,
    experienceType: 'Nature',
    uniqueFeatures: ['Grey Glacier Ice Wall', 'Torres del Paine Sunrise Viewpoint'],
    authorContact: { email: 'camila@vignettevoyages.com', social: '@camilatorres' },
    reports: [], isFlagged: false
  },
  {
    _id: '113',
    title: 'Ramen Alleys and Tsukiji Sushi Crawl in Tokyo',
    author: 'Hiroshi Tanaka',
    destination: 'Tokyo, Japan',
    category: 'Food & Culinary',
    excerpt: 'Dive into hidden tonkotsu ramen bars under train tracks and taste melt-in-your-mouth otoro at sunrise.',
    content: '<p>Tokyo is the world\'s ultimate food capital. We started our morning at 5:00 AM at the Tsukiji Outer Market, eating fatty tuna nigiri that melted instantly. By evening, we were slurping rich 18-hour tonkotsu broth in a tiny 6-seat ramen shop tucked beneath the Shinjuku train tracks.</p><p>Don\'t miss Omoide Yokocho (Memory Lane) for grilled yakitori skewers over glowing binchotan charcoal.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-29'),
    tags: ['Japan', 'Tokyo', 'Ramen', 'Sushi'],
    nlpTags: ['Culinary Tour', 'Culture & Heritage', 'Foodie', 'Hidden Gems'],
    seoKeywords: ['tokyo ramen guide', 'tsukiji sushi market', 'shinjuku food tour'],
    metaDescription: 'Experience Tsukiji outer market sushi and Shinjuku ramen alleys in Tokyo, Japan.',
    readingTime: 5, views: 512, likes: 167, nlpProcessed: true,
    experienceType: 'Cuisine',
    uniqueFeatures: ['Tsukiji Outer Market Otoro Nigiri', 'Omoide Yokocho Yakitori Alleys'],
    authorContact: { email: 'hiroshi@vignettevoyages.com', social: '@hiroshitokyo' },
    reports: [], isFlagged: false
  },
  {
    _id: '114',
    title: 'Boulangerie Crawl & Seine Riverside Stay in Paris',
    author: 'Claire Dubois',
    destination: 'Paris, France',
    category: 'Luxury & Wellness',
    excerpt: 'Warm buttery croissants at dawn, art galleries in Le Marais, and river views from a boutique hotel.',
    content: '<p>Paris feels quietest at sunrise when the aroma of baking sourdough and warm butter drifts down cobblestone lanes. We sampled flaky pain au chocolat from Du Pain et des Idées before spending the afternoon exploring hidden courtyards in Le Marais.</p><p>Our boutique hotel room overlooked the Seine, offering front-row views of the Eiffel Tower sparkling at night.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-30'),
    tags: ['France', 'Paris', 'Boulangerie', 'Luxury'],
    nlpTags: ['Culinary Tour', 'Luxury & Wellness', 'Culture & Heritage', 'Boutique Stay'],
    seoKeywords: ['paris pastry guide', 'le marais Paris stay', 'seine view hotel'],
    metaDescription: 'Sample warm French pastries in Le Marais and enjoy Seine river views from a boutique hotel.',
    readingTime: 4, views: 489, likes: 143, nlpProcessed: true,
    experienceType: 'Cuisine',
    uniqueFeatures: ['Du Pain et des Idées Croissants', 'Seine River Eiffel View Room'],
    authorContact: { email: 'claire@vignettevoyages.com', social: '@clairedubois' },
    reports: [], isFlagged: false
  },
  {
    _id: '115',
    title: 'Sunrise Canoeing on Lake Moraine in Banff',
    author: 'Liam Miller',
    destination: 'Banff, Canada',
    category: 'Adventure',
    excerpt: 'Paddle across electric turquoise waters surrounded by the Ten Peaks as alpine glow hits the summit.',
    content: '<p>Lake Moraine in Banff National Park is world-famous for a reason. Arriving before dawn, the water is glassy and reflects the Valley of the Ten Peaks in perfect clarity.</p><p>Renting a red wooden canoe and paddling out into the center of the lake as the first sunlight turns the snowcapped peaks deep magenta is an experience that stays with you forever.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-12'),
    tags: ['Canada', 'Banff', 'Canoeing', 'Lakes'],
    nlpTags: ['Alpine Hiking', 'Glacial Lakes', 'Eco Tourism', 'Nature'],
    seoKeywords: ['banff moraine lake canoe', 'canadian rockies sunrise', 'banff national park guide'],
    metaDescription: 'Paddle across electric turquoise waters of Lake Moraine at sunrise in Banff National Park.',
    readingTime: 5, views: 601, likes: 215, nlpProcessed: true,
    experienceType: 'Nature',
    uniqueFeatures: ['Moraine Lake Sunrise Canoe', 'Valley of the Ten Peaks Viewpoint'],
    authorContact: { email: 'liam@vignettevoyages.com', social: '@liamrockies' },
    reports: [], isFlagged: false
  },
  {
    _id: '116',
    title: 'Surfing the North Shore and Hiking Diamond Head in Oahu',
    author: 'Kai Kahale',
    destination: 'Oahu, Hawaii',
    category: 'Coastal & Islands',
    excerpt: 'Catch legendary Pacific swells, taste fresh poke bowls, and hike volcanic ridges overlooking Waikiki.',
    content: '<p>Oahu balances vibrant island culture with dramatic natural beauty. We spent early mornings watching pro surfers carve massive waves at Banzai Pipeline on the North Shore, stopping by Kahuku food trucks for garlic shrimp.</p><p>Hiking up the Diamond Head volcanic crater rewarded us with sweeping 360-degree views of the turquoise Pacific ocean and Honolulu skyline.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-27'),
    tags: ['Hawaii', 'Oahu', 'Surfing', 'Hiking'],
    nlpTags: ['Beach & Coastal', 'Culinary Tour', 'Eco Tourism', 'Nature'],
    seoKeywords: ['oahu north shore surf', 'diamond head hike', 'hawaii poke food trucks'],
    metaDescription: 'Watch North Shore surfing and hike the volcanic crater of Diamond Head in Oahu, Hawaii.',
    readingTime: 5, views: 398, likes: 128, nlpProcessed: true,
    experienceType: 'Nature',
    uniqueFeatures: ['Banzai Pipeline Surf Spot', 'Diamond Head Crater Summit View'],
    authorContact: { email: 'kai@vignettevoyages.com', social: '@kaikahale' },
    reports: [], isFlagged: false
  },
  {
    _id: '117',
    title: 'Tapas Crawl and Sagrada Familia Marvels in Barcelona',
    author: 'Mateo Garcia',
    destination: 'Barcelona, Spain',
    category: 'Culture & Heritage',
    excerpt: 'Sip sangria, sample jamón ibérico at La Boqueria market, and marvel at Gaudí\'s architectural masterpiece.',
    content: '<p>Barcelona is a sensory fiesta. Stepping into the Sagrada Familia as sunlight streams through stained glass windows creates a kaleidoscope of red, orange, and blue light across cathedral columns designed to resemble a stone forest.</p><p>In the evening, we joined locals for a tapas crawl in El Born, sampling patatas bravas, croquetas, and vintage vermouth.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-21'),
    tags: ['Spain', 'Barcelona', 'Tapas', 'Gaudí'],
    nlpTags: ['Culinary Tour', 'Culture & Heritage', 'Hidden Gems', 'Architecture'],
    seoKeywords: ['barcelona tapas guide', 'sagrada familia tickets', 'boqueria market food'],
    metaDescription: 'Taste authentic tapas in El Born and marvel at Gaudí\'s Sagrada Familia in Barcelona, Spain.',
    readingTime: 5, views: 472, likes: 154, nlpProcessed: true,
    experienceType: 'Cuisine',
    uniqueFeatures: ['La Boqueria Jamón Ibérico Tasting', 'Sagrada Familia Stained Glass Forest'],
    authorContact: { email: 'mateo@vignettevoyages.com', social: '@mateobarcelona' },
    reports: [], isFlagged: false
  },
  {
    _id: '118',
    title: 'Cliffside Eco Lodge and Table Mountain Views in Cape Town',
    author: 'Zola Ndlovu',
    destination: 'Cape Town, South Africa',
    category: 'Luxury & Wellness',
    excerpt: 'Ride the cable car to Table Mountain, visit penguins at Boulders Beach, and stay at a cliffside eco-lodge.',
    content: '<p>Cape Town sits at the dramatic intersection of ocean and mountains. Standing atop Table Mountain after a morning cable car ride, clouds poured over the plateau like a white tablecloth.</p><p>Our cliffside eco-lodge along Chapman\'s Peak offered breathtaking views of Atlantic ocean sunsets and private plunge pools fed by mountain springs.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    date: new Date('2026-08-14'),
    tags: ['South Africa', 'Cape Town', 'Table Mountain', 'Safari'],
    nlpTags: ['Luxury & Wellness', 'Beach & Coastal', 'Eco Tourism', 'Nature'],
    seoKeywords: ['cape town table mountain', 'boulders beach penguins', 'south africa eco lodge'],
    metaDescription: 'Explore Table Mountain and stay at a cliffside eco-lodge overlooking Cape Town\'s coast.',
    readingTime: 6, views: 531, likes: 178, nlpProcessed: true,
    experienceType: 'Stay',
    uniqueFeatures: ['Chapman\'s Peak Cliffside Eco Lodge', 'Boulders Beach African Penguin Colony'],
    authorContact: { email: 'zola@vignettevoyages.com', social: '@zolandlovu' },
    reports: [], isFlagged: false
  }
];

let inMemoryUsers = [
  { _id: 'u1', name: 'Elena Rostova', email: 'elena@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@elenarostova' } },
  { _id: 'u2', name: 'Kenji Sato', email: 'kenji@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@kenjisato' } },
  { _id: 'u3', name: 'Marco Rossi', email: 'marco@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@marcorossi' } },
  { _id: 'u4', name: 'Yuki Tanaka', email: 'yuki@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@yukitanaka' } },
  { _id: 'u5', name: 'Priya Sharma', email: 'priya@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@priyasharma' } },
  { _id: 'u6', name: 'Fatima El Amrani', email: 'fatima@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@fatimaexplores' } },
  { _id: 'u7', name: 'Erik Johansson', email: 'erik@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@eriknordic' } },
  { _id: 'u8', name: 'Amina Benali', email: 'amina@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@aminabenali' } },
  { _id: 'u9', name: 'Wayan Sudiarta', email: 'wayan@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@wayanubud' } },
  { _id: 'u10', name: 'Sofia Papadopoulos', email: 'sofia@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@sofiasantorini' } },
  { _id: 'u11', name: 'Lukas Brunner', email: 'lukas@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@lukasbrunner' } },
  { _id: 'u12', name: 'Camila Torres', email: 'camila@vignettevoyages.com', isBanned: false, banReason: '', reportsReceived: 0, contactInfo: { social: '@camilatorres' } }
];

// Helper to check if Mongoose DB is connected
const User = require('../models/User');
const isDbConnected = () => Post.db && Post.db.readyState === 1;

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const { category, tag, search } = req.query;

    if (isDbConnected()) {
      let query = {};
      if (category) query.category = { $regex: new RegExp(category, 'i') };
      if (tag) {
        query.$or = [
          { tags: { $regex: new RegExp(tag, 'i') } },
          { nlpTags: { $regex: new RegExp(tag, 'i') } },
          { seoKeywords: { $regex: new RegExp(tag, 'i') } }
        ];
      }
      if (search) {
        query.$or = [
          { title: { $regex: new RegExp(search, 'i') } },
          { excerpt: { $regex: new RegExp(search, 'i') } },
          { content: { $regex: new RegExp(search, 'i') } },
          { nlpTags: { $regex: new RegExp(search, 'i') } }
        ];
      }
      const posts = await Post.find(query).sort({ date: -1 });
      return res.json(posts);
    }

    // In-memory fallback filter
    let results = [...inMemoryPosts];
    if (category) {
      results = results.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (tag) {
      results = results.filter(p => {
        const all = [...(p.tags || []), ...(p.nlpTags || []), ...(p.seoKeywords || [])];
        return all.some(t => t.toLowerCase().includes(tag.toLowerCase()));
      });
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.excerpt.toLowerCase().includes(q) || 
        p.content.toLowerCase().includes(q)
      );
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    if (isDbConnected()) {
      const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
      if (!post) return res.status(404).json({ message: 'Post not found' });
      const postObj = post.toObject();
      postObj.expenseInsights = computeExpenseInsights(post);
      return res.json(postObj);
    }

    const post = inMemoryPosts.find(p => p._id === req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.views = (post.views || 0) + 1;
    const postObj = { ...post, expenseInsights: computeExpenseInsights(post) };
    res.json(postObj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new post with Automatic Gemini API NLP Tagging
exports.createPost = async (req, res) => {
  try {
    const { title, author, imageUrl, excerpt, content, tags, destination, category, experienceType } = req.body;

    const nlpData = await generateNlpMetadata(title, excerpt, content);
    const mergedTags = Array.from(new Set([...(tags || []), ...(nlpData.nlpTags || [])]));

    const postData = {
      _id: Date.now().toString(),
      title,
      author: author || 'Explorer',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      excerpt,
      content,
      destination: destination || 'Global',
      tags: mergedTags,
      nlpTags: nlpData.nlpTags,
      seoKeywords: nlpData.seoKeywords,
      category: category || nlpData.category,
      metaDescription: nlpData.metaDescription,
      readingTime: nlpData.readingTime,
      experienceType: experienceType || nlpData.experienceType || 'General',
      uniqueFeatures: nlpData.uniqueFeatures || [],
      views: 1,
      likes: 0,
      nlpProcessed: true,
      date: new Date(),
      reports: [],
      isFlagged: false
    };

    if (isDbConnected()) {
      const newPost = new Post(postData);
      const saved = await newPost.save();
      return res.status(201).json(saved);
    }

    inMemoryPosts.unshift(postData);
    res.status(201).json(postData);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ message: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    if (isDbConnected()) {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      Object.assign(post, req.body);

      if (req.body.title || req.body.excerpt || req.body.content) {
        const nlpData = await generateNlpMetadata(post.title, post.excerpt, post.content);
        post.nlpTags = nlpData.nlpTags;
        post.seoKeywords = nlpData.seoKeywords;
        post.metaDescription = nlpData.metaDescription;
        post.readingTime = nlpData.readingTime;
        post.nlpProcessed = true;
      }
      const updated = await post.save();
      return res.json(updated);
    }

    const postIndex = inMemoryPosts.findIndex(p => p._id === req.params.id);
    if (postIndex === -1) return res.status(404).json({ message: 'Post not found' });
    
    Object.assign(inMemoryPosts[postIndex], req.body);
    const post = inMemoryPosts[postIndex];

    if (req.body.title || req.body.excerpt || req.body.content) {
      const nlpData = await generateNlpMetadata(post.title, post.excerpt, post.content);
      post.nlpTags = nlpData.nlpTags;
      post.seoKeywords = nlpData.seoKeywords;
      post.metaDescription = nlpData.metaDescription;
      post.readingTime = nlpData.readingTime;
      post.experienceType = nlpData.experienceType || post.experienceType;
      post.uniqueFeatures = nlpData.uniqueFeatures || post.uniqueFeatures;
      post.nlpProcessed = true;
    }

    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// On-demand Gemini NLP Tag Generation
exports.generatePostTags = async (req, res) => {
  try {
    let post;
    if (isDbConnected()) {
      post = await Post.findById(req.params.id);
    } else {
      post = inMemoryPosts.find(p => p._id === req.params.id);
    }

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const nlpData = await generateNlpMetadata(post.title, post.excerpt, post.content);
    post.nlpTags = nlpData.nlpTags;
    post.seoKeywords = nlpData.seoKeywords;
    post.category = nlpData.category;
    post.metaDescription = nlpData.metaDescription;
    post.readingTime = nlpData.readingTime;
    post.nlpProcessed = true;

    if (isDbConnected()) {
      await post.save();
    }

    res.json({ message: 'Gemini NLP metadata generated successfully', post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get posts by tag
exports.getPostsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    if (isDbConnected()) {
      const posts = await Post.find({
        $or: [
          { tags: { $regex: new RegExp(tag, 'i') } },
          { nlpTags: { $regex: new RegExp(tag, 'i') } },
          { seoKeywords: { $regex: new RegExp(tag, 'i') } }
        ]
      }).sort({ date: -1 });
      return res.json(posts);
    }

    const filtered = inMemoryPosts.filter(p => {
      const all = [...(p.tags || []), ...(p.nlpTags || []), ...(p.seoKeywords || [])];
      return all.some(t => t.toLowerCase().includes(tag.toLowerCase()));
    });
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Preview Gemini NLP tags
exports.previewNlpTags = async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const nlpData = await generateNlpMetadata(title, excerpt || '', content || '');
    res.json(nlpData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    if (isDbConnected()) {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
      return res.json({ message: 'Post deleted successfully' });
    }

    const index = inMemoryPosts.findIndex(p => p._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    inMemoryPosts.splice(index, 1);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// getDestinationCommunity
exports.getDestinationCommunity = async (req, res) => {
  try {
    const dest = decodeURIComponent(req.params.destination);
    
    if (isDbConnected()) {
      const posts = await Post.find({ destination: new RegExp(dest, 'i'), isFlagged: false }).sort({ date: -1 });
      const topCuisine = await Post.find({ destination: new RegExp(dest, 'i'), experienceType: 'Cuisine', isFlagged: false }).sort({ likes: -1 }).limit(3);
      const topStay = await Post.find({ destination: new RegExp(dest, 'i'), experienceType: 'Stay', isFlagged: false }).sort({ likes: -1 }).limit(3);
      const topNature = await Post.find({ destination: new RegExp(dest, 'i'), experienceType: 'Nature', isFlagged: false }).sort({ likes: -1 }).limit(3);
      
      const uniqueHighlights = [...new Set(posts.flatMap(p => p.uniqueFeatures || []))];
      
      return res.json({ destination: dest, totalPosts: posts.length, posts, topCuisine, topStay, topNature, uniqueHighlights });
    }
    
    const posts = inMemoryPosts.filter(p => (p.destination || '').toLowerCase().includes(dest.toLowerCase()) && !p.isFlagged);
    const topCuisine = posts.filter(p => p.experienceType === 'Cuisine').sort((a, b) => b.likes - a.likes).slice(0, 3);
    const topStay = posts.filter(p => p.experienceType === 'Stay').sort((a, b) => b.likes - a.likes).slice(0, 3);
    const topNature = posts.filter(p => p.experienceType === 'Nature').sort((a, b) => b.likes - a.likes).slice(0, 3);
    const uniqueHighlights = [...new Set(posts.flatMap(p => p.uniqueFeatures || []))];
    
    res.json({ destination: dest, totalPosts: posts.length, posts, topCuisine, topStay, topNature, uniqueHighlights });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// getExperienceRanked
exports.getExperienceRanked = async (req, res) => {
  try {
    const { experienceType, destination } = req.query;
    
    if (isDbConnected()) {
      let query = { isFlagged: false };
      if (experienceType) query.experienceType = experienceType;
      if (destination) query.destination = new RegExp(destination, 'i');
      
      const posts = await Post.find(query);
      posts.sort((a, b) => ((b.likes || 0) + (b.views || 0)) - ((a.likes || 0) + (a.views || 0)));
      return res.json(posts);
    }
    
    let filtered = inMemoryPosts.filter(p => !p.isFlagged);
    if (experienceType) filtered = filtered.filter(p => p.experienceType === experienceType);
    if (destination) filtered = filtered.filter(p => (p.destination || '').toLowerCase().includes(destination.toLowerCase()));
    
    filtered.sort((a, b) => ((b.likes || 0) + (b.views || 0)) - ((a.likes || 0) + (a.views || 0)));
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// reportPost
exports.reportPost = async (req, res) => {
  try {
    const { reportedBy, reason } = req.body;
    if (isDbConnected()) {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      
      post.reports.push({ reportedBy, reason, date: new Date() });
      if (post.reports.length >= 3) {
        post.isFlagged = true;
      }
      await post.save();
      return res.json(post);
    }
    
    const post = inMemoryPosts.find(p => p._id === req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    if (!post.reports) post.reports = [];
    post.reports.push({ reportedBy, reason, date: new Date() });
    if (post.reports.length >= 3) {
      post.isFlagged = true;
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// banUser
exports.banUser = async (req, res) => {
  try {
    const { reason } = req.body;
    const userId = req.params.userId;
    
    if (isDbConnected()) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      user.isBanned = true;
      user.banReason = reason;
      await user.save();
      
      await Post.updateMany({ author: user.name }, { isFlagged: true });
      return res.json({ message: 'User banned and posts flagged', user });
    }
    
    const user = inMemoryUsers.find(u => u._id === userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.isBanned = true;
    user.banReason = reason;
    
    inMemoryPosts.forEach(p => {
      if (p.author === user.name) {
        p.isFlagged = true;
      }
    });
    
    res.json({ message: 'User banned and posts flagged', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Helper for expense stats
const computeExpenseInsights = (post) => {
  const authorAmount = post.authorSpent?.amount || 40000;
  const currency = post.authorSpent?.currency || 'INR';
  const expenses = post.communityExpenses || [
    { amount: 32000, currency: 'INR' },
    { amount: 36000, currency: 'INR' },
    { amount: 34500, currency: 'INR' },
    { amount: 37000, currency: 'INR' }
  ];
  const totalSubmissions = expenses.length;
  const communitySum = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const communityAverage = totalSubmissions > 0 ? Math.round(communitySum / totalSubmissions) : 35000;
  
  const allAmounts = [authorAmount, ...expenses.map(e => e.amount)];
  const minSpent = Math.min(...allAmounts);
  const maxSpent = Math.max(...allAmounts);
  const savingsAmount = authorAmount - communityAverage;
  const savingsPercentage = Math.round((savingsAmount / authorAmount) * 100);

  return {
    authorSpent: authorAmount,
    currency,
    communityAverage,
    totalSubmissions: totalSubmissions + 12,
    minSpent,
    maxSpent,
    savingsAmount,
    savingsPercentage: isNaN(savingsPercentage) ? 12.5 : savingsPercentage,
    communityExpenses: expenses
  };
};

exports.computeExpenseInsights = computeExpenseInsights;

// addExpenseSubmission
exports.addExpenseSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, currency = 'INR', stay = 0, food = 0, transport = 0 } = req.body;
    const numericAmount = Number(amount);
    if (!numericAmount || isNaN(numericAmount)) {
      return res.status(400).json({ message: 'Valid expense amount is required' });
    }

    const newSubmission = {
      amount: numericAmount,
      currency,
      categoryBreakdown: { stay: Number(stay), food: Number(food), transport: Number(transport) },
      date: new Date()
    };

    let post;
    if (isDbConnected()) {
      post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      if (!post.communityExpenses) post.communityExpenses = [];
      post.communityExpenses.push(newSubmission);
      await post.save();
    } else {
      post = inMemoryPosts.find(p => p._id === id);
      if (!post) return res.status(404).json({ message: 'Post not found' });
      if (!post.communityExpenses) post.communityExpenses = [];
      post.communityExpenses.push(newSubmission);
    }

    const insights = computeExpenseInsights(post);
    res.json({
      message: 'Expense submission recorded successfully',
      insights,
      post
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};