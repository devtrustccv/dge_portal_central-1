import React from 'react'

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500" />
        </div>
    )
}
