"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, Eye } from "lucide-react"

export default function MarkdownEditor({
  value,
  onChange,
  rows = 15,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
}) {
  const [tab, setTab] = useState<"edit" | "preview">("edit")

  return (
    <div>
      <div className="flex border-b border-mesia-gold/25 mb-3">
        <button
          type="button"
          onClick={() => setTab("edit")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === "edit"
              ? "border-mesia-wine text-mesia-wine"
              : "border-transparent text-mesia-lightText hover:text-mesia-wine"
          }`}
        >
          <Edit3 className="h-4 w-4" />
          Επεξεργασία
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === "preview"
              ? "border-mesia-wine text-mesia-wine"
              : "border-transparent text-mesia-lightText hover:text-mesia-wine"
          }`}
        >
          <Eye className="h-4 w-4" />
          Προεπισκόπηση
        </button>
      </div>

      {tab === "edit" ? (
        <>
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="border-mesia-gold/30 focus:border-mesia-wine font-mono text-sm"
          />
          <p className="text-xs text-mesia-lightText mt-2">
            Υποστηρίζεται Markdown: **έντονα**, *πλάγια*, ## τίτλοι, - λίστες, [σύνδεσμος](url), ![εικόνα](url), &gt; παράθεση
          </p>
        </>
      ) : (
        <div
          className="border border-mesia-gold/25 bg-mesia-cream/40 p-6 min-h-[200px] prose prose-lg max-w-none text-mesia-darkText prose-headings:text-mesia-wine prose-headings:font-greek prose-p:leading-relaxed prose-strong:text-mesia-wine prose-blockquote:border-mesia-gold prose-blockquote:text-mesia-lightText prose-a:text-mesia-wine"
        >
          {value.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-mesia-lightText italic">Δεν υπάρχει περιεχόμενο ακόμα.</p>
          )}
        </div>
      )}
    </div>
  )
}
