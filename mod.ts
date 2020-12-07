/*!

 * Copyright (c) 2020 Johnny "Le Chi Dung"
 * MIT Licensed
 */

const matchEscHtmlRegExp = /["'&<>]/;
const matchUnEscRegExp = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;

export function isEscape(str: string): boolean {
  const matchEscHtml = matchEscHtmlRegExp.exec(str);

  if (!matchEscHtml) {
    return false;
  }

  return true;
}

export function escapeHtml(str: string): string {
  const matchEscHtml = matchEscHtmlRegExp.exec(str);
  if (!matchEscHtml) {
    return str;
  }
  let escape;
  let html = "";
  let index = 0;
  let lastIndex = 0;
  for (index = matchEscHtml.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = "&quot;";
        break;
      case 38: // &
        escape = "&amp;";
        break;
      case 39: // '
        escape = "&#39;";
        break;
      case 60: // <
        escape = "&lt;";
        break;
      case 62: // >
        escape = "&gt;";
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}

export function isUnescape(str: string): boolean {
  const matchUnEsc = matchUnEscRegExp.exec(str);
  if (!matchUnEsc) {
    return false;
  }

  return true;
}

export function unescapeHtml(str: string): string {
  const matchUnEsc = matchUnEscRegExp.exec(str);
  if (!matchUnEsc) {
    return str;
  }

  const res = str.replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&#x3A;/g, ':')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

  return unescapeHtml(res);
}