import { motion, useScroll, useTransform, cubicBezier } from "framer-motion";
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

const ImpactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;

      containerRef.current.style.height = `${height}px`;
    }

    return () => setIsMounted(false);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-4 pb-[80px] md:pt-8 bg-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-200 opacity-20 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-6">
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

        <div
          ref={containerRef}
          className="sticky-cards-container h-[100vh]"
          id="impact-scroll-container"
        >
          <div className="sticky top-2 md:top-4 pt-7">
            <div className="card-stack-wrapper max-w-xl w-full mx-auto relative h-[250px]">
              {isMounted &&
                impactData.map((impact, index) => (
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

      <div className="h-1" />
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
    offset: ["start 0.7", "end 0.8"],
  });

  const customEase = cubicBezier(0.16, 1, 0.3, 1);

  const sectionProgressPerCard = 1 / (totalCards + 0.5);
  const cardAppearStart = index * sectionProgressPerCard;
  const cardAppearEnd = Math.min(
    1,
    cardAppearStart + sectionProgressPerCard * 0.8
  );

  const opacity = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [0, 1],
    { ease: customEase }
  );

  const y = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [-100, 0],
    { ease: customEase }
  );

  const scale = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [0.92, 1],
    { ease: customEase }
  );

  const baseRotation = index % 2 === 0 ? 2.5 : -2.5;
  const rotation = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [baseRotation * 1.5, baseRotation],
    { ease: customEase }
  );

  const xOffset = index % 2 === 0 ? 8 : -8;
  const x = useTransform(
    scrollYProgress,
    [cardAppearStart, cardAppearEnd],
    [xOffset * 1.8, xOffset],
    { ease: customEase }
  );

  const topOffset = index * 4;
  const leftOffset = index % 2 === 0 ? index * 2 : 0;
  const rightOffset = index % 2 === 1 ? index * 2 : 0;

  const zIndex = (totalCards - index) * 10;

  return (
    <motion.div
      className={`p-8 rounded-3xl shadow-xl flex flex-col items-start text-left bg-gradient-to-br ${impact.bgColor} relative overflow-hidden w-full`}
      initial={{ opacity: 0, y: -100 }}
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