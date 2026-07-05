"use client"

import type { SimpleIcon } from "simple-icons"
import {
  siAngular,
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
  | { type: "custom"; name: string }

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
  { type: "icon", icon: siAngular },
  { type: "icon", icon: siNextdotjs },
  { type: "icon", icon: siNestjs },
  { type: "icon", icon: siPhp },
  { type: "icon", icon: siLaravel },
]

const iconClassName =
  "size-7 shrink-0 fill-foreground/55 transition-colors duration-200 hover:fill-foreground"

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={icon.title}
      className={iconClassName}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  )
}

function AnalogIcon() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label="Analog"
      className={iconClassName}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.5 21.5 20.5H14.8L12 15.2 9.2 20.5H2.5L12 2.5Z" />
      <path d="M12 7.2 17.4 17.8H14.6L12 13.1 9.4 17.8H6.6L12 7.2Z" />
    </svg>
  )
}

function LogoItemView({ logo }: { logo: LogoItem }) {
  if (logo.type === "custom") {
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
      className={cn("flex w-max items-center gap-10 px-5", className)}
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

      <div className="flex w-full items-center gap-6 py-5">
        <p className="shrink-0 text-sm font-medium tracking-wide text-muted-foreground uppercase">
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