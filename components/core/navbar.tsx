"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import {
  RiArrowDownSLine,
  RiCloseLine,
  RiMenuLine,
} from "@remixicon/react"

import { Button, buttonVariants } from "../ui/button"
import { cn } from "@/lib/utils"
import SvgDividerHorizontal from "../utils/svg-line"

function LogoSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42.27 50.48"
      className={cn("h-7 w-auto fill-primary sm:h-8", className)}
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

const MIN_DROPDOWN_WIDTH = 144

function AuthButtons({
  className,
  onAction,
}: {
  className?: string
  onAction?: () => void
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={onAction}>
        Login
      </Button>
      <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={onAction}>
        Ask Zerops AI
      </Button>
    </div>
  )
}

function DesktopNav({
  active,
  setActive,
  coords,
  setCoords,
}: {
  active: NavItem | null
  setActive: (item: NavItem | null) => void
  coords: { left: number; width: number }
  setCoords: (coords: { left: number; width: number }) => void
}) {
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
    <nav
      ref={navRef}
      aria-label="Main"
      className="absolute left-1/2 z-30 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
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

          {active?.title === item.title && (
            <motion.div
              layoutId="nav-hover-bg"
              className="absolute inset-0 rounded-md bg-muted"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </div>
      ))}

      <AnimatePresence>
        {active?.dropdown && (
          <motion.div
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
              className="mt-2 origin-top rounded-lg border bg-popover p-px"
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
  )
}

function MobileNav({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!open) {
      setExpanded(null)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l bg-background shadow-xl lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 40 }}
          >
            <div className="flex items-center justify-between border-b px-4 py-4">
              <Link href="/" aria-label="Zerops home" onClick={onClose}>
                <LogoSvg />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={onClose}
              >
                <RiCloseLine className="size-5" />
              </Button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.title}>
                    {item.dropdown ? (
                      <div className="rounded-lg border border-border/60">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-foreground"
                          aria-expanded={expanded === item.title}
                          onClick={() =>
                            setExpanded((current) =>
                              current === item.title ? null : item.title
                            )
                          }
                        >
                          {item.title}
                          <RiArrowDownSLine
                            className={cn(
                              "size-4 opacity-60 transition-transform duration-200",
                              expanded === item.title && "-rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {expanded === item.title && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden border-t border-border/60"
                            >
                              {item.dropdown.map((entry) => (
                                <li key={entry}>
                                  <Link
                                    href={`/${entry.toLowerCase()}`}
                                    className="block px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                                    onClick={onClose}
                                  >
                                    {entry}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href ?? "#"}
                        className="block rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        onClick={onClose}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t px-4 py-4">
              <AuthButtons className="flex-col" onAction={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Navbar() {
  const [active, setActive] = useState<NavItem | null>(null)
  const [coords, setCoords] = useState({ left: 0, width: 0 })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }

    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return (
    <>
      <div className="relative flex h-14 w-full items-center justify-between px-4 sm:h-16">
        <div className="flex items-center">
          <Link href="/" aria-label="Zerops home">
            <LogoSvg />
          </Link>
        </div>

        <DesktopNav
          active={active}
          setActive={setActive}
          coords={coords}
          setCoords={setCoords}
        />

        <AuthButtons className="hidden lg:flex" />

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen(true)}
        >
          <RiMenuLine className="size-5" />
        </Button>

        <SvgDividerHorizontal className="bottom-0" />
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

export default Navbar