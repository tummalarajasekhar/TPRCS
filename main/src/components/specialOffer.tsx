"use client"
import{useRouter} from "next/navigation"
import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SpecialOffer = () => {
    const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [transformStyle, setTransformStyle] = useState("rotate(-5deg)")

  // Mouse move tilt effect (all screens)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      setTransformStyle(`rotate(-5deg) translate(${x}px, ${y}px)`)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Reset collapse when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className="fixed bottom-6  mb-6 md:right-6 z-50 transition-transform duration-300"
      style={{ transform: transformStyle }}
    >
      <div className="flex items-end">
        {/* Toggle Button (only on small screens) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="md:hidden bg-pink-500 text-white p-2 rounded-l-lg rounded-r-none shadow-md"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Offer Content */}
        <div
          className={`relative w-64 rounded-lg border-2 border-dashed border-red-500 bg-gradient-to-br from-pink-400 to-pink-200 p-6 text-center shadow-xl transition-all duration-500
          ${isCollapsed ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}
        >
          {/* Ribbon */}
          <div className="absolute -top-2 -right-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            Limited Time!
          </div>

          {/* Hidden offer circle */}
          <div className="absolute -top-3 -left-3 h-10 w-10 rounded-full bg-red-500 shadow-md"></div>
          <div className="absolute -top-2 -left-2 -rotate-45 text-xs font-bold text-white">
            Offer
          </div>

          {/* Content */}
          <div className="text-xl font-extrabold uppercase tracking-wide text-gray-800">
            Basic Website
          </div>
          <div className="mt-2 text-3xl font-extrabold text-red-600">
            <span className="mr-2 text-lg line-through text-gray-600">₹9,999</span>
            ₹ 3,999/year
          </div>
          <div className="mt-2 text-sm text-gray-700">5 Page Responsive Site</div>

          {/* Button */}
          <button
            className="mt-4 w-full rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-5 py-2 font-bold text-white shadow-md transition-transform hover:scale-105 hover:shadow-lg"
            onClick={() =>  router.push('/special-offer') }
          >
            Try Now
          </button>

          <div className="mt-2 text-xs italic text-gray-600">
            Pay after demo approval!
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffer
