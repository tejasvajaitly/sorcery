"use client"

import Collaboration from "@tiptap/extension-collaboration"

import StarterKit from "@tiptap/starter-kit"
import { EditorContent, useEditor } from "@tiptap/react"
import React from "react"
import { HocuspocusProvider } from "@hocuspocus/provider"


const provider = new HocuspocusProvider({
    url: "ws://localhost:3001/myDocument",
    name: "example-document",
})

const TipTapEditor = () => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // The Collaboration extension comes with its own history handling
                history: false,
            }),
            // Register the document with Tiptap
            Collaboration.configure({
                document: provider.document,
            }),
        ],
    })

    return (
        <>
            <EditorContent
                className="w-full h-full border border-black"
                editor={editor}
            />
        </>
    )
}

export default TipTapEditor