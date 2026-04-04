"use client"

import { useEffect, useState } from "react"

export function useActiveSection(): string {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0px 0px -50% 0px", threshold: 0.1 }
    )

    sections.forEach((s) => observer.observe(s))

    return () => observer.disconnect()
  }, [])

  return activeId
}
