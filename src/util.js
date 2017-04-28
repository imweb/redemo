// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and IE 10+.
// IE: The clipboard feature may be disabled by an administrator. By
// default a prompt is shown the first time the clipboard is
// used (per session).
export function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return clipboardData.setData('Text', text);

  } else { //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      let textarea = document.createElement('textarea');
      textarea.textContent = text;
      textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand('copy');  // Security exception may be thrown by some browsers.
      } catch (err) {
        throw err;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  }
}

/**
 * If you want to select all the content of an element (contenteditable or not) in Chrome, here's how. This will also work in Firefox, Safari 3+, Opera 9+ (possibly earlier versions too) and IE 9. You can also create selections down to the character level. The APIs you need are DOM Range (current spec is DOM Level 2, see also MDN) and Selection, which is being specified as part of a new Range spec (MDN docs).
 * @param el
 * http://stackoverflow.com/questions/6139107/programmatically-select-text-in-a-contenteditable-html-element
 */
export function selectElementContents(el) {
  let range = document.createRange();
  range.selectNodeContents(el);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}