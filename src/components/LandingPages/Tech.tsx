import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Tech = () => {
  return (
    <div>
      {/* Powered by Cutting-Edge Technology Section */}
      <motion.div
        className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:pt-9 lg:pb-4 mx-auto"
        initial="hidden"
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true, amount: 0.5 }} // updated trigger threshold
        whileInView="visible"
      >
        {/* Title */}
        <motion.div
          className="w-2/3 sm:w-1/2 lg:w-1/3 mx-auto text-center mb-6"
          variants={fadeIn}
        >
          <h2 className="text-gray-600">Powered by Cutting-Edge Technology</h2>
        </motion.div>
        {/* End Title */}
        <div className="flex justify-center gap-x-6 sm:gap-x-12 lg:gap-x-24">
          {/* Intersystems IRIS */}
          <motion.img
            alt="Intersystems IRIS"
            className="py-3 lg:py-5 w-24 h-auto md:w-28 lg:w-32 mx-auto sm:mx-0"
            src="/iris.svg"
            style={{ objectFit: "contain" }}
            variants={fadeIn}
          />
          {/* qwen */}
          <motion.img
            alt="qwen"
            className="py-3 lg:py-5 w-24 h-auto md:w-28 lg:w-32 mx-auto sm:mx-0"
            src="/qwen.png"
            style={{ objectFit: "contain" }}
            variants={fadeIn}
          />
          {/* deepseek */}
          <motion.img
            alt="deepseek"
            className="py-3 lg:py-5 w-24 h-auto md:w-28 lg:w-32 mx-auto sm:mx-0"
            src="/deepseek.png"
            style={{ objectFit: "contain" }}
            variants={fadeIn}
          />
          {/* gemma */}
          <motion.img
            alt="gemma"
            className="py-3 lg:py-5 w-24 h-auto md:w-28 lg:w-24 mx-auto sm:mx-0"
            src="/gemma.png"
            style={{ objectFit: "contain" }}
            variants={fadeIn}
          />
          {/* tensorflow */}
          <motion.img
            alt="tensorflow"
            className="py-3 lg:py-5 w-32 h-auto md:w-36 lg:w-40 mx-auto sm:mx-0"
            src="/tensorflow.png"
            style={{ objectFit: "contain" }}
            variants={fadeIn}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Tech;
