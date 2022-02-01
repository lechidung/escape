import { escapeHtml, isEscape, unescapeHtml, isUnescape, escapeSql } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.123.0/testing/asserts.ts";

Deno.test("Case: Escape HTML String", () => {
  assertEquals(escapeHtml("<script>sample</script>"), "&lt;script&gt;sample&lt;/script&gt;");
});

Deno.test("Case: Not contain un-escape string", () => {
  assertEquals(isEscape("Foo&bar"), true);
});

Deno.test("Case: Contain only un-escape string", () => {
  assertEquals(isEscape("&quot;awesome&quot;"), false);
});

Deno.test("Case: Contain un-escape and escape string", () => {
  assertEquals(isEscape("Foo&bar &quot;awesome&quot;"), true);
});

Deno.test("Case: Un-escape string.", () => {
  assertEquals(unescapeHtml("&amp;lt;script&amp;gt;sample&amp;lt;/script&amp;gt;"), "<script>sample</script>");
});

Deno.test("Case: Is contain un-escape string.", () => {
  assertEquals(isUnescape("&amp;lt;script&amp;gt;sample&amp;lt;/script&amp;gt;"), true);
});

Deno.test("Case: Escape SQL string.", () => {
  assertEquals(escapeSql("insert into table_exp values('hi, my name's johnny.');"), "'insert into table_exp values(\\'hi, my name\\'s johnny.\\');'");
});

