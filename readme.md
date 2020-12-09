# escape

Simple library for escape or unescape HTML, String, SQL,... :D

## API

### Escape HTML
```js
import { escapeHtml } from "https://deno.land/x/escape/mod.ts";
```

#### **1. escapeHtml(string: string): string**

Escape special characters in the given string of text, such that it can be
interpolated in HTML content.

This function will escape the following characters: `"`, `'`, `&`, `<`, and
`>`.

**Note** that the escaped value is only suitable for being interpolated into
HTML as the text content of elements in which the tag does not have different
escaping mechanisms (it cannot be placed inside `<style>` or `<script>`, for
example, as those content bodies are not HTML, but CSS and JavaScript,
respectively; these are known as "raw text elements" in the HTML standard).

#### Example

The `escapeHtml` function is designed to accept a string input of text and
return an escaped value to interpolate into HTML.

```js
import { escapeHtml } from "https://deno.land/x/escape/mod.ts";

console.log(escapeHtml("<script>sample</script>"));
// Result: '&lt;script&gt;sample&lt;/script&gt;'

```
#### **2. isEscape(string: string): boolean**

This function will check exist escape the following characters: `"`, `'`, `&`, `<`, and
`>`.

#### Example

```js
import { isEscape } from "https://deno.land/x/escape/mod.ts";

console.log(isEscape("<script>sample</script>"));
// Result: true

```

### Un Escape HTML
```js
import { unescapeHtml } from "https://deno.land/x/escape/mod.ts";
```

#### **1. unescapeHtml(string: string): string**

Convert HTML entities to HTML characters, e.g. &gt; converts to >.

#### Example

The `unescapeHtml` function is designed to accept a string input of text and
return an un-escaped value to interpolate into HTML.

```js
import { unescapeHtml } from "https://deno.land/x/escape/mod.ts";

console.log(unescapeHtml("&amp;lt;script&amp;gt;sample&amp;lt;/script&amp;gt;"));
// Result: '<script>sample</script>'

```

#### **2. isUnescape(string: string): boolean**

This function will check exist unescape the following characters: `&amp;`, `&gt;`, `&lt;`, `&#x3A;`, `&quot;` and
`&#39;`.

#### Example

```js
import { isUnescape } from "https://deno.land/x/escape/mod.ts";

console.log(isUnescape("&amp;lt;script&amp;gt;sample&amp;lt;/script&amp;gt;"));
// Result: true

```

### Escape SQL
```js
import { escapeSql } from "https://deno.land/x/escape/mod.ts";
```

#### **1. escapeSql(SqlString: string): string**

Escape SQL special characters and quotes in strings.

#### Example

The `unescapeHtml` function is designed to accept a sql string and
return an escaped sql string.

```js
import { escapeSql } from "https://deno.land/x/escape/mod.ts";

console.log(escapeSql("insert into table_exp values('hi, my name''s johnny.');"));
// Result: 'insert into my_table values(\'hi, my name\'\'s johnny.\');'

```

# License

[MIT](./LICENSE)
