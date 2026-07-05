import { cn } from "@/lib/utils"

type SvgDividerProps = {
  className?: string
}

export function SvgDividerHorizontal({ className }: SvgDividerProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute left-1/2 h-px w-[99dvw] -translate-x-1/2",
        className
      )}
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        stroke="var(--divider)"
        strokeWidth="1"
        strokeDasharray="16 16"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function SvgDividerVertical({ className }: SvgDividerProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute top-1/2 h-full w-px -translate-y-1/2",
        className
      )}
      viewBox="0 0 1 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="100"
        stroke="var(--divider)"
        strokeWidth="1"
        strokeDasharray="16 16"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default SvgDividerHorizontal
