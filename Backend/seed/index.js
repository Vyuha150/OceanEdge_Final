const seedUsers = require('./user.seed');
const seedInvestments = require('./investment.seed');
const seedTourismPackages = require('./tourism.seed');

const seedAll = async () => {
  try {
    await seedUsers();
    await seedInvestments();
    await seedTourismPackages();
    console.log('All data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedAll(); 