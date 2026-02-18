"use client"

import { useEffect } from "react"

export default function ColorPick({ colors }: any) {


    useEffect(() => {
        localStorage.setItem("color", colors[0])
    }, [])



    return (
        <div className="my-3">
            <div className="flex items-center gap-2">
                <p>رنگ : </p>
                <p>ابی</p>
            </div>

            <div onClick={() => { }}>
                {
                    colors.map((color: any) =>
                        <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-300 cursor-pointer"></div>

                    )
                }
            </div>
        </div>
    )
}
