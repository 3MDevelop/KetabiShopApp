export const DISABLE_TEXT_SELECTION_CSS = `
html, body, * {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  -webkit-touch-callout: none !important;
}
input, textarea, select, option, [contenteditable="true"] {
  -webkit-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
  user-select: text !important;
  -webkit-touch-callout: default !important;
}
::selection {
  background: transparent;
}
input::selection,
textarea::selection {
  background: Highlight;
  color: HighlightText;
}
`;

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(
    target.closest("input, textarea, select, option, [contenteditable='true']"),
  );
}

export function injectDisableTextSelection() {
  if (typeof document === "undefined") {
    return;
  }

  const id = "ketabi-disable-text-selection";
  if (!document.getElementById(id)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = DISABLE_TEXT_SELECTION_CSS;
    document.head.appendChild(style);
  }

  if (document.documentElement.dataset.noSelectBound === "1") {
    return;
  }

  document.documentElement.dataset.noSelectBound = "1";

  document.addEventListener(
    "selectstart",
    (event) => {
      if (!isEditableTarget(event.target)) {
        event.preventDefault();
      }
    },
    { capture: true },
  );

  document.addEventListener(
    "copy",
    (event) => {
      if (!isEditableTarget(event.target)) {
        event.preventDefault();
      }
    },
    { capture: true },
  );
}
