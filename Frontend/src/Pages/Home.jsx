import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaUser, FaBriefcase, FaUsers, FaVideo, FaChevronRight } from 'react-icons/fa'
import { FaShield, FaStar, FaWandMagicSparkles, FaAward } from 'react-icons/fa6'
import { motion } from 'framer-motion'
//import bg from "../assets/bg.mp4"
const userTypeData = {
  doctors: {
    title: "A Healing Haven",
    description: "After long hours of providing care, immerse yourself in a peaceful and rejuvenating environment that promotes wellness. Our hygienic, serene spaces and wellness amenities are designed with medical professionals in mind.",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
    features: [
      "Wellness Spa & Health Center",
      "Quiet Meditation Spaces", 
      "Clean Air & Pristine Environment",
      "Medical Concierge Services"
    ]
  },
  nris: {
    title: "Your Indian Home",
    description: "Maintain your connection to India with a luxurious property that offers the perfect blend of traditional values and modern amenities. Enjoy hassle-free ownership with our comprehensive property management services.",
    image: "https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Simplified Documentation",
      "Remote Property Management",
      "Cultural Celebrations & Events", 
      "Investment Appreciation"
    ]
  },
  businessOwners: {
    title: "Strategic Retreat",
    description: "Balance work and leisure in an environment designed for high-achieving professionals. Host exclusive meetings, entertain clients, or simply recharge in a setting that reflects your success and ambition.",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Executive Meeting Spaces",
      "High-Speed Connectivity",
      "Networking Opportunities",
      "Prestigious Address"
    ]
  },
  families: {
    title: "Generational Memories",
    description: "Craft unforgettable moments in a secure, vibrant setting designed for every generation. With dedicated play zones for children and a wide array of entertainment options for all ages, we've created experiences that bring families together.",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Family-Friendly Activities",
      "Children's Play Areas",
      "Multi-Generational Spaces",
      "Safe & Secure Environment"
    ]
  }
};

