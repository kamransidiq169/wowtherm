import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Insight {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingTime: string;
  image: string;
}

const contentDir = path.join(process.cwd(), "content/insights");

export function getAllInsights(): Insight[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ?? new Date().toISOString(),
        author: data.author ?? "WowTherm Team",
        category: data.category ?? "General",
        readingTime: data.readingTime ?? "5 min read",
        image: data.image ?? "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getInsight(slug: string): Insight | undefined {
  return getAllInsights().find((i) => i.slug === slug);
}

export function getInsightsByCategory(category: string): Insight[] {
  return getAllInsights().filter(
    (i) => i.category.toLowerCase() === category.toLowerCase(),
  );
}

export function getInsightContent(slug: string): string {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return "";
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}
