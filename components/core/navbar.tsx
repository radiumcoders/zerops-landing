"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { RiArrowDownSLine } from "@remixicon/react"

import { Button, buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import SvgDividerHorizontal from "../utils/svg-line"

function LogoSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42.27 50.48"
      className="h-8 w-auto fill-foreground"
      aria-hidden="true"
    >
      <path
        d="M20.19.7L3 7.27A4 4 0 0 0 .46 11v16.54L8.36 23v-9.3L21.6 8.62V.44a4 4 0 0 0-1.41.26z"
        transform="translate(-.46 -.44)"
      />
      <path
        d="M8.5 37.74l13.1-7.55v-9.12L1.36 32.74a1.82 1.82 0 0 0-.9 1.56v6.11A4 4 0 0 0 3 44.1l17.19 6.57a4 4 0 0 0 1.41.26v-8.18z"
        transform="translate(-.46 -.44)"
      />
      <path
        d="M41.9 18.47a1.67 1.67 0 0 0 .84-1.47v-6a4 4 0 0 0-2.54-3.73L23 .7a4 4 0 0 0-1.4-.26v8.18l13 5-13 7.49v9.12z"
        transform="translate(-.46 -.44)"
      />
      <path
        d="M23 50.67l17.2-6.57a4 4 0 0 0 2.54-3.69V23.7l-7.9 4.56v9.43L21.6 42.75v8.18a4 4 0 0 0 1.4-.26z"
        transform="translate(-.46 -.44)"
      />
    </svg>
  )
}

type NavItem = {
  title: string
  href?: string
  dropdown?: string[]
}

const navItems: NavItem[] = [
  {
    title: "Deploy",
    dropdown: ["Deploy", "Pricing", "Features"],
  },
  {
    title: "ZCP",
    href: "/zcp",
  },
  {
    title: "Resources",
    dropdown: ["Docs", "Blogs"],
  },
  {
    title: "Company",
    dropdown: ["Status", "About"],
  },
]

const MIN_DROPDOWN_WIDTH = 144 // matches old min-w-36

function Navbar() {
  const [active, setActive] = useState<NavItem | null>(null)
  const [coords, setCoords] = useState({ left: 0, width: 0 })

  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const handleEnter = (item: NavItem) => {
    const el = itemRefs.current[item.title]
    const nav = navRef.current
    if (el && nav) {
      const elRect = el.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      setCoords({ left: elRect.left - navRect.left, width: elRect.width })
    }
    setActive(item)
  }

  return (
    <div className="relative flex h-16 w-full items-center justify-between px-4">
      <div className="flex items-center">
        <Link href="/" aria-label="Zerops home">
          <LogoSvg />
        </Link>
      </div>

      <nav
        ref={navRef}
        aria-label="Main"
        className="absolute left-1/2 z-30 flex -translate-x-1/2 items-center gap-0.5"
        onMouseLeave={() => setActive(null)}
      >
        {navItems.map((item) => (
          <div
            key={item.title}
            ref={(el) => {
              itemRefs.current[item.title] = el
            }}
            className="relative"
            onMouseEnter={() => handleEnter(item)}
          >
            {item.dropdown ? (
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "relative z-10 gap-1 text-sm font-medium text-foreground/80 hover:text-foreground",
                  active?.title === item.title && "text-foreground"
                )}
              >
                {item.title}
                <RiArrowDownSLine
                  className={cn(
                    "size-4 opacity-60 transition-transform duration-200",
                    active?.title === item.title && "-rotate-180"
                  )}
                />
              </button>
            ) : (
              <Link
                href={item.href ?? "#"}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "relative z-10 text-sm font-medium text-foreground/80 hover:text-foreground",
                  active?.title === item.title && "text-foreground"
                )}
              >
                {item.title}
              </Link>
            )}

            {/* sliding hover pill behind the active item */}
            {active?.title === item.title && (
              <motion.div
                layoutId="nav-hover-bg"
                className="absolute inset-0 rounded-md bg-muted"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </div>
        ))}

        {/* dropdown panel that slides + resizes to sit under whichever item is active */}
        <AnimatePresence>
          {active?.dropdown && (
            <motion.div
              // this outer div is the actual hoverable hit-area — it spans
              // from right under the trigger all the way through the visual
              // gap into the panel, so there's no dead zone that kills the hover
              className="absolute top-full z-30"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                left: coords.left,
                width: Math.max(coords.width, MIN_DROPDOWN_WIDTH),
              }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.96, y: 6 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 6 }}
                transition={{ type: "spring", stiffness: 420, damping: 38, mass: 0.8 }}
                className="origin-top rounded-lg border bg-popover p-px  mt-2"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="flex flex-col"
                  >
                    {active.dropdown.map((entry) => (
                      <Link
                        key={entry}
                        href={`/${entry.toLowerCase()}`}
                        className="rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {entry}
                      </Link>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="lg">
          Login
        </Button>
        <Button variant="default" size="lg">
          Try With free 65$ Credits
        </Button>
      </div>

      <SvgDividerHorizontal className="bottom-0" />
    </div>
  )
}

export default Navbar