"use client"

import dynamic from "next/dynamic"

import type { GlobeConfig } from "@/components/ui/globe"

const World = dynamic(
  () => import("@/components/ui/globe").then((mod) => mod.World),
  { ssr: false }
)

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#000000",
  globeOpacity: 0,
  showAtmosphere: false,
  emissive: "#000000",
  emissiveIntensity: 0,
  shininess: 0,
  polygonColor: "rgba(255,255,255,0.55)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1200,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.6,
  enableDrag: true,
}

const globeArcs = [
  {
    order: 1,
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.2,
    color: "#ffffff",
  },
  {
    order: 1,
    startLat: 35.6762,
    startLng: 139.6503,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.2,
    color: "#ffffff",
  },
  {
    order: 2,
    startLat: 37.7749,
    startLng: -122.4194,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.25,
    color: "#ffffff",
  },
  {
    order: 2,
    startLat: 48.8566,
    startLng: 2.3522,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.3,
    color: "#ffffff",
  },
  {
    order: 3,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 19.076,
    endLng: 72.8777,
    arcAlt: 0.25,
    color: "#ffffff",
  },
  {
    order: 3,
    startLat: -23.5505,
    startLng: -46.6333,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.35,
    color: "#ffffff",
  },
]

export default function HeroGlobe() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[min(1100px,150vw)] translate-y-[42%]">
      <World globeConfig={globeConfig} data={globeArcs} />
    </div>
  )
}