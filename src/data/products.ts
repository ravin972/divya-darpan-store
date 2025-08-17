import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  // Parivartan Brand Products
  {
    id: '1',
    name: 'Sacred Ganesh Idol - Handcrafted Marble',
    price: 2500,
    image: '/src/assets/ganesh-idol.jpg',
    category: 'Idols & Statues',
    brand: 'Parivartan',
    stock: 12,
    description: 'Beautiful handcrafted Lord Ganesh idol made from pure white marble with intricate gold detailing.'
  },
  {
    id: '2',
    name: 'Copper Pooja Thali Set - 7 Pieces',
    price: 1850,
    image: '/src/assets/copper-thali.jpg',
    category: 'Pooja Items',
    brand: 'Parivartan',
    stock: 25,
    description: 'Complete copper pooja thali set with all essential items for daily worship rituals.'
  },
  {
    id: '3',
    name: 'Rudraksha Mala - 108 Beads',
    price: 750,
    image: '/src/assets/rudraksha-mala.jpg',
    category: 'Spiritual Jewelry',
    brand: 'Parivartan',
    stock: 45,
    description: 'Authentic 5-mukhi Rudraksha mala with 108 beads for meditation and spiritual practices.'
  },
  {
    id: '4',
    name: 'Brass Diya Set - Traditional Oil Lamps',
    price: 650,
    image: '/src/assets/brass-diyas.jpg',
    category: 'Lighting',
    brand: 'Parivartan',
    stock: 30,
    description: 'Set of 5 beautiful brass diyas perfect for festivals and daily aarti.'
  },

  // Anandam Brand Products
  {
    id: '5',
    name: 'Premium Incense Stick Collection',
    price: 480,
    image: '/src/assets/incense-collection.jpg',
    category: 'Incense & Fragrance',
    brand: 'Anandam',
    stock: 75,
    description: 'Collection of 12 different premium incense stick fragrances for creating divine atmosphere.'
  },
  {
    id: '6',
    name: 'Crystal Meditation Pyramid',
    price: 1200,
    image: '/api/placeholder/400/400',
    category: 'Meditation',
    brand: 'Anandam',
    stock: 18,
    description: 'Clear quartz crystal pyramid for enhancing meditation and positive energy flow.'
  },
  {
    id: '7',
    name: 'Silk Prayer Shawl - Handwoven',
    price: 950,
    image: '/api/placeholder/400/400',
    category: 'Clothing & Accessories',
    brand: 'Anandam',
    stock: 22,
    description: 'Elegant handwoven silk prayer shawl with traditional motifs and golden borders.'
  },
  {
    id: '8',
    name: 'Tibetan Singing Bowl Set',
    price: 1650,
    image: '/api/placeholder/400/400',
    category: 'Sound Healing',
    brand: 'Anandam',
    stock: 15,
    description: 'Authentic Tibetan singing bowl with wooden striker for sound healing and meditation.'
  },

  // Priest Booking Kits
  {
    id: '9',
    name: 'Complete Ganesh Chaturthi Kit',
    price: 3200,
    image: '/api/placeholder/400/400',
    category: 'Festival Kits',
    brand: 'Priest Booking',
    stock: 8,
    description: 'Everything needed for Ganesh Chaturthi celebrations including idol, decorations, and ritual items.'
  },
  {
    id: '10',
    name: 'Graha Shanti Pooja Kit',
    price: 2800,
    image: '/api/placeholder/400/400',
    category: 'Ritual Kits',
    brand: 'Priest Booking',
    stock: 12,
    description: 'Complete kit for Graha Shanti pooja including all required items and detailed instruction guide.'
  },
  {
    id: '11',
    name: 'Wedding Ceremony Essentials',
    price: 5500,
    image: '/api/placeholder/400/400',
    category: 'Wedding',
    brand: 'Priest Booking',
    stock: 5,
    description: 'Premium wedding ceremony kit with all traditional items required for Hindu wedding rituals.'
  },
  {
    id: '12',
    name: 'Satyanarayan Pooja Complete Set',
    price: 1850,
    image: '/api/placeholder/400/400',
    category: 'Ritual Kits',
    brand: 'Priest Booking',
    stock: 20,
    description: 'Complete Satyanarayan pooja kit with all necessary items and prasad ingredients.'
  }
];

export const categories = [
  'All Products',
  'Idols & Statues',
  'Pooja Items',
  'Spiritual Jewelry',
  'Lighting',
  'Incense & Fragrance',
  'Meditation',
  'Clothing & Accessories',
  'Sound Healing',
  'Festival Kits',
  'Ritual Kits',
  'Wedding'
];

export const brands = ['All Brands', 'Parivartan', 'Anandam', 'Priest Booking'];