"use client"

import { motion } from "framer-motion"
import { 
  FaCode, FaGlobe, FaServer, FaLaptopCode, FaPaintBrush, 
  FaHeadset, FaLaptop, FaShieldAlt, FaBoxOpen, FaUsers, FaWhatsapp 
} from "react-icons/fa"
import RequestCallback from "@/src/components/requestCallback"
export default function Page() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#001F3F] to-[#003366] text-white font-['Roboto']">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center text-3xl font-extrabold font-['Montserrat'] 
                     bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
        >
          <FaCode className="mr-4 text-orange-500" />
          TPRCS
        </motion.div>
      </header>

      {/* Hero */}
      <section className="container mx-auto text-center py-24 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 
                     rounded-full text-2xl font-bold mb-6 shadow-lg"
        >
          Only ₹2000/year
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold font-['Montserrat'] mb-6 
                     bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg"
        >
          Website + Domain + Hosting <br /> Complete Package
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90"
        >
          Professional web development services with a risk-free approach. Pay only after you&apos;re satisfied with the demo.
        </motion.p>
<RequestCallback />
        <motion.a
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1,  }}
          whileHover={{ scale: 1.08, boxShadow: "0px 0px 20px rgba(255,165,0,0.6)" }}
          href="https://wa.me/917989167008?text=Hello!%20I'm%20interested%20in%20your%20web%20development%20service"
          className="inline-flex items-center justify-center bg-gradient-to-r 
                     from-orange-500 to-orange-600 text-white px-10 py-4 
                     text-lg font-bold rounded-full shadow-lg relative overflow-hidden transition"
        >
          <FaWhatsapp className="mr-2 text-xl" /> Get Started on WhatsApp
        </motion.a>
      </section>

      {/* What You'll Get */}
      <motion.section 
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto py-24 px-4"
      >
        <h2 className="text-center text-4xl font-bold font-['Montserrat'] 
                       bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent 
                       mb-16 relative inline-block left-1/2 -translate-x-1/2">
          What You&apos;ll Get
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 
                           bg-gradient-to-r from-orange-500 to-orange-600 rounded"></span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <FaGlobe />, title: "Custom Domain", desc: "Get a professional domain name (.com, .in, etc.) included for the first year." },
            { icon: <FaServer />, title: "Reliable Hosting", desc: "Fast, secure hosting with 99.9% uptime guarantee and SSL certificate included." },
            { icon: <FaLaptopCode />, title: "Responsive Website", desc: "Modern, mobile-friendly website designed to work perfectly on all devices." },
            { icon: <FaPaintBrush />, title: "Professional Design", desc: "Custom design tailored to your business with modern UI/UX principles." },
            { icon: <FaHeadset />, title: "Support & Maintenance", desc: "Ongoing support and basic maintenance to keep your website running smoothly." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-white/10 p-8 rounded-2xl text-center backdrop-blur 
                         border border-white/10 shadow-lg hover:scale-105 transition"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 flex items-center justify-center rounded-full 
                           bg-orange-500/10 text-orange-500 text-4xl mx-auto mb-6"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-semibold font-['Montserrat'] mb-2">{item.title}</h3>
              <p className="text-gray-200">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Demo Preview */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto py-24 px-4 text-center"
      >
        <h2 className="text-4xl font-bold font-['Montserrat'] bg-gradient-to-r 
                       from-orange-400 to-orange-600 bg-clip-text text-transparent mb-16 relative inline-block">
          See It Before You Pay
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 
                           bg-gradient-to-r from-orange-500 to-orange-600 rounded"></span>
        </h2>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 p-12 rounded-3xl backdrop-blur border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="bg-gradient-to-br from-blue-800 to-blue-600 rounded-xl 
                          h-[350px] md:h-[450px] flex items-center justify-center shadow-lg relative">
            <div className="text-center">
              <FaLaptop className="text-5xl mb-4 opacity-80 mx-auto" />
              <p className="text-2xl font-['Montserrat'] mb-2">Your Professional Website Preview</p>
              <small className="opacity-70">We&apos;ll create a live demo for your approval before payment</small>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto py-24 px-4"
      >
        <h2 className="text-4xl font-bold font-['Montserrat'] bg-gradient-to-r 
                       from-orange-400 to-orange-600 bg-clip-text text-transparent mb-16 text-center relative inline-block">
          Why Choose Our Service
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1 
                           bg-gradient-to-r from-orange-500 to-orange-600 rounded"></span>
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: <FaShieldAlt />, title: "Risk-Free Approach", desc: "You only pay after you’ve seen and approved the demo. No upfront costs, no surprises." },
            { icon: <FaBoxOpen />, title: "All-In-One Solution", desc: "Domain, hosting, and professional development in one package. No multiple providers." },
            { icon: <FaUsers />, title: "Expert Support", desc: "Our web experts provide guidance during development and ongoing support after launch." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="bg-white/10 p-8 rounded-2xl backdrop-blur border border-white/10 shadow-lg hover:scale-105 transition"
            >
              <h3 className="flex items-center text-xl font-semibold text-orange-500 mb-4 font-['Montserrat']">
                {item.icon} <span className="ml-3">{item.title}</span>
              </h3>
              <p className="text-gray-200">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto py-24 px-4"
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 p-12 rounded-3xl text-center backdrop-blur border border-white/10 shadow-2xl"
        >
          <h2 className="text-4xl font-bold font-['Montserrat'] bg-gradient-to-r 
                         from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Ready to Launch Your Website?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Contact us on WhatsApp today to get started. We&apos;ll create a demo based on your requirements, and you only pay when you&apos;re completely satisfied.
          </p>

          <motion.a
            whileHover={{ scale: 1.08, boxShadow: "0px 0px 20px rgba(255,165,0,0.6)" }}
            href="https://wa.me/917989167008?text=Hello!%20I'm%20interested%20in%20your%20web%20development%20service"
            className="inline-flex items-center justify-center bg-gradient-to-r 
                       from-orange-500 to-orange-600 text-white px-10 py-4 text-lg font-bold 
                       rounded-full shadow-lg relative overflow-hidden transition"
          >
            <FaWhatsapp className="mr-2 text-xl" /> Message Us on WhatsApp
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="container mx-auto text-center py-8 border-t border-white/10 text-gray-300 text-sm">
        © 2017 TPRCS. All rights reserved.
      </footer>
    </div>
  )
}
