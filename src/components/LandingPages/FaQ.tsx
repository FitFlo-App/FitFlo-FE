"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Keep existing FAQ data
const faqs = [
  {
    id: 1,
    question: "What is FitFlo?",
    answer:
      "FitFlo is a medical pathway planner app that helps users understand and follow the necessary treatments and complete medication journeys. It provides personalized treatment plans, medication tracking, and progress monitoring to support your health journey.",
  },
  {
    id: 2,
    question: "How does FitFlo work?",
    answer:
      "FitFlo analyzes your medical condition and provides a structured pathway to guide you through your treatment. It includes reminders for medication, check-ups, and lifestyle changes, making it easier to stay on track with your healthcare routine.",
  },
  {
    id: 3,
    question: "Who can use FitFlo?",
    answer:
      "FitFlo is designed for anyone who needs help managing their health journey, including chronic illness patients, caregivers, elderly individuals, and those undergoing long-term treatments.",
  },
  {
    id: 4,
    question: "Is my medical data secure on FitFlo?",
    answer:
      "Absolutely! FitFlo prioritizes user privacy and follows industry-standard encryption to ensure your medical information remains safe and confidential.",
  },
  {
    id: 5,
    question: "How can I get customer support?",
    answer:
      "You can reach our customer support team through the in-app chat or email us at hello@fitflo.site. We're here to help 24/7!",
  },
];

// Helper function for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// FaqItem subcomponent
const FaqItem = ({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  id: number;
  index: number;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group rounded-lg",
        "transition-all duration-200 ease-in-out",
        "border border-gray-200",
        isOpen
          ? "bg-gradient-to-br from-white via-gray-50 to-white"
          : "hover:bg-gray-50"
      )}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3
          className={cn(
            "text-base font-medium transition-colors duration-200",
            "text-gray-700",
            isOpen && "text-gray-900"
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          className={cn(
            "p-0.5 rounded-full flex-shrink-0",
            "transition-colors duration-200",
            isOpen ? "text-blue-600" : "text-gray-500"
          )}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
            initial={{ height: 0, opacity: 0 }}
          >
            <div className="px-6 pb-4 pt-2">
              <motion.p
                animate={{ y: 0, opacity: 1 }}
                className="text-sm text-gray-700 leading-relaxed"
                exit={{ y: -10, opacity: 0 }}
                initial={{ y: -10, opacity: 0 }}
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaQ = () => {
  return (
    <section className="py-16 w-full bg-gradient-to-b from-transparent via-gray-50 to-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-blue-700 font-semibold uppercase tracking-wide text-lg">
            Frequently Asked Questions
          </h3>
          <h2 className="text-xl md:text-2xl font-extrabold mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Have questions? We've got answers!
          </h2>
          <p className="text-sm text-gray-600">
            Explore our FAQs to learn how FitFlo can help you take control of
            your health journey.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.id}
              answer={faq.answer}
              id={faq.id}
              index={index}
              question={faq.question}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaQ;
