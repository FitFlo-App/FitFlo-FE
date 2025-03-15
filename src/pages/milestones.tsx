import { motion } from "framer-motion";
import { Image } from "@heroui/react";

import { Timeline } from "@/components/ui/timeline";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  const data = [
    {
      title: "January 2025: Kicking Off the FitFlo Journey",
      content: (
        <div>
          <p className="text-black dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            In January 2025, we officially launched the FitFlo project. This
            phase focuses on setting clear goals, defining core features, and
            assembling a dedicated team of developers, designers, and healthcare
            experts. We also began building strategic partnerships with
            healthcare providers and technology platforms to ensure seamless
            integration of health data.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {["team-meeting"].map((img) => (
              <Image
                isZoomed
                key={img}
                alt={img}
                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                src="/team.jpg"
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "February - March 2025: Deep Research and Prototype Development",
      content: (
        <div>
          <p className="text-black dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            During these two months, we conducted in-depth research to
            understand the challenges faced by patients and healthcare
            providers. Our focus was on fragmented health data, high costs, and
            complex systems. We developed a prototype that includes key features
            such as real-time data sharing, AI-powered insights, and cost
            management tools.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              isZoomed
              alt="prototype-interface"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src="/milestones/prototyping.jpg"
            />
            <Image
              isZoomed
              alt="data-integration-diagram"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src="/arzul.jpg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "April 2025: Testing the Waters with Beta Launch",
      content: (
        <div>
          <p className="text-black dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            In April 2025, we released the beta version of FitFlo to a select
            group of early adopters. This phase allowed us to gather valuable
            feedback and refine the platform. Key features tested during the
            beta launch included personalized treatment plans, seamless data
            integration, and budget-friendly healthcare planning.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              isZoomed
              key="beta-version"
              alt="beta-version"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src="/showoff.jpg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "June 2025: Introducing FitFlo to the World",
      content: (
        <div>
          <p className="text-black dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            By June 2025, FitFlo was officially launched to the public. The
            platform quickly gained traction, helping thousands of users manage
            their health more effectively. The official launch included advanced
            features like wearable device integration, telemedicine support, and
            AI-driven health recommendations.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              isZoomed
              alt="main-dashboard"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src="/landing.png"
            />
            <Image
              isZoomed
              alt="user-statistics"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src=""
            />
          </div>
        </div>
      ),
    },
    {
      title: "August 2025: Scaling Up and Building Partnerships",
      content: (
        <div>
          <p className="text-black dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            In August 2025, FitFlo expanded its reach by partnering with
            hospitals, clinics, and insurance providers. These partnerships
            enabled us to integrate FitFlo into existing healthcare systems. We
            also introduced new features like advanced AI models and enhanced
            accessibility for underserved communities.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              isZoomed
              alt="partnership-logos"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src="/partner.png"
            />
            <Image
              isZoomed
              alt="healthcare-collaboration"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src=""
            />
          </div>
        </div>
      ),
    },
    {
      title: "2026 and Beyond: Transforming Healthcare Globally",
      content: (
        <div>
          <p className="text-black dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Looking ahead to 2026, FitFlo aims to become a global leader in
            value-based healthcare. We plan to expand into international
            markets, introduce cutting-edge AI models, and enhance accessibility
            for underserved communities. Our vision is to make quality
            healthcare accessible to everyone, everywhere.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              isZoomed
              alt="global-expansion-map"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src="/world.jpeg"
            />
            <Image
              isZoomed
              alt="diverse-users"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
              src=""
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="absolute inset-0 blur-3xl opacity-30 -z-10" />

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 relative">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400"
          initial={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="min-h-screen w-full">
            <Timeline data={data} />
          </div>
        </motion.div>
      </section>
    </DefaultLayout>
  );
}
