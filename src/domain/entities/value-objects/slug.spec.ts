import { test, expect } from "vitest";
import { Slug } from "./slug";

test("create a valid slug", () => {
  const text = "Any Text-";

  const slug = Slug.createFromText(text);

  expect(slug.value).toEqual("any-text");
});
