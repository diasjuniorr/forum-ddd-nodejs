export class Slug {
  public value;

  constructor(value: string) {
    this.value = value;
  }

  public static createFromText(text: string): Slug {
    const slug = text
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "");

    return new Slug(slug);
  }
}
