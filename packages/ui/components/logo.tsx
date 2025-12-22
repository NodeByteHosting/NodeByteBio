"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: number
}

export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 375 375"
      preserveAspectRatio="xMidYMid meet"
      className={cn("transition-colors duration-300", className)}
    >
      <defs>
        <clipPath id="logo-clip-right">
          <path d="M 149 99 L 343.5 99 L 343.5 275.855469 L 149 275.855469 Z M 149 99" clipRule="nonzero" />
        </clipPath>
        <clipPath id="logo-clip-left">
          <path d="M 37.5 99 L 232 99 L 232 275.855469 L 37.5 275.855469 Z M 37.5 99" clipRule="nonzero" />
        </clipPath>
      </defs>
      
      {/* Right side of N - uses foreground color (white in dark mode, dark in light mode) */}
      <g clipPath="url(#logo-clip-right)">
        <path
          className="fill-foreground transition-colors duration-300"
          d="M 302.453125 99.261719 L 282.078125 134.566406 L 271.882812 152.21875 L 261.703125 169.863281 L 251.496094 187.515625 L 241.316406 205.167969 L 231.121094 222.820312 L 220.929688 240.472656 L 200.539062 240.472656 L 190.347656 222.820312 L 180.164062 205.167969 L 169.972656 187.527344 L 159.777344 205.167969 L 149.59375 222.820312 L 159.789062 240.472656 L 169.972656 258.113281 L 180.164062 275.769531 L 241.316406 275.769531 L 251.496094 258.128906 L 261.691406 240.472656 L 271.882812 222.820312 L 282.078125 205.167969 L 292.261719 187.515625 L 302.453125 169.863281 L 322.832031 134.566406 L 343.214844 99.261719 Z M 302.453125 99.261719"
          fillRule="nonzero"
        />
      </g>
      
      {/* Left side of N - uses primary/accent color */}
      <g clipPath="url(#logo-clip-left)">
        <path
          className="fill-primary transition-colors duration-300"
          d="M 159.777344 134.566406 L 180.164062 134.566406 L 190.359375 152.210938 L 200.539062 169.863281 L 210.734375 187.515625 L 220.929688 169.863281 L 231.109375 152.210938 L 220.929688 134.566406 L 200.539062 99.261719 L 139.414062 99.261719 L 129.207031 116.925781 L 119.027344 134.566406 L 108.832031 152.21875 L 98.648438 169.863281 L 88.457031 187.515625 L 78.261719 205.167969 L 68.070312 222.820312 L 57.875 240.472656 L 47.683594 258.128906 L 37.5 275.769531 L 78.261719 275.769531 L 88.445312 258.113281 L 98.636719 240.472656 L 119.027344 205.167969 L 129.207031 187.515625 L 139.402344 169.863281 L 149.59375 152.21875 Z M 159.777344 134.566406"
          fillRule="nonzero"
        />
      </g>
    </svg>
  )
}
