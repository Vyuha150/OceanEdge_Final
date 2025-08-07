import React from 'react'
import { motion } from 'framer-motion'
import bg from "../assets/wellness.jpeg"

const Wellness = () => {
  return (
    <div className="min-h-screen bg-black text-white ">
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[60vh] mb-16"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={bg} 
            alt="Wellness Center" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-gradient-to-r from-[#cd754a] to-[#dfb562]  text-white text-xs sm:text-sm font-medium py-2 px-4 sm:px-6 rounded-full inline-block mb-6">
            ICONIC WELLNESS EXPERIENCE
          </div>
          <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] sm:text-5xl md:text-6xl font-serif mb-4">
            Ancient Wisdom, Modern Wellness
          </h1>
          <p className="text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] md:text-2xl max-w-3xl mx-auto">
            All at Your Doorstep
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
            At ICONIC Ocean Edge, wellness is more than just relaxation—it's a way of life. 
            Designed to rejuvenate the mind, body, and soul, our state-of-the-art wellness centers 
            bring together the best of ancient Indian healing traditions and modern medical advancements.
          </p>
        </div>
        
        <h2 className="text-3xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#dfb562] sm:text-4xl font-serif text-center mb-12">
          Holistic Healing Under One Roof
        </h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Ayurveda Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group [perspective:1000px] h-80"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              
              {/* Front Side */}
              <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1920&auto=format&fit=crop" 
                  alt="Ayurveda Retreat"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center p-4 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    Ayurveda & Panchakarma Retreats
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h3 className="text-xl font-medium text-[#dfb562] mb-3">
                  Ayurveda & Panchakarma Retreats
                </h3>
                <p className="text-sm text-gray-300">
                  Experience the timeless healing power of Ayurveda, with personalized therapies, detox treatments, and herbal remedies.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Yoga Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="group [perspective:1000px] h-80"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              
              {/* Front Side */}
              <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                <img 
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1922&auto=format&fit=crop" 
                  alt="Yoga Sanctuary"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center p-4 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    Yoga & Meditation Sanctuaries
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h3 className="text-xl font-medium text-[#dfb562] mb-3">
                  Yoga & Meditation Sanctuaries
                </h3>
                <p className="text-sm text-gray-300">
                  Reconnect with your inner self through guided yoga and transcendental meditation in serene ocean-facing spaces.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Naturopathy Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="group [perspective:1000px] h-80"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              
              {/* Front Side */}
              <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                <img 
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop" 
                  alt="Naturopathy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center p-4 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    Naturopathy & Holistic Therapies
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h3 className="text-xl font-medium text-[#dfb562] mb-3">
                  Naturopathy & Holistic Therapies
                </h3>
                <p className="text-sm text-gray-300">
                  Restore balance with hydrotherapy, mud therapy, acupuncture, and sound healing.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Spa Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="group [perspective:1000px] h-80"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              
              {/* Front Side */}
              <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1770&auto=format&fit=crop" 
                  alt="Luxury Spa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center p-4 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    Advanced Spa & Luxury Wellness
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h3 className="text-xl font-medium text-[#dfb562] mb-3">
                  Advanced Spa & Luxury Wellness
                </h3>
                <p className="text-sm text-gray-300">
                  Indulge in premium spa therapies, hydrothermal baths, and deep tissue massages for the ultimate relaxation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Reiki Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="group [perspective:1000px] h-80"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              
              {/* Front Side */}
              <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                <img 
                  src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=1770&auto=format&fit=crop" 
                  alt="Reiki Healing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center p-4 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    Reiki & Energy Healing
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h3 className="text-xl font-medium text-[#dfb562] mb-3">
                  Reiki & Energy Healing
                </h3>
                <p className="text-sm text-gray-300">
                  Channel cosmic energy to cleanse your aura and enhance vitality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Nutrition Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            viewport={{ once: true }}
            className="group [perspective:1000px] h-80"
          >
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              
              {/* Front Side */}
              <div className="absolute w-full h-full rounded-lg overflow-hidden [backface-visibility:hidden]">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1770&auto=format&fit=crop" 
                  alt="Nutritional Coaching"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex justify-center items-center p-4 text-center">
                  <h3 className="text-xl font-semibold text-white">
                    Nutritional & Wellness Coaching
                  </h3>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full bg-gray-900/80 text-white rounded-lg px-6 py-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <h3 className="text-xl font-medium text-[#dfb562] mb-3">
                  Nutritional & Wellness Coaching
                </h3>
                <p className="text-sm text-gray-300">
                  Personalized diet plans based on Ayurveda and modern nutrition science.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Bottom Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-black py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-serif mb-4 text-white">
            At Ocean Edge, well-being meets luxury
          </h2>
          <p className="text-lg text-white/90">
            A sanctuary where ancient wisdom and advanced wellness unite for a transformative experience.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-white bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white hover:bg-white/90 font-medium py-3 px-8 rounded-md transition"
          >
            Book Your Wellness Journey
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Wellness