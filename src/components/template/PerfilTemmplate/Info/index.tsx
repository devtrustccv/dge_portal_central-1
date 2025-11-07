import React from "react"
import { cn } from "@/lib/utils"

type Props = {
  label: string
  value: string
  colSpan?: boolean
}

export const Info = ({ label, value, colSpan }: Props) => {
  return (
    <div className={cn("space-y-1", colSpan && "md:col-span-2")}>
      <p className="text-muted-foreground">{label}</p>
      <p className="text-foreground font-medium">{value}</p>
    </div>
  )
}
