const Tourism = require('../models/tourism.model');

const tourismPackages = [
  {
    title: "Ananta/Holiday Destination",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1780&auto=format&fit=crop",
    alt: "Holiday Resort",
    quote: "Boundless Serenity, Infinite Memories.",
    price: "₹45,000",
    description: "Immerse yourself in the natural beauty of pristine beaches and serene landscapes.",
    duration: "3-7 Days",
    features: [
      "Luxury beach-front accommodation",
      "Guided tours to local attractions", 
      "Gourmet dining experiences",
      "Water sports and activities"
    ],
    category: "holiday",
    status: "active"
  },
  {
    title: "Saubhagya/Wedding Destination",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding Destination",
    quote: "Where Sacred Bonds Meet Ocean's Eternal Witness",
    price: "₹3,50,000",
    description: "Create unforgettable memories with a dream wedding at our exclusive oceanfront venue.",
    duration: "3-5 Days",
    features: [
      "Beachfront ceremony setups",
      "Customized wedding planning",
      "Luxury accommodation for guests",
      "Professional photography services"
    ],
    category: "wedding",
    status: "active"
  },
  {
    title: "Moksha Yatra/Spiritual Tourism",
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?q=80&w=2070&auto=format&fit=crop",
    alt: "Spiritual Tourism",
    quote: "The Path to Enlightenment",
    price: "₹35,000",
    description: "Embark on a journey of self-discovery through ancient temples and spiritual retreats.",
    duration: "4-10 Days",
    features: [
      "Guided temple tours",
      "Meditation and yoga sessions",
      "Authentic Ayurvedic treatments",
      "Spiritual discussions with local experts"
    ],
    category: "spiritual",
    status: "active"
  },
  {
    title: "Vishram/Senior Citizen Haven",
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?q=80&w=2070&auto=format&fit=crop",
    alt: "Senior Citizen Haven",
    quote: "A Haven of Rest & Renewal",
    price: "₹35,000",
    description: "Experience a peaceful retreat designed specifically for senior citizens with all amenities and care.",
    duration: "4-10 Days",
    features: [
      "Accessible accommodations",
      "Medical assistance available",
      "Gentle activities and excursions",
      "24/7 support staff"
    ],
    category: "senior",
    status: "active"
  },
  {
    title: "Vrindavan/NRI Holiday Package",
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?q=80&w=2070&auto=format&fit=crop",
    alt: "NRI Holiday Package",
    quote: "A Journey Back to Your Roots",
    price: "₹35,000",
    description: "Rediscover your cultural heritage with our specially curated package for NRIs.",
    duration: "4-10 Days",
    features: [
      "Cultural immersion programs",
      "Heritage site visits",
      "Traditional cuisine experiences",
      "Local community interactions"
    ],
    category: "nri",
    status: "active"
  },
  {
    title: "Swa Rachana/Customized Packages",
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?q=80&w=2070&auto=format&fit=crop",
    alt: "Customized Packages",
    quote: "Your Vision, Our Masterpiece",
    price: "₹35,000",
    description: "Create your perfect vacation with our fully customizable tourism packages.",
    duration: "4-10 Days",
    features: [
      "Tailored itineraries",
      "Flexible duration",
      "Personalized activities",
      "Custom accommodation options"
    ],
    category: "custom",
    status: "active"
  },
  {
    title: "Sangram/Meetings and Seminars",
    image: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?q=80&w=2070&auto=format&fit=crop",
    alt: "Meetings and Seminars",
    quote: "Where Business Meets Paradise",
    price: "₹35,000",
    description: "Host your corporate events in our state-of-the-art facilities with stunning ocean views.",
    duration: "4-10 Days",
    features: [
      "Modern conference rooms",
      "Audio-visual equipment",
      "Catering services",
      "Team building activities"
    ],
    category: "meeting",
    status: "active"
  }
];

const seedTourismPackages = async () => {
  try {
    // Clear existing packages
    await Tourism.deleteMany({});
    
    // Insert new packages
    await Tourism.insertMany(tourismPackages);
    
    console.log('Tourism packages seeded successfully');
  } catch (error) {
    console.error('Error seeding tourism packages:', error);
  }
};

module.exports = seedTourismPackages; 