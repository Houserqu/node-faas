import { useEffect, useRef } from "react"
import * as monaco from 'monaco-editor'

interface Props {
  defaultValue?: string
  height?: number
  onChange?: any
}

export default function Editor({defaultValue, height = 500, onChange}: Props) {
  const editorRef = useRef<any>(null)

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: defaultValue,
      language: 'javascript',
      automaticLayout: true,
    });

    editor.onDidChangeModelContent((event) => {
      onChange(editor.getValue(), event);
    });
  }, [])

  return (
    <div ref={editorRef} style={{height}}></div>
  )
}