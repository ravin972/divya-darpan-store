import { pool } from './db';

// Sample product data matching frontend structure
const sampleProducts = [
  // Parivartan Brand Products
  {
    name: 'Sacred Ganesh Idol - Handcrafted Marble',
    price: 2500,
    image: '/src/assets/ganesh-idol.jpg',
    category: 'Idols & Statues',
    brand: 'Parivartan',
    stock: 12,
    description: 'Beautiful handcrafted Lord Ganesh idol made from pure white marble with intricate gold detailing.'
  },
  {
    name: 'Copper Pooja Thali Set - 7 Pieces',
    price: 1850,
    image: '/src/assets/copper-thali.jpg',
    category: 'Pooja Items',
    brand: 'Parivartan',
    stock: 25,
    description: 'Complete copper pooja thali set with all essential items for daily worship rituals.'
  },
  {
    name: 'Rudraksha Mala - 108 Beads',
    price: 750,
    image: '/src/assets/rudraksha-mala.jpg',
    category: 'Spiritual Jewelry',
    brand: 'Parivartan',
    stock: 45,
    description: 'Authentic 5-mukhi Rudraksha mala with 108 beads for meditation and spiritual practices.'
  },
  {
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
    name: 'Premium Incense Stick Collection',
    price: 480,
    image: '/src/assets/incense-collection.jpg',
    category: 'Incense & Fragrance',
    brand: 'Anandam',
    stock: 75,
    description: 'Collection of 12 different premium incense stick fragrances for creating divine atmosphere.'
  },
  {
    name: 'Crystal Meditation Pyramid',
    price: 1200,
    image: '/api/placeholder/400/400',
    category: 'Meditation',
    brand: 'Anandam',
    stock: 18,
    description: 'Clear quartz crystal pyramid for enhancing meditation and positive energy flow.'
  },
  {
    name: 'Silk Prayer Shawl - Handwoven',
    price: 950,
    image: '/api/placeholder/400/400',
    category: 'Clothing & Accessories',
    brand: 'Anandam',
    stock: 22,
    description: 'Elegant handwoven silk prayer shawl with traditional motifs and golden borders.'
  },
  {
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
    name: 'Complete Ganesh Chaturthi Kit',
    price: 3200,
    image: '/api/placeholder/400/400',
    category: 'Festival Kits',
    brand: 'Priest Booking',
    stock: 8,
    description: 'Everything needed for Ganesh Chaturthi celebrations including idol, decorations, and ritual items.'
  },
  {
    name: 'Graha Shanti Pooja Kit',
    price: 2800,
    image: '/api/placeholder/400/400',
    category: 'Ritual Kits',
    brand: 'Priest Booking',
    stock: 12,
    description: 'Complete kit for Graha Shanti pooja including all required items and detailed instruction guide.'
  },
  {
    name: 'Wedding Ceremony Essentials',
    price: 5500,
    image: '/api/placeholder/400/400',
    category: 'Wedding',
    brand: 'Priest Booking',
    stock: 5,
    description: 'Premium wedding ceremony kit with all traditional items required for Hindu wedding rituals.'
  },
  {
    name: 'Satyanarayan Pooja Complete Set',
    price: 1850,
    image: '/api/placeholder/400/400',
    category: 'Ritual Kits',
    brand: 'Priest Booking',
    stock: 20,
    description: 'Complete Satyanarayan pooja kit with all necessary items and prasad ingredients.'
  }
];

export async function seedProducts() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Check if products already exist
    const existingResult = await client.query('SELECT COUNT(*) FROM products');
    const existingCount = parseInt(existingResult.rows[0].count);
    
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} products. Skipping seed.`);
      await client.query('ROLLBACK');
      return;
    }

    console.log('Seeding products table...');
    
    for (const product of sampleProducts) {
      await client.query(
        `INSERT INTO products (name, price, image, category, brand, stock, description) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [product.name, product.price, product.image, product.category, product.brand, product.stock, product.description]
      );
    }
    
    console.log(`Successfully seeded ${sampleProducts.length} products!`);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding products:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function initDatabase() {
  const client = await pool.connect();
  try {
    console.log('Initializing database schema...');
    
    // Read and execute schema
    const fs = await import('fs');
    const path = await import('path');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await client.query(schema);
    console.log('Database schema initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function setupDatabase() {
  try {
    await initDatabase();
    await seedProducts();
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

// Allow direct execution
if (require.main === module) {
  setupDatabase().then(() => {
    console.log('Seed script completed!');
    process.exit(0);
  }).catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
  });
}