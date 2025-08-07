import React from 'react'
import { motion } from 'framer-motion'
import bg from "../assets/ocassionsand meetups.jpeg"
const Occasions = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white ">
     
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[60vh] mb-16"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={bg}
            alt="Luxury Event Space" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
        >
          <div className=" bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white  text-xs sm:text-sm font-medium py-2 px-4 sm:px-6 rounded-full inline-block mb-6">
            ICONIC EVENTS & GATHERINGS
          </div>
          <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] sm:text-5xl md:text-6xl font-serif mb-4">
             Grand Celebrations 
          </h1>
          <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] sm:text-xl md:text-2xl max-w-3xl mx-auto">
            Where memories are crafted with elegance
          </p>
        </motion.div>
      </motion.div>

      {/* Description Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="text-center mb-12">
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto">
            ICONIC Ocean Edge offers exquisite venues tailored for all occasions, blending elegance with world-class hospitality. 
            Whether it's a grand family celebration, a destination wedding, or a high-profile business summit, 
            our spaces provide the perfect setting.
          </p>
        </div>
        
        {/* Personal Celebrations Section */}
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] sm:text-4xl font-serif text-center mb-12"
          >
            Celebrate Life's Special Moments
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Weddings Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group [perspective:1000px] h-80"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                  <img 
                    src="https://images.unsplash.com/photo-1519741347686-c1e331fcb4d0?q=80&w=2070&auto=format&fit=crop" 
                    alt="Beachside Wedding"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-xl font-medium text-[#D4B678] mb-3">Weddings & Destination Nuptials</h3>
                  <p className="text-sm text-gray-300">
                    Say "I do" against breathtaking ocean views with customized themes and luxury accommodations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Family Reunions Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group [perspective:1000px] h-80"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop" 
                    alt="Family Gathering"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-xl font-medium text-[#D4B678] mb-3">Family Reunions & Private Getaways</h3>
                  <p className="text-sm text-gray-300">
                    Gather with your loved ones in an exclusive paradise, designed for togetherness.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Birthday/Anniversary Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group [perspective:1000px] h-80"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                  <img 
                    src="https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?q=80&w=2070&auto=format&fit=crop" 
                    alt="Celebration Gala"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-xl font-medium text-[#D4B678] mb-3">Birthday Bashes & Anniversary Galas</h3>
                  <p className="text-sm text-gray-300">
                    Celebrate milestones in a grand, customized setting.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Corporate Events Section */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-serif text-center mb-12"
          >
            Corporate Excellence by the Ocean
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Business Conferences Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group [perspective:1000px] h-80"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                  <img 
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" 
                    alt="Business Conference"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-xl font-medium text-[#D4B678] mb-3">Business Conferences & Board Meetings</h3>
                  <p className="text-sm text-gray-300">
                    Elevate your corporate discussions in an ultra-modern, inspiring setting.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Luxury Retreats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group [perspective:1000px] h-80"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                  <img 
                    src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=2070&auto=format&fit=crop" 
                    alt="Professional Retreat"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-xl font-medium text-[#D4B678] mb-3">Luxury Retreats for Professionals</h3>
                  <p className="text-sm text-gray-300">
                    Reconnect, refresh, and realign goals amidst serene landscapes.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Seminars Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group [perspective:1000px] h-80"
            >
              <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                
                {/* Front Side */}
                <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                  <img 
                    src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=crop" 
                    alt="Product Launch"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-xl font-medium text-[#D4B678] mb-3">Seminars, Product Launches & Expos</h3>
                  <p className="text-sm text-gray-300">
                    Impress your audience with state-of-the-art infrastructure and premium hospitality.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      
      
    </div>
  )
}

export default Occasions