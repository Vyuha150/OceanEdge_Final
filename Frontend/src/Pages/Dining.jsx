import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  UserGroupIcon, 
  HomeModernIcon,
  PhoneIcon,
  CalendarDaysIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Dining = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[80vh] bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/images/dining-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-[fairplay] font-bold text-white mb-6"
            {...fadeInUp}
          >
            Hospitality & Dining at <span className="text-[#D4B678]">ICONIC Ocean Edge</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Experience premium coastal hospitality with a touch of elegance
          </motion.p>
        </div>
      </motion.div>

      {/* Introduction */}
      <motion.section 
        className="py-20 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              At ICONIC Ocean Edge, hospitality is more than a service—it's an experience rooted in comfort, elegance, and attention to detail. Our commitment to excellence ensures that every guest and resident feels truly at home in a serene, oceanfront setting.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Hospitality Features */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-[fairplay] font-bold text-white mb-6">A Legacy of Refined Hospitality</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our hospitality team is trained to deliver world-class service with discretion and warmth. From the moment you arrive, you are welcomed into an environment of calm professionalism and tailored care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ClockIcon,
                title: "24/7 Services",
                description: "Round-the-clock concierge and front desk services for your convenience"
              },
              {
                icon: UserGroupIcon,
                title: "Personalized Assistance",
                description: "Tailored support for both business and leisure requirements"
              },
              {
                icon: HomeModernIcon,
                title: "Premium Lounges",
                description: "Luxurious guest lounges and waiting areas for your comfort"
              },
              {
                icon: SparklesIcon,
                title: "Housekeeping",
                description: "Well-managed housekeeping and maintenance support"
              },
              {
                icon: CalendarDaysIcon,
                title: "Valet Services",
                description: "Professional valet parking and transport coordination"
              },
              {
                icon: PhoneIcon,
                title: "Concierge Support",
                description: "Dedicated concierge team for all your needs"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-black/50 backdrop-blur-sm rounded-lg border border-gray-800 p-8 hover:border-[#D4B678] transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <feature.icon className="w-12 h-12 text-[#D4B678] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Experience */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-[fairplay] font-bold text-white mb-6">Fine Dining & Culinary Elegance</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our dining experience is crafted to please the most discerning palates, offering a perfect balance of taste, ambiance, and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-8"
              {...fadeInUp}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-8">
                <h3 className="text-2xl font-[fairplay] font-bold text-[#D4B678] mb-4">ICONIC Dining Hall</h3>
                <p className="text-gray-300 mb-6">
                  The heart of our culinary offering features a curated menu blending traditional and contemporary cuisines. Prepared by seasoned chefs, our dishes are made using only the finest ingredients—locally sourced where possible, and presented with sophistication.
                </p>
                <ul className="space-y-4">
                  {[
                    "Daily rotating menus to ensure freshness and variety",
                    "Vegetarian and dietary-specific options available",
                    "Elegant interiors with ocean-view seating",
                    "Breakfast, lunch, and dinner services available"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-[#D4B678]">•</span>
                      <span className="text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-8"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-8 hover:border-[#D4B678] transition-colors duration-300">
                <h3 className="text-2xl font-[fairplay] font-bold text-[#D4B678] mb-4">In-Room Dining</h3>
                <p className="text-gray-300">
                  For those who prefer privacy, our in-room dining service delivers freshly prepared meals directly to your residence or suite. From morning coffee to late-night snacks, our in-room menu is available around the clock.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 p-8 hover:border-[#D4B678] transition-colors duration-300">
                <h3 className="text-2xl font-[fairplay] font-bold text-[#D4B678] mb-4">Catering & Private Events</h3>
                <p className="text-gray-300">
                  ICONIC Ocean Edge offers full-scale hospitality and catering support for private gatherings, business events, and special celebrations. Our team works closely with clients to craft personalized dining experiences.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <h2 className="text-3xl font-[fairplay] font-bold text-[#D4B678] mb-6">Commitment to Quality & Cleanliness</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Hygiene, food safety, and sustainability are at the core of our hospitality practices. Our culinary and housekeeping teams follow the highest standards of cleanliness and quality control, ensuring every guest enjoys a safe and delightful experience.
            </p>
            <button className="px-8 py-3 bg-transparent border-2 border-[#D4B678] text-[#D4B678] rounded-md hover:bg-[#D4B678] hover:text-white transition-all duration-300 font-medium">
              Contact Our Hospitality Team
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dining;