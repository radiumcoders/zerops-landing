"use client"

import type { SimpleIcon } from "simple-icons"
import {
  siAstro,
  siBun,
  siDeno,
  siDotnet,
  siGleam,
  siGo,
  siLaravel,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNuxt,
  siOpenjdk,
  siPhp,
  siPython,
  siQwik,
  siReact,
  siRuby,
  siRust,
  siSolid,
  siSvelte,
  siVuedotjs,
} from "simple-icons"

import SvgDividerHorizontal from "@/components/utils/svg-line"
import { cn } from "@/lib/utils"

type LogoItem =
  | { type: "icon"; icon: SimpleIcon }
  | { type: "custom"; name: "analog" | "angular" }

const TECH_LOGOS: LogoItem[] = [
  { type: "icon", icon: siBun },
  { type: "icon", icon: siDeno },
  { type: "icon", icon: siGo },
  { type: "icon", icon: siOpenjdk },
  { type: "icon", icon: siPython },
  { type: "icon", icon: siRust },
  { type: "icon", icon: siGleam },
  { type: "icon", icon: siSvelte },
  { type: "icon", icon: siNodedotjs },
  { type: "icon", icon: siRuby },
  { type: "icon", icon: siReact },
  { type: "icon", icon: siVuedotjs },
  { type: "icon", icon: siAstro },
  { type: "icon", icon: siSolid },
  { type: "icon", icon: siQwik },
  { type: "custom", name: "analog" },
  { type: "icon", icon: siNuxt },
  { type: "icon", icon: siDotnet },
  { type: "custom", name: "angular" },
  { type: "icon", icon: siNextdotjs },
  { type: "icon", icon: siNestjs },
  { type: "icon", icon: siPhp },
  { type: "icon", icon: siLaravel },
]

const iconClassName =
  "size-6 shrink-0 transition-opacity duration-200 hover:opacity-80 sm:size-7"

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={icon.title}
      className={cn(iconClassName, icon.hex === "000000" && "dark:invert")}
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: `#${icon.hex}` }}
    >
      <path d={icon.path} />
    </svg>
  )
}

function AnalogIcon() {
  return (
    <img
      src="/logos/analog.svg"
      alt="Analog"
      className="h-6 w-auto shrink-0 transition-opacity duration-200 hover:opacity-80 sm:h-7"
    />
  )
}

function AngularIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label="Angular"
      className={iconClassName}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#DD0031"
        d="M16.712 17.711H7.288l-1.204 2.916L12 24l5.916-3.373-1.204-2.916Z"
      />
      <path
        fill="#C3002F"
        d="M14.692 0l7.832 16.855.814-12.856L14.692 0Z"
      />
      <path fill="#DD0031" d="M9.308 0 .662 3.999l.814 12.856L9.308 0Z" />
    </svg>
  )
}

function LogoItemView({ logo }: { logo: LogoItem }) {
  if (logo.type === "custom") {
    if (logo.name === "angular") {
      return <AngularIcon />
    }

    return <AnalogIcon />
  }

  return <BrandIcon icon={logo.icon} />
}

function MarqueeTrack({
  logos,
  className,
  hidden,
}: {
  logos: LogoItem[]
  className?: string
  hidden?: boolean
}) {
  return (
    <div
      aria-hidden={hidden}
      className={cn("flex w-max items-center gap-6 px-3 sm:gap-10 sm:px-5", className)}
    >
      {logos.map((logo, index) => (
        <div
          key={`${logo.type === "icon" ? logo.icon.slug : logo.name}-${index}`}
          className="flex items-center justify-center"
        >
          <LogoItemView logo={logo} />
        </div>
      ))}
    </div>
  )
}

export default function WorksWithMarquee() {
  return (
    <div className="relative w-full bg-background">
      <SvgDividerHorizontal className="top-0" />

      <div className="flex w-full flex-col items-stretch gap-3 px-2 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-0 sm:py-5">
        <p className="shrink-0 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase sm:text-left sm:text-sm">
          Works With
        </p>

        <div className="works-with-marquee-mask relative min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-works-with-marquee">
            <MarqueeTrack logos={TECH_LOGOS} />
            <MarqueeTrack logos={TECH_LOGOS} hidden />
          </div>
        </div>
      </div>

      <SvgDividerHorizontal className="bottom-0" />
    </div>
  )
}