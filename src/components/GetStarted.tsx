import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Calendar } from "lucide-react";

export default function GetStarted() {
    const navigate = useNavigate();

    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] relative overflow-hidden pt-24">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

            {/* Decorative circles */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative min-h-screen flex justify-center flex-col md:flex-row">
                <motion.div
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                    className="flex-1 flex justify-center items-center"
                >
                    <div className="w-full max-w-md px-8 py-12 md:py-16">
                        <motion.div variants={fadeIn} className="flex items-center justify-center space-x-2 mb-8">
                            <Calendar className="w-8 h-8 text-gray-300" />
                            <h2 className="text-xl font-medium text-gray-300">Event Hosts</h2>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold text-center mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-gray-100 to-blue-200">
                                Create & Manage Events
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-gray-400 text-lg text-center mb-8">
                            Powerful tools to organize, promote, and streamline your events with ease.
                        </motion.p>

                        <motion.div variants={fadeIn} className="space-y-4">
                            <button
                                onClick={() => navigate("/host-login")}
                                className="flex items-center justify-center w-full gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-8 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Login as Host
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="text-center">
                                <span className="text-gray-500">New to hosting?</span>
                                <button
                                    onClick={() => navigate("/host-signup")}
                                    className="ml-2 text-gray-300 hover:text-white transition-colors underline-offset-4 hover:underline"
                                >
                                    Create an account
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                    className="flex-1 flex justify-center items-center border-t md:border-t-0 md:border-l border-gray-800"
                >
                    <div className="w-full max-w-md px-8 py-12 md:py-16">
                        <motion.div variants={fadeIn} className="flex items-center justify-center space-x-2 mb-8">
                            <Users className="w-8 h-8 text-gray-300" />
                            <h2 className="text-xl font-medium text-gray-300">Attendees</h2>
                        </motion.div>

                        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold text-center mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-gray-100 to-purple-200">
                                Discover & Join Events
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeIn} className="text-gray-400 text-lg text-center mb-8">
                            Find and experience amazing events that match your interests.
                        </motion.p>

                        <motion.div variants={fadeIn} className="space-y-4">
                            <button
                                onClick={() => navigate("/attendee-login")}
                                className="flex items-center justify-center w-full gap-2 bg-transparent border-2 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white py-3 px-8 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Login as Attendee
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <div className="text-center">
                                <span className="text-gray-500">First time here?</span>
                                <button
                                    onClick={() => navigate("/attendee-signup")}
                                    className="ml-2 text-gray-300 hover:text-white transition-colors underline-offset-4 hover:underline"
                                >
                                    Join now
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
