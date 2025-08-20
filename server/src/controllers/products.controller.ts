import { Request, Response } from 'express';
import { pool } from '../config/db';

// Fallback data when database is not available
const sampleProducts = [
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

export const getProducts = async (req: Request, res: Response) => {
  const { brand, category, q } = req.query as { brand?: string; category?: string; q?: string };
  
  try {
    // Try database first
    let base = 'SELECT id, name, price, image, category, brand, stock, description FROM products WHERE 1=1';
    const values: any[] = [];

    if (brand) { values.push(brand); base += ` AND brand = $${values.length}`; }
    if (category) { values.push(category); base += ` AND category = $${values.length}`; }
    if (q) { values.push(`%${q}%`); base += ` AND (name ILIKE $${values.length} OR description ILIKE $${values.length})`; }

    const result = await pool.query(base + ' ORDER BY created_at DESC', values);
    res.json({ items: result.rows });
  } catch (err) {
    console.warn('Database query failed, using fallback data:', err);
    
    // Fallback to sample data with filters applied
    let filtered = [...sampleProducts];
    
    if (brand && brand !== 'All Brands') {
      filtered = filtered.filter(p => p.brand === brand);
    }
    if (category && category !== 'All Products') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (q) {
      const searchTerm = q.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        (p.description && p.description.toLowerCase().includes(searchTerm))
      );
    }
    
    res.json({ items: filtered });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    // Try database first
    const result = await pool.query('SELECT id, name, price, image, category, brand, stock, description FROM products WHERE id=$1', [id]);
    if (!result.rows.length) return res.status(404).json({ message: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.warn('Database query failed, using fallback data:', err);
    
    // Fallback to sample data
    const product = sampleProducts.find(p => p.id === id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  }
};