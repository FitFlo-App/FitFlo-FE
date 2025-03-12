import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
import {
  FaHeartbeat,
  FaMoneyBillWave,
  FaClock,
  FaGlobeAmericas,
  FaChartLine,
} from "react-icons/fa";
import { useRef } from "react";

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
      "FitFlo is designed to scale seamlessly, from local clinics to national healthcare systems. Already helping 10,000+ users thrive, FitFlo is ready to expand globally.",
    bgColor: "from-indigo-200 to-indigo-400",
  },
];

const ImpactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative pt-4 pb-28 md:pt-8 md:pb-1 bg-white overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-200 opacity-20 blur-3xl rounded-full" />

      {/* Combined section with header and cards */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-2 md:mb-4 relative z-10">
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
            className="text-3xl md:text-4xl font-extrabold mt-2 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            How FitFlo Transforms Healthcare
          </motion.h2>
          <p className="text-md md:text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
            Our platform delivers measurable improvements across the healthcare
            ecosystem, from patient outcomes to doctor efficiency and cost
            reduction.
          </p>
        </div>

        {/* Sticky container for card animations */}
        <div ref={containerRef} className="sticky-cards-container h-[220vh]">
          <div className="sticky top-2 md:top-4 pt-7 pb-6">
            <div className="card-stack-wrapper max-w-xl w-full mx-auto relative h-[450px]">
              {impactData.map((impact, index) => (
                <CardWithScrollAnimation
                  key={index}
                  containerRef={containerRef}
                  impact={impact}
                  index={index}
                  totalCards={impactData.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add extra space after the cards */}
      <div className="h-16 md:h-2" />
    </section>
  );
};

interface CardProps {
  impact: (typeof impactData)[0];
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
  totalCards: number;
}

const CardWithScrollAnimation = ({
  impact,
  index,
  containerRef,
  totalCards,
}: CardProps) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["-0.3 start", "end end"],
  });

  // Create custom easing function
  const customEase = cubicBezier(0.16, 1, 0.3, 1);

  // Calculate when each card should appear based on scroll progress
  const sectionProgressPerCard = 1 / (totalCards + 0.05);
  const cardAppearStart = Math.max(0, index * sectionProgressPerCard - 0.05);
  const cardAppearEnd = cardAppearStart + sectionProgressPerCard * 0.7;

  // Card animations based on scroll
  const opacity = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [0, 1],
    { ease: customEase }
  );

  // Modified y transform - cards come from below
  const y = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [100, 0],
    { ease: customEase }
  );

  const scale = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [0.92, 1],
    { ease: customEase }
  );

  // More pronounced rotation for a file-like stacking effect
  const baseRotation = index % 2 === 0 ? 2.5 : -2.5;
  const rotation = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [baseRotation * 1.5, baseRotation],
    { ease: customEase }
  );

  // Slight x-offset for natural card positioning
  const xOffset = index % 2 === 0 ? 8 : -8;
  const x = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [xOffset * 1.8, xOffset],
    { ease: customEase }
  );

  // Show slight edges of cards to create stacking effect
  // Earlier cards peek out slightly from behind the top card
  const topOffset = index * 4;
  const leftOffset = index % 2 === 0 ? index * 2 : 0;
  const rightOffset = index % 2 === 1 ? index * 2 : 0;

  // Ensure proper stacking order - newer cards completely cover older ones
  // Use a much bigger z-index increment to ensure proper stacking
  const zIndex = index * 10;

  return (
    <motion.div
      className={`p-8 rounded-3xl shadow-xl flex flex-col items-start text-left bg-gradient-to-br ${impact.bgColor} relative overflow-hidden absolute w-full`}
      style={{
        opacity,
        y,
        x,
        scale,
        rotate: rotation,
        zIndex,
        top: topOffset,
        left: leftOffset,
        right: rightOffset,
        transformOrigin: "center bottom",
        boxShadow:
          "0 15px 30px -10px rgba(0, 0, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="p-5 bg-white rounded-full shadow-lg self-center mb-6">
        {impact.icon}
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
        {impact.title}
      </h3>
      <p className="text-gray-800 text-md leading-relaxed">
        {impact.description}
      </p>
      <div className="absolute inset-0 bg-white opacity-10 blur-2xl" />
    </motion.div>
  );
};

export default ImpactSection;