const Home = () => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('doctors');
  const currentData = userTypeData[selectedUserType];

  // Add panel handlers
  const handleLeftPanelEnter = () => {
    setLeftPanelOpen(true);
  };

  const handleLeftPanelLeave = () => {
    setLeftPanelOpen(false);
  };

  const handleRightPanelEnter = () => {
    setRightPanelOpen(true);
  };

  const handleRightPanelLeave = () => {
    setRightPanelOpen(false);
  };

  return (
    <div className='min-h-screen overflow-x-hidden w-full'>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='min-h-screen w-full flex flex-col items-center justify-center text-white relative overflow-x-hidden'
      >
        {/* Left Semi-circle - Mobile visibility improved */}
        <motion.div 
          className="absolute text-xl hidden md:flex text-white font-bold  z-40 left-0 top-[40%] items-center justify-center -translate-y-1/2 w-24 h-24 sm:w-36 sm:h-36 bg-[#cd754a] backdrop-blur-sm rounded-r-full shadow-lg"
          initial={{ scale: 1 }}
          whileHover={{ 
            scale: 1.1,
            x: -4,
            y: -4,
            boxShadow: "0 0 20px rgba(0,0,0,0.5)"
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          onMouseEnter={handleLeftPanelEnter}
          onTouchStart={handleLeftPanelEnter}
          style={{ zIndex: leftPanelOpen ? 45 : 40 }}
        >
        <h1 className='text-white cal-sans-regular text-center font-medium text-sm sm:text-xl'>
        Secure <br/> your <br/> Serenity
        </h1>
        </motion.div>
        
        {/* Right Semi-circle - Mobile visibility improved */}
        <motion.div 
          className="absolute hidden md:flex items-center text-center justify-center text-sm sm:text-xl text-white font-bold z-40 right-0 top-[40%] -translate-y-1/2 w-24 h-24 sm:w-36 sm:h-36 bg-[#cd754a] backdrop-blur-sm rounded-l-full shadow-lg"
          initial={{ scale: 1 }}
          whileHover={{ 
            scale: 1.1,
            x: -4,
            y: -4,
            boxShadow: "0 0 20px rgba(0,0,0,0.5)"
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
          onMouseEnter={handleRightPanelEnter}
          onTouchStart={handleRightPanelEnter}
          style={{ zIndex: rightPanelOpen ? 45 : 40 }}
        >
           𝓦𝓲𝓽𝓷𝓮𝓼𝓼<br/> 𝓽𝓱𝓮<br/> 𝓱𝓮𝓪𝓿𝓮𝓷
        </motion.div>

        {/* Left Sliding Panel - improved for mobile */}
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: leftPanelOpen ? "0%" : "-100%" }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="absolute left-0 top-0 w-full sm:w-3/4 md:w-1/2 h-full bg-white/95 backdrop-blur-sm"
          style={{ zIndex: leftPanelOpen ? 60 : -1 }}
          onMouseEnter={handleLeftPanelEnter}
          onTouchStart={handleLeftPanelEnter}
          onMouseLeave={handleLeftPanelLeave}
          onTouchEnd={handleLeftPanelLeave}
        >
          <div className="bg-blue-400/60 w-full h-screen p-4 sm:p-8">
            <div className="border-double w-full border-2 border-white flex-col flex items-center justify-center gap-3 sm:gap-6 p-4 sm:p-8 h-full">
              <h1 className='text-white text-2xl sm:text-4xl font-bold'>𝓢𝓮𝓬𝓾𝓻𝓮 𝓨𝓸𝓾𝓻 𝓢𝓮𝓻𝓮𝓷𝓲𝓽𝔂</h1>
              <h1 className='text-white text-center text-sm sm:text-xl md:text-2xl font-bold'>Discover tailor-made, end-to-end tourism packages designed just for you — covering everything from travel planning and accommodation to local experiences and seamless returns, ensuring a hassle-free and unforgettable journey.</h1>
              {/* Close button for mobile */}
              <button 
                onClick={handleLeftPanelLeave}
                className="sm:hidden mt-4 bg-white/20 p-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Sliding Panel - improved for mobile */}
        <motion.div 
          initial={{ x: "100%" }}
          animate={{ x: rightPanelOpen ? "0%" : "100%" }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="absolute right-0 top-0 w-full sm:w-3/4 md:w-1/2 h-full bg-white/95 backdrop-blur-sm"
          style={{ zIndex: rightPanelOpen ? 60 : -1 }}
          onMouseEnter={handleRightPanelEnter}
          onTouchStart={handleRightPanelEnter}
          onMouseLeave={handleRightPanelLeave}
          onTouchEnd={handleRightPanelLeave}
        >
          <div className="bg-blue-400/60 w-full h-screen p-4 sm:p-8">
            <div className="border-double w-full border-2 border-white flex-col flex items-center justify-center gap-3 sm:gap-6 p-4 sm:p-8 h-full">
              <h1 className='text-white font-[robert] text-2xl sm:text-4xl font-bold'>𝓦𝓲𝓽𝓷𝓮𝓼𝓼 𝓽𝓱𝓮 𝓱𝓮𝓪𝓿𝓮𝓷</h1>
              <h1 className='text-white text-center text-sm sm:text-xl md:text-2xl font-bold'>Witness the ultimate investment opportunity in world-class luxury resorts! Step into a realm of elegance, exclusivity, and extraordinary returns. These premier destinations aren't just a place to relax—they're a chance to elevate your portfolio with high-value assets in the booming luxury hospitality market. Don't miss your chance to own a piece of paradise—invest in luxury, invest in success!</h1>
              {/* Close button for mobile */}
              <button 
                onClick={handleRightPanelLeave}
                className="sm:hidden mt-4 bg-white/20 p-2 rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>

        <div className='absolute inset-0 z-0'>
  <motion.video
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1.5 }}
    src="https://player.vimeo.com/external/421594651.hd.mp4?s=1af97baa753c7027289025950dad6c4dcc9c6bb2&profile_id=175&oauth2_token_id=57447761" 
    autoPlay
    muted 
    loop 
    playsInline 
    className='w-full h-full object-cover'
  />
  <div className='absolute inset-0 bg-black/30'></div>
</div>


        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto'
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className='bg-[#cd754a] text-white text-xs sm:text-sm font-medium py-2 px-4 sm:px-6 rounded-full inline-block mb-4 sm:mb-6 lg:mb-8'
          >
            YOUR GATEWAY TO LUXURY & SERENITY
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-3 sm:mb-4'
          >
            Experience The <span className='bg-clip-text  text-transparent bg-gradient-to-r from-white to-[#dfb562] font-bold'>ICONIC</span> Life
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className='text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 px-2'
          >
            Exclusive luxury villas and world-class experiences on the 
            pristine coast of Andhra Pradesh
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-[#cd754a] bg-gradient-to-b from-[#cd754a] to-[#dfb562]  hover:bg-amber-700 text-white py-2.5 sm:py-3 px-5 sm:px-8 rounded-md transition text-sm sm:text-base'
            >
              <Link className='text-white  py-2.5 sm:py-3 px-5 sm:px-8 rounded-md transition text-sm sm:text-base' to='/booking'>
              Book Your Stay</Link>
              
            </motion.button>
            <Link to='/purchase'
          
              className='border border-white hover:bg-white/10 text-white py-2.5 sm:py-3 px-5 sm:px-8 rounded-md transition text-sm sm:text-base'
            >
              Own Your Luxury Retreat
            </Link>
          </motion.div>
        </motion.div>

        <motion.a 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          href='#about' 
          className='absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 animate-bounce'
        >
          <FaChevronRight className="rotate-90 w-5 h-5 sm:w-6 sm:h-6" />
        </motion.a>
      </motion.div>

      <motion.div 
        
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id='about' 
        className='bg-black text-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8'
      >
        <div className='max-w-6xl mx-auto text-center'>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='bg-amber-900/30 font-serif text-amber-300 text-xs sm:text-sm font-medium py-2 px-4 sm:px-6 rounded-full inline-block mb-6 sm:mb-8 lg:mb-10'
          >
            THE VISION BEHIND ICONIC OCEAN EDGE
          </motion.div>
          
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className='text-2xl sm:text-3xl cal-sans-regular  md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 lg:mb-10'
          >
            Creating Extraordinary Moments & Memories
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto px-2'
          >
           ICONIC Ocean Edge redefines luxury living along the untouched coastline of Andhra Pradesh, offering an exclusive haven for those who seek elegance, privacy, and extraordinary experiences.
          </motion.p>
        </div>

        <div className='max-w-7xl mx-auto mt-12 sm:mt-16 lg:mt-20'>
          <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='w-full lg:w-1/2 px-4 sm:px-6 lg:px-0'
            >
              <div className='relative'>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80" 
                  alt="Luxury Villa"
                  className='w-full h-auto rounded-lg shadow-2xl'
                />
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className='absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-black p-3 sm:p-4 rounded-lg shadow-xl hidden sm:block'
                >
                  <p className='text-amber-500 font-medium text-sm sm:text-base'>15+ Years</p>
                  <p className='text-xs sm:text-sm text-gray-400'>of excellence</p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='w-full lg:w-1/2 px-4 sm:px-6 lg:px-0'
            >
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-4 sm:mb-6'>Our Legacy of Excellence</h2>
              <p className='text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base'>
                With over 15 years of experience in crafting exceptional living spaces, ICONIC
                brings its legacy of credibility, innovation, and customer trust to Ocean Edge. Our
                mission is to create a world-class luxurious and secure getaway that redefines
                coastal living in India.
              </p>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8'>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className='bg-gray-900/50 p-4 sm:p-6 rounded-lg'
                >
                  <div className='text-amber-500 mb-3'>
                    <FaShield className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                  </div>
                  <h3 className='text-base sm:text-lg lg:text-xl font-medium mb-2'>Unmatched Security</h3>
                  <p className='text-gray-400 text-sm sm:text-base'>State-of-the-art systems ensuring peace of mind at all times.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className='bg-gray-900/50 p-4 sm:p-6 rounded-lg'
                >
                  <div className='text-amber-500 mb-3'>
                    <FaStar className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                  </div>
                  <h3 className='text-base sm:text-lg lg:text-xl font-medium mb-2'>Premium Quality</h3>
                  <p className='text-gray-400 text-sm sm:text-base'>Exceptional craftsmanship and materials in every detail.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className='bg-gray-900/50 p-4 sm:p-6 rounded-lg'
                >
                  <div className='text-amber-500 mb-3'>
                    <FaWandMagicSparkles className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                  </div>
                  <h3 className='text-base sm:text-lg lg:text-xl font-medium mb-2'>Exclusive Amenities</h3>
                  <p className='text-gray-400 text-sm sm:text-base'>Curated experiences designed for the discerning few.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className='bg-gray-900/50 p-4 sm:p-6 rounded-lg'
                >
                  <div className='text-amber-500 mb-3'>
                    <FaAward className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                  </div>
                  <h3 className='text-base sm:text-lg lg:text-xl font-medium mb-2'>Award-Winning</h3>
                  <p className='text-gray-400 text-sm sm:text-base'>Recognized excellence in design and hospitality.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id='explore' 
        className='bg-black text-white py-12 sm:py-14 lg:py-16 overflow-hidden px-4 sm:px-6 lg:px-8'
      >
        <div className='max-w-7xl mx-auto'>
          <motion.div 
            initial={{ y: 20, opacity: 1 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='text-center mb-12 sm:mb-14 lg:mb-16'
          >
            <div className='bg-amber-900/30  font-mono text-amber-300 text-xs sm:text-lg font-medium py-2 px-4 sm:px-6 rounded-full inline-block mb-4 sm:mb-6'>
              TAILORED FOR YOU
            </div>
            <h2 className='text-2xl sm:text-2xl md:text-4xl lg:text-4xl font-serif'>
              Experiences Designed For Your Lifestyle
            </h2>
          </motion.div>
          
          <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='w-full lg:w-2/5'
            >
              <div className='bg-gray-900/80 rounded-xl p-4'>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center p-3 sm:p-4 rounded-lg mb-3 cursor-pointer ${selectedUserType === 'doctors' ? 'bg-[#cd754a]' : 'hover:bg-gray-800/50'} transition`}
                  onClick={() => setSelectedUserType('doctors')}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedUserType === 'doctors' ? 'bg-white/20' : 'bg-gray-700'} mr-4`}>
                    <FaHeart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className='font-medium text-base sm:text-lg'>Doctors</h3>
                    <p className={`text-xs sm:text-sm ${selectedUserType === 'doctors' ? 'text-gray-200' : 'text-gray-400'}`}>Tailored experiences</p>
                  </div>
                  <div className='ml-auto'>
                    <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center p-3 sm:p-4 rounded-lg mb-3 cursor-pointer ${selectedUserType === 'nris' ? 'bg-[#cd754a]' : 'hover:bg-gray-800/50'} transition`}
                  onClick={() => setSelectedUserType('nris')}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedUserType === 'nris' ? 'bg-white/20' : 'bg-gray-700'} mr-4`}>
                    <FaUser className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className='font-medium text-base sm:text-lg'>NRIs</h3>
                    <p className={`text-xs sm:text-sm ${selectedUserType === 'nris' ? 'text-gray-200' : 'text-gray-400'}`}>Tailored experiences</p>
                  </div>
                  <div className='ml-auto'>
                    <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center p-3 sm:p-4 rounded-lg mb-3 cursor-pointer ${selectedUserType === 'entrepreneurs' ? 'bg-[#cd754a]' : 'hover:bg-gray-800/50'} transition`}
                  onClick={() => setSelectedUserType('businessOwners')}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedUserType === 'businessOwners' ? 'bg-white/20' : 'bg-gray-700'} mr-4`}>
                    <FaBriefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className='font-medium text-base sm:text-lg'>Business Owners</h3>
                    <p className={`text-xs sm:text-sm ${selectedUserType === 'businessOwners' ? 'text-gray-200' : 'text-gray-400'}`}>Tailored experiences</p>
                  </div>
                  <div className='ml-auto'>
                    <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center p-3 sm:p-4 rounded-lg mb-3 cursor-pointer ${selectedUserType === 'families' ? 'bg-[#cd754a]' : 'hover:bg-gray-800/50'} transition`}
                  onClick={() => setSelectedUserType('families')}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedUserType === 'families' ? 'bg-white/20' : 'bg-gray-700'} mr-4`}>
                    <FaUsers className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <h3 className='font-medium text-base sm:text-lg'>Families</h3>
                    <p className={`text-xs sm:text-sm ${selectedUserType === 'families' ? 'text-gray-200' : 'text-gray-400'}`}>Tailored experiences</p>
                  </div>
                  <div className='ml-auto'>
                    <FaChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className='mt-6 sm:mt-8 bg-gray-900/50 rounded-lg p-4 sm:p-6'
                >
                  <div className='flex items-center mb-3 sm:mb-4'>
                    <FaVideo className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500 mr-2" />
                    <h3 className='font-medium text-base sm:text-lg'>Virtual Tour</h3>
                  </div>
                  <p className='text-xs sm:text-sm text-gray-300 mb-4'>
                    Experience our property virtually with our immersive 3D tour technology.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='w-full bg-gray-800 hover:bg-gray-700 text-white py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base'
                  >
                    Book a Virtual Tour
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='w-full lg:w-3/5'
            >
              <motion.div 
                layout
                className='bg-gray-900/30 rounded-xl overflow-hidden'
              >
                <motion.img 
                  layout
                  src={currentData.image} 
                  alt={currentData.title}
                  className='w-full h-48 sm:h-56 lg:h-64 object-cover'
                />
                <motion.div 
                  layout
                  className='p-4 sm:p-6'
                >
                  <motion.h2 
                    layout
                    className='text-2xl sm:text-3xl font-serif mb-3 sm:mb-4'
                  >
                    {currentData.title}
                  </motion.h2>
                  <motion.p 
                    layout
                    className='text-gray-300 text-sm sm:text-base mb-4 sm:mb-6'
                  >
                    {currentData.description}
                  </motion.p>
                  
                  <motion.div 
                    layout
                    className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6'
                  >
                    {currentData.features.map((feature, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className='flex items-center'
                      >
                        <div className='w-2 h-2 rounded-full bg-amber-500 mr-2'></div>
                        <span className='text-sm sm:text-base'>{feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='bg-amber-600 hover:bg-amber-700 text-white py-2 sm:py-2.5 px-5 sm:px-6 rounded-md transition text-sm sm:text-base'
                  >
                    Explore More
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home