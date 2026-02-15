// components/EditorClient.tsx
'use client'

import { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

let ClassicEditor: any

type Props = {
  value?: string
  onChange?: (data: string) => void
}

export default function Editor({ value = '', onChange }: Props) {
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    // فقط یک بار لود می‌شه
    import('@ckeditor/ckeditor5-build-classic')
      .then(module => {
        ClassicEditor = module.default
        setEditorLoaded(true)
      })
      .catch(err => {
        console.error('خطا در لود CKEditor:', err)
      })
  }, [])

  if (!editorLoaded || !ClassicEditor) {
    return (
      <div className="min-h-[250px] border rounded p-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        در حال بارگذاری ویرایشگر...
      </div>
    )
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: 'GPL',
          // language: 'fa',               // اگر فارسی می‌خوای
          // placeholder: 'متن خود را اینجا بنویسید...',
          // toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
        }}
        onChange={(_, editor) => {
          const data = editor.getData()
          onChange?.(data)
        }}
        // onReady={editor => console.log('Editor is ready!')}
      />
    </div>
  )
}