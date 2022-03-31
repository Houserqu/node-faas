import { useEffect, useRef } from "react"
import * as monaco from 'monaco-editor'

interface Props {
  defaultValue?: string
  height?: number
  onChange?: any
  language?: string
}

export default function Editor({defaultValue, height = 500, onChange, language}: Props) {
  const editorRef = useRef<any>(null)

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: defaultValue,
      language: language || 'javascript',
    });

    editor.onDidChangeModelContent((event) => {
      onChange(editor.getValue(), event);
    });
  }, [])

  return (
    <div style={{ border: '1px solid #bebebe' }}>
      <div ref={editorRef} style={{height}}></div>
    </div>
  )
}