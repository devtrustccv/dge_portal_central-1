import React from "react"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  date: string
  description: string
  completed: boolean
}

export const ApplicationStep = ({ title, date, description, completed }: Props) => {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div
        className={cn(
          "rounded-full p-1",
          completed ? "bg-emerald-100" : "bg-muted"
        )}
      >
        <CheckCircle2
          className={cn(
            "w-5 h-5",
            completed ? "text-emerald-500" : "text-muted-foreground"
          )}
        />
      </div>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <span className="text-xs text-muted-foreground mt-1 block">{date}</span>
      </div>
    </div>
  )
}
