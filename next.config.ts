import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["three", "three-globe", "@react-three/fiber"],
}

export default nextConfig