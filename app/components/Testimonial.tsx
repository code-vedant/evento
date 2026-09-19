"use client"

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const quote =
  "Neuralyn revolutionized how we handle financial insights using smart analytics. We are now driving better outcomes quicker than we ever imagined! Neuralyn revolutionized how we handle financial insights using smart analytics.";

export default function Testimonial() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const words = quote.split(" ");

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="min-h-screen px-8 py-24 md:px-28 md:py-32"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-10">
        <Image
          src="/quote-symbol.png"
          alt=""
          width={500}
          height={500}
          className="h-10 w-14 object-contain"
        />

        <blockquote className="text-4xl font-medium leading-[1.2] tracking-tight md:text-5xl">
          {words.map((word, index) => {
            const start = index / words.length;
            const end = (index + 1) / words.length;

            return (
              <Word
                key={`${word}-${index}`}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}

          <span className="ml-2 text-muted-foreground">"</span>
        </blockquote>

        <div className="flex items-center gap-4">
          <Image
            src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Brooklyn Simmons"
            
          width={500}
          height={500}
            className="h-14 w-14 rounded-full border-[3px] border-white object-cover"
          />

          <div>
            <p className="text-base font-semibold leading-7">
              Brooklyn Simmons
            </p>
            <p className="text-sm font-normal leading-5 text-white/65">
              Product Manager
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["hsl(0 0% 35%)", "hsl(0 0% 100%)"]
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.3em] inline-block"
    >
      {word}
    </motion.span>
  );
}