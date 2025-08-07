const mongoose = require('mongoose');
const Investment = require('../models/investment.model');

const sampleInvestments = [
  {
    title: 'Ocean Front Villa',
    price: '₹1.95 Cr',
    size: '3500 sq.ft',
    bedrooms: '3 Bedrooms',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
    description: 'Luxurious oceanfront villa with private pool and direct beach access. Perfect for those seeking privacy and uninterrupted sea views.',
    features: ['Private Pool', 'Direct Beach Access', 'Landscaped Garden', 'Smart Home Tech', 'Luxury Furnishings'],
    status: 'available'
  },
  {
    title: 'Sunset View Residence',
    price: '₹1.45 Cr',
    size: '2800 sq.ft',
    bedrooms: '2 Bedrooms',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    description: 'Elevated property with stunning sunset views over the ocean and coastline. Modern architecture with floor-to-ceiling windows.',
    features: ['Infinity Edge Pool', 'Panoramic Views', 'Gourmet Kitchen', 'Home Office', 'Outdoor Dining'],
    status: 'available'
  },
  {
    title: 'Garden Retreat Villa',
    price: '₹95 Lakhs',
    size: '2200 sq.ft',
    bedrooms: '2 Bedrooms',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    description: 'Serene garden villa surrounded by lush tropical landscaping. Close to resort amenities with private courtyard.',
    features: ['Tropical Garden', 'Courtyard', 'Spa Bathroom', 'Outdoor Shower', 'Walk to Amenities'],
    status: 'available'
  }
];

const seedInvestments = async () => {
  try {
    await Investment.deleteMany({});
    await Investment.insertMany(sampleInvestments);
    console.log('Investments seeded successfully');
  } catch (error) {
    console.error('Error seeding investments:', error);
  }
};

module.exports = seedInvestments; 