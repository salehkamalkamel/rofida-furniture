export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateSKU(categoryId?: string): string {
  const prefix = categoryId ? categoryId.substring(0, 3).toUpperCase() : "PRD";

  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `${prefix}-${random}`;
}
