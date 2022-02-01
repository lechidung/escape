/*!
 * Copyright (c) 2020 Johnny "Le Chi Dung"
 * MIT Licensed
 */

const matchEscHtmlRx = /["'&<>]/;
const matchUnEscRx = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
// deno-lint-ignore no-control-regex
const matchEscSqlRx = /[\0\b\t\n\r\x1a"'\\]/g;

export function isEscape(str: string): boolean {
  const removeUnEscStr = str.replace(matchUnEscRx, "");
  const matchEscHtml = matchEscHtmlRx.exec(removeUnEscStr);

  if (!matchEscHtml) {
    return false;
  }

  return true;
}

export function escapeHtml(str: string): string {
  const matchEscHtml = matchEscHtmlRx.exec(str);
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
  const matchUnEsc = matchUnEscRx.exec(str);
  if (!matchUnEsc) {
    return false;
  }

  return true;
}

export function unescapeHtml(str: string): string {
  const matchUnEsc = matchUnEscRx.exec(str);
  if (!matchUnEsc) {
    return str;
  }

  const res = str.replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x3A;/g, ":")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

  return unescapeHtml(res);
}

export function escapeSql(sqlStr: string): string {
  const match = matchEscSqlRx.exec(sqlStr);
  if (!match) {
    return sqlStr;
  }

  let chunkIndex = matchEscSqlRx.lastIndex = 0;
  let escapedSqlStr = "";
  let matchChar;
  let escape;

  while ((matchChar = matchEscSqlRx.exec(sqlStr))) {
    switch (matchChar[0]) {
      case "\0":
        escape = "\\0";
        break;
      case "\x08":
        escape = "\\b";
        break;
      case "\x09":
        escape = "\\t";
        break;
      case "\x1a":
        escape = "\\z";
        break;
      case "\n":
        escape = "\\n";
        break;
      case "\r":
        escape = "\\r";
        break;
      case '"':
      case "'":
      case "\\":
      case "%":
        // prepends a backslash to backslash, percent, and double/single quotes
        escape = "\\" + matchChar[0];
        break;
      default:
        continue;
    }

    escapedSqlStr += sqlStr.slice(chunkIndex, matchChar.index) + escape;
    chunkIndex = matchEscSqlRx.lastIndex;
  }

  if (chunkIndex < sqlStr.length) {
    return "'" + escapedSqlStr + sqlStr.slice(chunkIndex) + "'";
  }

  return "'" + escapedSqlStr + "'";
}
