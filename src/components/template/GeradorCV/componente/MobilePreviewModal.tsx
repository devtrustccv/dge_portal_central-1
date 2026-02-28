"use client"

import React from "react"
import {ArrowLeft, Columns, Download, Layout, Palette, PanelLeft, Type} from "lucide-react"
import {Button} from "@/components/atoms/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu"
import {LayoutType, PersonalStyle} from "@/components/template/GeradorCV/forms/components";

interface MobilePreviewModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    onDownload: () => void
    headingStyle: 1 | 2 | 3 | 4
    setHeadingStyle: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4>>
    layoutType: LayoutType
    setLayoutType: React.Dispatch<React.SetStateAction<LayoutType>>
    personalStyle: PersonalStyle
    setPersonalStyle: React.Dispatch<React.SetStateAction<PersonalStyle>>
}

export function MobilePreviewModal({
                                       isOpen,
                                       onClose,
                                       children,
                                       onDownload,
                                       headingStyle,
                                       setHeadingStyle,
                                       layoutType,
                                       setLayoutType,
                                       personalStyle,
                                       setPersonalStyle,
                                   }: MobilePreviewModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white shrink-0">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onClose}
                    className="border-white/20 bg-transparent hover:bg-white/10"
                >
                    <ArrowLeft className="w-5 h-5 text-white"/>
                </Button>
                <h1 className="text-xl font-semibold">Pré-visualização</h1>
                <Button
                    variant="default"
                    size="icon"
                    onClick={onDownload}
                    className="bg-indigo-600 hover:bg-indigo-700"
                >
                    <Download className="w-5 h-5"/>
                </Button>
            </header>

            {/* CV Preview Area */}
            <div className="flex-1 overflow-auto bg-gray-300">
                <div
                    className="bg-white shadow-lg overflow-hidden origin-top-left"
                    style={{
                        transform: 'scale(0.38)',
                        width: '260%',
                        minHeight: '190%'
                    }}
                >
                    {children}
                </div>
            </div>

            {/* Bottom Toolbar */}
            <div className="bg-white border-t px-2 py-3 flex items-center justify-around shrink-0">
                {/* Heading Style */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                            <PanelLeft className="w-6 h-6"/>
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-600 rounded-full"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                        <DropdownMenuItem onClick={() => setHeadingStyle(1)}
                                          className={headingStyle === 1 ? "bg-indigo-50" : ""}>
                            Estilo 1 - Linha
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setHeadingStyle(2)}
                                          className={headingStyle === 2 ? "bg-indigo-50" : ""}>
                            Estilo 2 - Fundo
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setHeadingStyle(3)}
                                          className={headingStyle === 3 ? "bg-indigo-50" : ""}>
                            Estilo 3 - Pill
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setHeadingStyle(4)}
                                          className={headingStyle === 4 ? "bg-indigo-50" : ""}>
                            Estilo 4 - Bordas
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Font Size (placeholder) */}
                <Button variant="ghost" size="icon">
                    <span className="text-lg font-semibold">Aa</span>
                </Button>

                {/* Typography */}
                <Button variant="ghost" size="icon">
                    <Type className="w-6 h-6"/>
                </Button>

                {/* Layout Type */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Columns className="w-6 h-6"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                        <DropdownMenuItem onClick={() => setLayoutType("one")}
                                          className={layoutType === "one" ? "bg-indigo-50" : ""}>
                            Uma Coluna
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLayoutType("two")}
                                          className={layoutType === "two" ? "bg-indigo-50" : ""}>
                            Duas Colunas
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setLayoutType("mix")}
                                          className={layoutType === "mix" ? "bg-indigo-50" : ""}>
                            Mix (Grid)
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Personal Style */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Layout className="w-6 h-6"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-48">
                        <DropdownMenuItem onClick={() => setPersonalStyle("sidebar")}
                                          className={personalStyle === "sidebar" ? "bg-indigo-50" : ""}>
                            Sidebar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPersonalStyle("left")}
                                          className={personalStyle === "left" ? "bg-indigo-50" : ""}>
                            Header Esquerda
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPersonalStyle("center")}
                                          className={personalStyle === "center" ? "bg-indigo-50" : ""}>
                            Header Centro
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPersonalStyle("right")}
                                          className={personalStyle === "right" ? "bg-indigo-50" : ""}>
                            Header Direita
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Expand/Collapse */}
                <Button variant="ghost" size="icon">
                    <Palette className="w-6 h-6"/>
                </Button>
            </div>
        </div>
    )
}
