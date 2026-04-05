"use client"

import { useState } from "react"
import { useActiveSection } from "@/hooks/useActiveSection"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { id: "hero",           label: "Home"    },
  { id: "about",          label: "About"   },
  { id: "case-study-utd", label: "UTD"     },
  { id: "case-study-rio", label: "Rio"     },
  { id: "gallery",        label: "Work"    },
  { id: "value-prop",     label: "Approach"},
  { id: "contact",        label: "Contact" },
] as const

export default function Navbar() {
  const activeSection = useActiveSection()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-muted"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-semibold text-sm tracking-wide text-foreground">HV</span>

        <ul className="hidden md:flex items-center gap-5 lg:gap-7" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "text-sm transition-colors duration-150",
                  activeSection === link.id
                    ? "text-foreground font-semibold border-b-2 border-accent pb-0.5"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-muted bg-background px-6 py-4"
        >
          <ul className="flex flex-col gap-4" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block text-sm transition-colors duration-150",
                    activeSection === link.id
                      ? "text-foreground font-semibold border-l-2 border-accent pl-3"
                      : "text-muted-foreground hover:text-foreground pl-3"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
