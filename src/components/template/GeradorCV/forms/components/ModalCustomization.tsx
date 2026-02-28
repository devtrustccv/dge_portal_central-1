/*
"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/atoms/alert-dialog"
import {CardSectionTitle} from "@/components/template/GeradorCV/forms/components/CardSectionTitle";
import {CardLayoutType} from "@/components/template/GeradorCV/forms/components/CardLayoutType";
import {CardDetailPersona} from "@/components/template/GeradorCV/forms/components/CardDetailPersona";
import React from "react";
import {LayoutType, PersonalStyle} from "@/components/template/GeradorCV/forms/components/index";
import {Button} from "@/components/atoms/button";
import {X} from "lucide-react";

interface ModalCustomizationProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    headingStyle: 1 | 2 | 3 | 4,
    setHeadingStyle: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4>>,
    layoutType: LayoutType,
    setLayoutType: React.Dispatch<React.SetStateAction<LayoutType>>,
    personalStyle: PersonalStyle,
    setPersonalStyle: React.Dispatch<React.SetStateAction<PersonalStyle>>
}

export function ModalCustomization(props: ModalCustomizationProps) {
    const {
        open,
        setOpen,
        headingStyle,
        setHeadingStyle,
        layoutType,
        setLayoutType,
        personalStyle,
        setPersonalStyle
    } = props;

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {/!* O Trigger precisa de asChild para não renderizar um button dentro de outro button *!/}
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="rounded"
                >
                    Customize seu CV
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent
                className='max-w-4xl flex flex-col gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-2xl'>

                <div className='flex justify-between items-center'>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">Personalizar Design</AlertDialogTitle>
                    </AlertDialogHeader>

                    <Button
                        onClick={() => setOpen(false)}
                        variant="ghost"
                        className='w-10 h-10 p-0 rounded-full hover:bg-gray-100'
                    >
                        <X size={20} className="text-gray-500"/>
                    </Button>
                </div>

                <div className='flex flex-col gap-8 overflow-y-auto max-h-[70vh] pr-2'>
                    <div className="space-y-4">
                        <CardSectionTitle value={headingStyle} onChange={setHeadingStyle}/>
                        <CardLayoutType value={layoutType} onChange={setLayoutType}/>
                        <CardDetailPersona value={personalStyle} onChange={setPersonalStyle}/>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                    <Button onClick={() => setOpen(false)} className="px-8">
                        Pronto
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}*/

"use client"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/atoms/alert-dialog"
import {CardSectionTitle} from "@/components/template/GeradorCV/forms/components/CardSectionTitle"
import {CardLayoutType} from "@/components/template/GeradorCV/forms/components/CardLayoutType"
import {CardDetailPersona} from "@/components/template/GeradorCV/forms/components/CardDetailPersona"
import React from "react"
import {Button} from "@/components/atoms/button"
import {X} from "lucide-react"
import {LayoutType, PersonalStyle} from "@/components/template/GeradorCV/forms/components/index";

interface ModalCustomizationProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    headingStyle: 1 | 2 | 3 | 4
    setHeadingStyle: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4>>
    layoutType: LayoutType
    setLayoutType: React.Dispatch<React.SetStateAction<LayoutType>>
    personalStyle: PersonalStyle
    setPersonalStyle: React.Dispatch<React.SetStateAction<PersonalStyle>>
}

export function ModalCustomization(props: ModalCustomizationProps) {
    const {open, setOpen, headingStyle, setHeadingStyle, layoutType, setLayoutType, personalStyle, setPersonalStyle} =
        props

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {/* O Trigger precisa de asChild para não renderizar um button dentro de outro button */}
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="rounded">
                    Customize seu CV
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent
                className="max-w-4xl flex flex-col gap-6 bg-white p-6 rounded-xl border border-gray-200 shadow-2xl">
                <div className="flex justify-between items-center">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">Personalizar Design</AlertDialogTitle>
                    </AlertDialogHeader>

                    <Button
                        onClick={() => setOpen(false)}
                        variant="ghost"
                        className="w-10 h-10 p-0 rounded-full hover:bg-gray-100"
                    >
                        <X size={20} className="text-gray-500"/>
                    </Button>
                </div>

                <div className="flex flex-col gap-8 overflow-y-auto max-h-[70vh] pr-2">
                    <div className="space-y-4">
                        <CardSectionTitle value={headingStyle} onChange={setHeadingStyle}/>
                        <CardLayoutType value={layoutType} onChange={setLayoutType}/>
                        <CardDetailPersona value={personalStyle} onChange={setPersonalStyle}/>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                    <Button onClick={() => setOpen(false)} className="px-8">
                        Pronto
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
