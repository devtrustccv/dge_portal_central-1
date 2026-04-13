"use client"

import {Bold, Italic, List, ListOrdered, Underline} from "lucide-react"
import React, {useEffect, useRef} from "react"

import {cn} from "@/lib/utils"
import {normalizeRichTextValue, sanitizeRichText} from "@/lib/rich-text"

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  editorClassName?: string
  minHeightClassName?: string
}

const TOOLBAR_ACTIONS = [
  {icon: Bold, label: "Negrito", command: "bold"},
  {icon: Italic, label: "Itálico", command: "italic"},
  {icon: Underline, label: "Sublinhado", command: "underline"},
  {icon: List, label: "Lista", command: "insertUnorderedList"},
  {icon: ListOrdered, label: "Lista numerada", command: "insertOrderedList"},
] as const

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
  editorClassName,
  minHeightClassName = "min-h-[140px]",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editorRef.current) return

    const normalizedValue = normalizeRichTextValue(value)
    if (editorRef.current.innerHTML !== normalizedValue) {
      editorRef.current.innerHTML = normalizedValue
    }
  }, [value])

  const emitChange = () => {
    if (!editorRef.current) return
    onChange(sanitizeRichText(editorRef.current.innerHTML))
  }

  const runCommand = (command: string) => {
    editorRef.current?.focus()
    document.execCommand(command)
    emitChange()
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    const text = event.clipboardData.getData("text/plain")
    document.execCommand("insertHTML", false, escapeHtml(text).replace(/\n/g, "<br>"))
    emitChange()
  }

  return (
    <div className={cn("rounded-md border border-input bg-transparent shadow-sm", className)}>
      <div className="flex flex-wrap gap-2 border-b border-input px-3 py-2">
        {TOOLBAR_ACTIONS.map(({icon: Icon, label, command}) => (
          <button
            key={command}
            type="button"
            aria-label={label}
            title={label}
            className="rounded border border-input p-2 text-gray-700 transition-colors hover:bg-gray-100"
            onClick={() => runCommand(command)}
          >
            <Icon className="h-4 w-4"/>
          </button>
        ))}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        className={cn(
          "rich-text-editor block w-full px-3 py-2 text-base focus-visible:outline-none md:text-sm",
          minHeightClassName,
          editorClassName
        )}
        onInput={emitChange}
        onBlur={emitChange}
        onPaste={handlePaste}
      />
    </div>
  )
}
