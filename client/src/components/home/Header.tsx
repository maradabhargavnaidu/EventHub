import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { state } = useAuth();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // const floatAnimation = {
  //   hidden: { y: 0 },
  //   visible: {
  //     y: [-10, 10, -10],
  //     transition: {
  //       duration: 6,
  //       repeat: Infinity,
  //       repeatType: "reverse",
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#1E1E1E] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,50,50,0.2),transparent_50%)]" />
      <div className="absolute top-20 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex justify-center mb-6"
            // variants={floatAnimation}
            // variants={floatAnimation}
            initial="hidden"
            animate="visible"
          >
            <Sparkles className="w-12 h-12 text-yellow-500/80" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-gray-100 to-gray-400">
              Effortless Event Planning,
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-gray-100 to-blue-200">
              Unforgettable Moments
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mt-6 mb-12"
          >
            Plan, organize, and manage your events seamlessly,
            <span className="text-gray-300">
              because every event deserves perfection.
            </span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col  gap-4 justify-center items-center"
          >
            {state?.isAuthenticated ? (
              <Link
                to="/dashboard"
                className="group flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link
                to="/get-started"
                className="group flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <div className="mx-auto max-w-3xl rounded-2xl bg-white/5 backdrop-blur-3xl px-6 py-3 shadow-lg ring-1 ring-white/20">
              <p className="text-center text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                🚧 EventHub is in <span className="underline">Beta</span> —
                we're polishing things up for the best experience!
              </p>
            </div>

            {/* <Link
              to="/learn-more"
              className="flex items-center gap-2 text-gray-300 hover:text-white font-medium py-4 px-8 rounded-full transition-colors"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </Link> */}
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mt-16"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/50"
            >
              <Calendar className="w-10 h-10 text-purple-400" />
              <div className="text-left">
                <h3 className="text-gray-200 font-medium">Smart Planning</h3>
                <p className="text-gray-400 text-sm">
                  Automated scheduling & reminders
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 bg-gray-800/50 rounded-2xl p-4 backdrop-blur-sm border border-gray-700/50"
            >
              <Users className="w-10 h-10 text-blue-400" />
              <div className="text-left">
                <h3 className="text-gray-200 font-medium">
                  Team Collaboration
                </h3>
                <p className="text-gray-400 text-sm">
                  Work together seamlessly
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Header;
