import React from 'react'
import { motion } from 'framer-motion'

const journeySteps = [
  {
    id: 1,
    title: "Athmeeya – Referral Launch",
    tagline: "Our ICONIC Family, Our First Priority.",
    description: "Exclusively for our inner circle—our trusted partners, families, and well-wishers. The first glimpse of Ocean Edge was revealed to those who have believed in our vision, ensuring that our ICONIC family gets the first opportunity to invest in this masterpiece.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Swapna Dhara – Pre-Launch Experience Event", 
    tagline: "An Ocean of Dreams Turning into Reality.",
    description: "An immersive experience designed to introduce Ocean Edge in its most magnificent form. Our guests had the first-hand experience of luxury, architectural brilliance, and the serene beauty of the oceanfront destination.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Advitha – Post-Launch Campaign",
    tagline: "An ICONIC's Masterpiece.",
    description: "The world witnessed the grand unveiling of Ocean Edge, setting new standards in luxury real estate and elite tourism. Advitha established our brand as the epitome of exclusivity, trust, and sophistication.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Atidhi – Inviting Influencers & Media",
    tagline: "Your Influence Meets Our Excellence.",
    description: "A special invite to social media influencers, filmmakers, and journalists to experience Ocean Edge like never before. This phase helped us showcase the grandeur and vision of ICONIC Ocean Edge to a global audience.",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop"
  }
];

const Journer = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-black  text-white">
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[70vh] mb-20"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop" 
            alt="Ocean Edge Journey" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white text-xs sm:text-sm font-medium py-2 px-6 sm:px-8 rounded-full inline-block mb-8 shadow-lg"
          >
            THE ICONIC JOURNEY
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl font-serif mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562]"
          >
            From Vision to Reality
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto text-gray-200"
          >
            The Making of an ICONIC Legacy
          </motion.p>
        </div>
      </motion.div>

      {/* Introduction Section */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center"
      >
        <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed">
          The journey of ICONIC Ocean Edge is not just about constructing a world-class resort—it's about building an experience, a legacy, and an elite destination. Every phase of this journey has been carefully planned to reflect trust, luxury, and excellence.
        </p>
      </motion.div>

     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#cd754a] to-[#dfb562] opacity-50"></div>
          
          {journeySteps.map((step, index) => (
            <motion.div 
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              key={step.id} 
              className={`mb-20 md:mb-32 relative ${index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'}`}
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* Timeline Dot */}
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-[#cd754a] to-[#dfb562] border-4 border-black z-10 shadow-xl hover:shadow-[#cd754a]/30 transition-all duration-300"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    {step.id}
                  </div>
                </motion.div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#cd754a]/30 transition-all duration-300 border border-gray-700 hover:border-[#cd754a]/20"
                  >
                    <div className="relative h-72 overflow-hidden group">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-8 md:p-10">
                      <div className="bg-gradient-to-r from-[#cd754a]/20 to-[#dfb562]/20 text-[#cd754a] text-sm font-medium px-4 py-2 rounded-full mb-4 inline-block">
                        Phase {step.id}
                      </div>
                      <h3 className="text-4xl sm:text-5xl font-serif mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#dfb562] to-white">
                        {step.title}
                      </h3>
                      <p className="text-xl sm:text-2xl font-medium mb-6 text-white italic bg-clip-text text-transparent bg-gradient-to-r from-[#cd754a] to-[#dfb562]">
                        "{step.tagline}"
                      </p>
                      <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Year/Date (for mobile) */}
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="md:hidden mt-6 mb-10 flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#cd754a] to-[#dfb562] flex items-center justify-center text-white font-bold text-lg shadow-xl hover:shadow-[#cd754a]/30 transition-all duration-300">
                    {step.id}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing Statement */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-black to-gray-900/90 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl cal-sans-regular font-serif mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#cd754a] to-[#dfb562]">
            Join Us on This Extraordinary Journey
          </h2>
          <p className="text-xl text sm:text-3xl font-mono text-gray-300 mb-8">
            Be part of something truly exceptional as we continue to shape the future of luxury living and hospitality.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#cf6631] hover:to-[#e09a4d] transition-all duration-300 shadow-lg hover:shadow-[#cd754a]/30"
          >
            Explore More
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Journer