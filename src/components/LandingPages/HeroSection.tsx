import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaChartLine } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";

import dashboardImg from "../../assets/dashboard.png";

import { AuroraBackground } from "@/components/ui/aurora-background";
import LazyImage from "@/components/ui/lazy-image";

// Animation variants for floating effect
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

// Animation variants for subtle rotation
const tiltAnimation = {
  initial: { rotate: 0 },
  animate: {
    rotate: [-1, 1, -1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

// Pulse animation
const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

const HeroSection = () => {
  const { scrollYProgress } = useScroll();

  // Mengubah range scrollYProgress dari [0, 0.4] menjadi [0, 0.2] agar efek lebih cepat
  // Dan memperbesar nilai rotasi dari 15 menjadi 25 derajat
  const rotate = useTransform(scrollYProgress, [0, 0.08], [25, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);
  // Memperbesar range pergerakan y dari [-80, 30] menjadi [-120, 50]
  const y = useTransform(scrollYProgress, [0, 0.08], [-120, 50]);

  return (
    <div className="relative">
      <AuroraBackground
        className="w-full min-h-screen overflow-hidden pb-10 pt-16"
        intensity="medium"
      >
        {/* Main content centered */}
        <div className="relative mx-auto px-4 md:px-6 h-full flex flex-col items-center z-10">
          {/* Content Container - All centered */}
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* Text Content - Centered */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center space-y-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              {/* Updated Badge/Label with #1 */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center"
                initial={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="flex items-center space-x-1 bg-black px-2 py-1 rounded-full shadow-sm mt-6">
                  <div className="bg-blue-600 text-white w-10 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                    #1
                  </div>
                  <span className="text-sm font-reguler text-white">
                    The First AI Health Path Optimizer
                  </span>
                </div>
              </motion.div>

              <motion.h1
                animate={{ opacity: 1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="block">
                  Your Path to{" "}
                  <span className="text-blue-600 underline decoration-blue-600 underline-offset-4">
                    Better Health
                  </span>
                </span>
                <span className="block">Starts Here</span>
              </motion.h1>

              <motion.p
                animate={{ opacity: 1 }}
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="block">
                  Track symptoms, plan treatments, and manage healthcare costs—
                </span>
                <span className="block">all in one place.</span>
              </motion.p>

              <motion.div
                animate={{ opacity: 1 }}
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {/* Reduced button size */}
                <Link to="/register">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium rounded-lg flex items-center justify-center gap-2 text-base"
                    variant="shadow"
                  >
                    Start My Journey
                    <FaArrowRight className="text-xs" />
                  </Button>
                </Link>
                <Button
                  className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                  variant="flat"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Device Image - Position moved higher to overlap with buttons */}
            <motion.div
              className="relative w-full flex justify-center items-center -mt-2"
              style={{
                perspective: 1200,
              }}
            >
              <motion.div
                animate={{ opacity: 1 }}
                className="w-full max-w-6xl mx-auto relative shadow-2xl rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                style={{
                  rotateX: rotate,
                  scale,
                  y,
                }}
                transition={{
                  delay: 0.8,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                <LazyImage
                  alt="Health Dashboard"
                  className="w-full h-auto"
                  src={dashboardImg}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Fixed position cards with adjusted positions to be lower and more centered */}
        <div className="fixed-cards">
          {/* Card 1 - Real-Time Monitoring - Top Left - Moved lower */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="fixed-card top-[160px] md:top-[180px] left-[8%] md:left-[12%] lg:left-[6%] z-20"
            initial={{ opacity: 0, x: -100 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate="animate"
              className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[240px]"
              variants={tiltAnimation}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FaChartLine className="text-blue-600 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800">
                  Real-Time Monitoring
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Track your progress with live updates and data visualizations.
              </p>
            </motion.div>
          </motion.div>

          {/* Card 2 - Reminders & Alerts - Top Right - Moved lower */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="fixed-card top-[160px] md:top-[180px] right-[8%] md:right-[12%] lg:right-[4%] z-20"
            initial={{ opacity: 0, x: 120 }}
            transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate="animate"
              className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[240px]"
              variants={pulseAnimation}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <MdAccessTime className="text-red-600 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800">
                  Reminders & Alerts
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Get timely notifications for medications, appointments, and
                more.
              </p>
            </motion.div>
          </motion.div>

          {/* Card 3 - Personalized Plans - Bottom Left - Moved lower */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="fixed-card top-[380px] md:top-[420px] left-[8%] md:left-[12%] lg:left-[4%] z-20"
            initial={{ opacity: 0, x: -120 }}
            transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate="animate"
              className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[240px]"
              variants={floatingAnimation}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <FaClipboardList className="text-green-600 text-xl" />
                </div>
                <h3 className="font-semibold text-gray-800">
                  Personalized Health Plans
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Receive tailored recommendations based on your condition and
                goals.
              </p>
            </motion.div>
          </motion.div>

          {/* Card 4 - Statistics Card - Bottom Right - Moved lower */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="fixed-card top-[380px] md:top-[420px] right-[8%] md:right-[12%] lg:right-[15%] z-20"
            initial={{ opacity: 0, x: 140 }}
            transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate="animate"
              className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[240px]"
              variants={tiltAnimation}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">
                  Treatment Statistics
                </h3>
              </div>
              <div className="mb-2 flex items-center">
                <span className="text-2xl font-bold">38,214</span>
                <span className="ml-2 text-green-500 text-sm font-medium">
                  +3.9%
                </span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Chronic Pain</span>
                    <span className="text-gray-500">55%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full w-full">
                    <div className="h-1.5 bg-blue-500 rounded-full w-[55%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Digestive</span>
                    <span className="text-gray-500">25%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full w-full">
                    <div className="h-1.5 bg-blue-500 rounded-full w-[25%]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Add CSS for fixed cards */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
        .fixed-cards {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .fixed-card {
          position: absolute;
          pointer-events: auto;
          display: none;
        }
        @media (min-width: 768px) {
          .fixed-card {
            display: block;
          }
        }
        `,
          }}
        />
      </AuroraBackground>

      {/* White gradient overlay for smooth transition */}
      <div
        className="absolute bottom-0 left-0 w-full h-60 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,1) 100%)",
        }}
      />
    </div>
  );
};

export default HeroSection;
