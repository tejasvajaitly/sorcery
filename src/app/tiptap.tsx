"use client"

import Collaboration from "@tiptap/extension-collaboration"
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import StarterKit from "@tiptap/starter-kit"
import { EditorContent, useEditor } from "@tiptap/react"
import React, { useEffect, useState } from "react"
import { HocuspocusProvider } from "@hocuspocus/provider"
import * as Y from 'yjs'

const ydoc = new Y.Doc()

const provider = new HocuspocusProvider({
    url: "wss://sorcery-api.tejasvajaitly.com/myDocument",
    name: "example-document",
    document: ydoc,
})


const colors = [
    '#958DF1',
    '#F98181',
    '#FBBC88',
    '#FAF594',
    '#70CFF8',
    '#94FADB',
    '#B9F18D',
    '#C3E2C2',
    '#EAECCC',
    '#AFC8AD',
    '#EEC759',
    '#9BB8CD',
    '#FF90BC',
    '#FFC0D9',
    '#DC8686',
    '#7ED7C1',
    '#F3EEEA',
    '#89B9AD',
    '#D0BFFF',
    '#FFF8C9',
    '#CBFFA9',
    '#9BABB8',
    '#E3F4F4',
  ]
  const names = [
    'Lea Thompson',
    'Cyndi Lauper',
    'Tom Cruise',
    'Madonna',
    'Jerry Hall',
    'Joan Collins',
    'Winona Ryder',
    'Christina Applegate',
    'Alyssa Milano',
    'Molly Ringwald',
    'Ally Sheedy',
    'Debbie Harry',
    'Olivia Newton-John',
    'Elton John',
    'Michael J. Fox',
    'Axl Rose',
    'Emilio Estevez',
    'Ralph Macchio',
    'Rob Lowe',
    'Jennifer Grey',
    'Mickey Rourke',
    'John Cusack',
    'Matthew Broderick',
    'Justine Bateman',
    'Lisa Bonet',
  ]

const defaultContent = `
  <p>Hi 👋, this is a collaborative document.</p>
  <p>Feel free to edit and collaborate in real-time!</p>
`
const getRandomElement = (list: string[]) => list[Math.floor(Math.random() * list.length)]

const getRandomColor = () => getRandomElement(colors)
const getRandomName = () => getRandomElement(names)

const getInitialUser = () => {
return {
name: getRandomName(),
color: getRandomColor(),
}
}

const TipTapEditor = () => {
    const [currentUser] = useState(getInitialUser)

   

    const editor = useEditor({
        enableContentCheck: true,
        onContentError: ({ disableCollaboration }) => {
          disableCollaboration()
        },
        onCreate: ({ editor: currentEditor }) => {
          provider.on('synced', () => {
            if (currentEditor.isEmpty) {
              currentEditor.commands.setContent(defaultContent)
            }
          })
        },
        extensions: [
            StarterKit.configure({
                // The Collaboration extension comes with its own history handling
                history: false,
            }),
            // Register the document with Tiptap
            Collaboration.configure({
                document: provider.document,
            }),
            CollaborationCursor.configure({
                provider,
              }),
        ],
        editorProps: {
            attributes: {
              class: 'min-h-full max-w-2xl mx-auto outline-none',
            },
          },
    })

    useEffect(() => {
        if (editor && currentUser) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser))
        editor.commands.updateUser(currentUser)
        }
      }, [editor, currentUser])

    return (
        <>
            <EditorContent
                className="w-full h-full"
                editor={editor}
            />
        </>
    )
}

export default TipTapEditor