import { motion, useInView } from "framer-motion";
import {
  FaHeartbeat,
  FaMoneyBillWave,
  FaClock,
  FaGlobeAmericas,
  FaChartLine,
} from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

const impactData = [
  {
    icon: <FaHeartbeat className="text-red-600" size={50} />,
    title: "Better Health Outcomes for Patients",
    description:
      "FitFlo helps patients achieve better health outcomes by providing personalized treatment plans and real-time monitoring. Over 80% of users report improved symptom management within the first month of using FitFlo.",
    bgColor: "from-red-200 to-red-400",
  },
  {
    icon: <FaMoneyBillWave className="text-green-600" size={50} />,
    title: "Reduced Healthcare Costs",
    description:
      "FitFlo reduces healthcare costs by up to 30% through optimized treatment planning and budget-friendly tools. Patients save an average of $350 per month on medical expenses with FitFlo's cost management features.",
    bgColor: "from-green-200 to-green-400",
  },
  {
    icon: <FaClock className="text-blue-600" size={50} />,
    title: "Empowering Doctors with Time-Saving Tools",
    description:
      "Doctors save an average of 2 hours per day by accessing integrated patient data through FitFlo. Over 70% of doctors report faster decision-making with FitFlo's AI-powered insights.",
    bgColor: "from-blue-200 to-blue-400",
  },
  {
    icon: <FaGlobeAmericas className="text-purple-600" size={50} />,
    title: "Accessible Healthcare for Everyone",
    description:
      "FitFlo makes healthcare accessible to all, regardless of location or technical expertise. With a user-friendly interface, over 90% of users find FitFlo easy to use within the first week.",
    bgColor: "from-purple-200 to-purple-400",
  },
  {
    icon: <FaChartLine className="text-indigo-600" size={50} />,
    title: "Scalable Solutions for Global Impact",
    description:
      "FitFlo is designed to scale seamlessly, from local clinics to national healthcare systems. Already helping 100+ users thrive, FitFlo is ready to expand globally.",
    bgColor: "from-indigo-200 to-indigo-400",
  },
];

// Card configuration object with customizable settings for each card
const cardConfigs = [
  { topOffset: 0, rotation: 2.5, xOffset: 12, overlayOpacity: 0.1 },
  { topOffset: 10, rotation: -3, xOffset: -14, overlayOpacity: 0.12 },
  { topOffset: 125, rotation: 2.8, xOffset: 10, overlayOpacity: 0.08 },
  { topOffset: 125, rotation: -2.2, xOffset: -11, overlayOpacity: 0.15 },
  { topOffset: 130, rotation: 3.2, xOffset: 13, overlayOpacity: 0.1 },
];

const ImpactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-4 pb-[80px] md:pt-8 bg-white overflow-hidden" // Reduced bottom padding
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-200 opacity-20 blur-3xl rounded-full" />
      {/* Combined section with header and cards */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-20 relative z-10">
          <motion.h3
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide text-lg"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            IMPACT
          </motion.h3>
          <motion.h2
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-extrabold mt-2 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            How FitFlo Transforms Healthcare
          </motion.h2>
          <p className="text-sm md:text-md text-gray-700 mt-4 max-w-3xl mx-auto">
            Our platform delivers measurable improvements across the healthcare
            ecosystem, from patient outcomes to doctor efficiency and cost
            reduction.
          </p>
        </div>

        {/* Card container with reversed stacking order */}
        <div className="relative mb-[40px]">
          {" "}
          {/* Reduced bottom margin */}
          {isMounted &&
            // Reverse the order of cards so later cards are rendered on top
            [...impactData].map((impact, index) => (
              <CardWithInViewAnimation
                key={index}
                config={cardConfigs[index % cardConfigs.length]} // Apply configuration cyclically
                impact={impact}
                index={index}
                totalCards={impactData.length}
              />
            ))}
        </div>
      </div>
      {/* Additional bottom spacing */}
      <div className="h-[80px]" /> {/* Reduced extra space */}
    </section>
  );
};

// Updated interface to include configuration
interface CardProps {
  impact: (typeof impactData)[0];
  index: number;
  totalCards: number;
  config: {
    topOffset: number;
    rotation: number;
    xOffset: number;
    overlayOpacity: number;
  };
}

const CardWithInViewAnimation = ({
  impact,
  index,
  totalCards,
  config,
}: CardProps) => {
  // Ref for viewport detection
  const cardRef = useRef<HTMLDivElement>(null);

  // Use inView hook with aggressive triggering
  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.15, // Trigger with even less visibility
    margin: "0px 0px -300px 0px", // More negative margin for earlier trigger
  });

  // Calculate vertical position based on the config
  const topPosition = config.topOffset;

  // Use configuration values for rotation and offset
  const xOffset = config.xOffset;
  const baseRotation = config.rotation;

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      x: xOffset * 1.2,
      rotate: baseRotation * 1.5,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: xOffset,
      rotate: baseRotation,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      },
    },
  };

  // Calculate where the "reverse" effect should happen - higher cards have negative bottom margins
  const negativeMargin = index === 0 ? 0 : -130;

  return (
    <motion.div
      ref={cardRef}
      animate={isInView ? "visible" : "hidden"}
      className={`p-8 rounded-3xl shadow-xl flex flex-col items-center text-center bg-gradient-to-br ${impact.bgColor} relative overflow-hidden w-full max-w-xl mx-auto`} // Changed: items-start → items-center, text-left → text-center
      initial="hidden"
      style={{
        marginTop: topPosition, // Use the calculated topPosition
        marginBottom: negativeMargin, // Creates the effect where the top of the card goes under previous cards
        zIndex: totalCards - index, // Reverse the stack order for the "top goes under" effect
        transformOrigin: "center bottom", // Change origin to bottom for better rotation effect
        boxShadow:
          "0 15px 30px -10px rgba(0, 0, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
      }}
      variants={cardVariants}
    >
      <div className="p-5 bg-white rounded-full shadow-lg mb-6">
        {impact.icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
        {impact.title}
      </h3>
      <p className="text-gray-800 text-md leading-relaxed">
        {impact.description}
      </p>
      <div
        className="absolute inset-0 bg-white blur-2xl"
        style={{ opacity: config.overlayOpacity }}
      />
    </motion.div>
  );
};

export default ImpactSection;
