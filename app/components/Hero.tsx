"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// const VIDEO_URL =
//   "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const VIDEO_URL = "https://www.pexels.com/download/video/34059053/"

const transition = {
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col items-center px-4">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 mt-16 flex flex-col items-center text-center md:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, duration: 0.5 }}
            className="liquid-glass mb-6 flex items-center gap-2 rounded-lg px-3 py-2"
          >
            <span className="rounded-md bg-white px-2 py-0.5 text-sm font-medium text-black">
              New
            </span>

            <span className="text-sm font-medium text-white/65">
              Say Hello to Evento
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, duration: 0.6, delay: 0.1 }}
            className="max-w-5xl text-5xl font-medium leading-tight tracking-[-2px] md:text-7xl md:leading-[1.15]"
          >
            Your Single Destination.
            <br />
            for all Your College{" "}
            <span className="font-serif font-normal italic">Events.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, duration: 0.6, delay: 0.2 }}
            className="mb-8 mt-4 text-lg font-normal leading-6 opacity-90"
            style={{ color: "hsl(var(--hero-subtitle))" }}
          >
            Evento Helps clubs and organizations manage their events, and
            <br />
            people to discover and join events happening around them.
          </motion.p>

          <motion.a
            href="#reviews"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-white px-8 py-3.5 text-base font-medium text-black"
          >
            Get Started for Free
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, duration: 0.8, delay: 0.4 }}
          className="relative mt-16 w-screen aspect-video md:mt-24"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover rounded-[10%]"
          >
            <source src={"/video.mp4"} type="video/mp4" />
          </video>

          <motion.img
            src="https://static.coupler.io/templates/web-analytics-dashboard-template-spreadsheets.png"
            alt="Neuralyn analytics dashboard"
            style={{
              y: dashboardY,
              mixBlendMode: "luminosity",
            }}
            className="absolute left-1/2 top-0 z-10 w-[90%] max-w-5xl -translate-x-1/2 rounded-2xl shadow-2xl"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-t from-black to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
