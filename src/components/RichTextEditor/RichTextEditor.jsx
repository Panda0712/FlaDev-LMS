import React, { useState, useRef, useEffect } from "react";

const RichTextEditor = ({
  value,
  onChange,
  placeholder = "Nhập nội dung...",
  error,
}) => {
  const [content, setContent] = useState(value || "");
  const textareaRef = useRef(null);

  useEffect(() => {
    setContent(value || "");
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setContent(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const insertText = (before, after = "") => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);

    setContent(newText);
    if (onChange) {
      onChange(newText);
    }

    // Focus back to textarea and set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos =
        start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const formatButtons = [
    {
      label: "Bold",
      icon: "B",
      action: () => insertText("**", "**"),
      className: "font-bold",
    },
    {
      label: "Italic",
      icon: "I",
      action: () => insertText("*", "*"),
      className: "italic",
    },
    {
      label: "Heading 1",
      icon: "H1",
      action: () => insertText("# "),
      className: "font-bold text-lg",
    },
    {
      label: "Heading 2",
      icon: "H2",
      action: () => insertText("## "),
      className: "font-bold",
    },
    {
      label: "Heading 3",
      icon: "H3",
      action: () => insertText("### "),
      className: "font-semibold",
    },
    {
      label: "Link",
      icon: "🔗",
      action: () => insertText("[", "](url)"),
    },
    {
      label: "List",
      icon: "•",
      action: () => insertText("- "),
    },
    {
      label: "Numbered List",
      icon: "1.",
      action: () => insertText("1. "),
    },
    {
      label: "Quote",
      icon: '"',
      action: () => insertText("> "),
    },
    {
      label: "Code",
      icon: "</>",
      action: () => insertText("`", "`"),
      className: "font-mono",
    },
  ];

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="border border-gray-300 border-b-0 rounded-t-md bg-gray-50 p-2">
        <div className="flex flex-wrap gap-1">
          {formatButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              className={`px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                button.className || ""
              }`}
              title={button.label}
            >
              {button.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full min-h-[300px] p-4 border border-gray-300 rounded-b-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical font-mono text-sm leading-relaxed ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          }`}
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message || error}</p>
      )}

      {/* Help Text */}
      <div className="mt-2 text-xs text-gray-500">
        <p className="mb-1">Markdown formatting supported:</p>
        <div className="flex flex-wrap gap-4">
          <span>**bold**</span>
          <span>*italic*</span>
          <span># heading</span>
          <span>[link](url)</span>
          <span>`code`</span>
          <span>&gt; quote</span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
