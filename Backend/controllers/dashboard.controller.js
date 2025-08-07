const Tourism = require('../models/tourism.model');
const Investment = require('../models/investment.model');
const FormResponse = require('../models/formResponse.model');
const Booking = require('../models/booking.model');

exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const [
      tourismCount,
      investmentCount,
      formResponseCount,
      bookingCount,
      recentBookings,
      recentInvestments
    ] = await Promise.all([
      Tourism.countDocuments(),
      Investment.countDocuments(),
      FormResponse.countDocuments(),
      Booking.countDocuments(),
      Booking.find().sort({ createdAt: -1 }).limit(5),
      Investment.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Calculate monthly revenue (example calculation)
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const bookings = await Booking.find({
      createdAt: { $gte: startOfMonth }
    });
    
    const monthlyRevenue = bookings.reduce((total, booking) => total + (booking.amount || 0), 0);

    // Get pending approvals count
    const pendingApprovals = await FormResponse.countDocuments({ status: 'new' });

    res.status(200).json({
      success: true,
      message: 'Dashboard statistics retrieved successfully',
      data: {
        totalTourismPackages: tourismCount,
        totalInvestments: investmentCount,
        totalFormResponses: formResponseCount,
        totalBookings: bookingCount,
        recentBookings: recentBookings.map(booking => ({
          _id: booking._id,
          customerName: booking.customerName,
          packageName: booking.packageName,
          status: booking.status,
          amount: booking.amount
        })),
        recentInvestments: recentInvestments.map(investment => ({
          _id: investment._id,
          title: investment.title,
          price: investment.price,
          status: investment.status
        })),
        monthlyRevenue,
        pendingApprovals
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving dashboard statistics',
      error: error.message
    });
  }
}; 