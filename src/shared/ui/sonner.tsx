"use client"

import {
  CheckCircleIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  XCircleIcon, // Agregamos este para errores reales
} from "@heroicons/react/24/outline"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CheckCircleIcon className="size-4 text-green-500" />,
        info: <InformationCircleIcon className="size-4 text-blue-500" />,
        warning: <ExclamationTriangleIcon className="size-4 text-yellow-500" />,
        error: <XCircleIcon className="size-4 text-red-500" />, // Diferenciamos el error
        loading: <ArrowPathIcon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }