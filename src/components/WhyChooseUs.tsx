import { motion } from "framer-motion"
import { Calendar, Sliders, Shield, ArrowRight } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      icon: Calendar,
      title: "Seamless Event Planning",
      description:
        "Manage your events effortlessly with our intuitive platform designed for smooth execution.",
      color: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-400",
    },
    {
      icon: Sliders,
      title: "Customizable Experience",
      description:
        "Tailor every aspect of your event to fit your unique vision and requirements.",
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
    },
    {
      icon: Shield,
      title: "Reliable & Efficient",
      description:
        "From invitations to execution, we ensure every detail is handled with precision.",
      color: "from-emerald-500/20 to-emerald-500/5",
      iconColor: "text-emerald-400",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-24 bg-[#1E1E1E] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400"
          >
            Elevate Your Event Experience
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} rounded-2xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-0`} />
              <div className="relative h-full p-8 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-gray-700 transition-colors duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-5 ${feature.iconColor}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
