"use client"

import { motion } from "framer-motion"

const MotionDiv = motion("div")

export function RegisterHero() {
  return (
    <MotionDiv
      className="flex w-full flex-col items-center justify-center p-8 text-center md:w-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-neutro-dark md:text-6xl">Conoce tus Emociones</h1>

        <div className="text-4xl font-bold text-neutro-dark md:text-6xl">con</div>

        <MotionDiv
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3.5, ease: "easeOut" }}
        >
          <span className="text-5xl font-bold text-primary-dark md:text-7xl">SÉNTIA</span>
        </MotionDiv>
      </div>
    </MotionDiv>
  )
}
