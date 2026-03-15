"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone, Globe, Server, Mail, ExternalLink } from "lucide-react";

export const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("fitflo-announcement-dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("fitflo-announcement-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border-b border-blue-100 relative z-[60] overflow-hidden"
        >
          <div className="container mx-auto px-4 py-3 md:py-4">
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200/50 p-4 md:p-6 shadow-sm overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/5 rounded-full -ml-12 -mb-12 blur-2xl" />
              
              <div className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8 justify-between">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 bg-blue-600 text-white rounded-lg shadow-blue-200 shadow-lg">
                      <Megaphone size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Important: Domain & Email Migration</h3>
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-600 mb-4 max-w-4xl leading-relaxed">
                    Since <b>13 March 2026</b>, FitFlo has transitioned to new official domains. 
                    The previous <code>fitflo.site</code> domain was not renewed. 
                    Please update your bookmarks and contacts to stay connected.
                  </p>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    <a href="https://fitflo.faizath.com" className="group flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                        <Globe size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-blue-500 uppercase tracking-wider font-bold">New Website</span>
                        <span className="flex items-center gap-1">fitflo.faizath.com <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></span>
                      </div>
                    </a>

                    <a href="https://fitflo-api.faizath.com" className="group flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-800 transition-colors">
                      <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                        <Server size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-indigo-500 uppercase tracking-wider font-bold">New API</span>
                        <span className="flex items-center gap-1">fitflo-api.faizath.com <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></span>
                      </div>
                    </a>

                    <a href="mailto:fitflo@faizath.com" className="group flex items-center gap-2 text-sm font-medium text-indigo-700 hover:text-indigo-800 transition-colors">
                      <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                        <Mail size={14} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-indigo-500 uppercase tracking-wider font-bold">New Email</span>
                        <span className="flex items-center gap-1">fitflo@faizath.com <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></span>
                      </div>
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleDismiss}
                  className="group flex items-center gap-2 bg-white/80 hover:bg-white border border-slate-200 rounded-full py-1.5 px-4 text-xs font-semibold text-slate-600 transition-all shadow-sm hover:shadow-md"
                  aria-label="Dismiss announcement"
                >
                  Dismiss <X size={14} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
