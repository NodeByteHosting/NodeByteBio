import Link from "next/link";
import { FileText, Clock, Calendar, User, ChevronRight } from "lucide-react";
import { cn } from "@/packages/core/lib/utils";
import { Badge } from "@/packages/ui/components/ui/badge";

export interface Article {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  description: string;
  tags?: string[];
  author?: string;
  lastUpdated: string;
  readingTime: number;
  order: number;
}

interface KBArticleCardProps {
  article: Article;
  showCategory?: boolean;
  className?: string;
  translations?: {
    minRead: string;
  };
}

export function KBArticleCard({
  article,
  showCategory = false,
  className,
  translations,
}: KBArticleCardProps) {
  return (
    <Link href={`/kb/${article.categorySlug}/${article.slug}`}>
      <article
        className={cn(
          "group flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 hover:border-primary/50 transition-all duration-200",
          className
        )}
      >
        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
          <FileText className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
              {article.title}
            </h3>
            {showCategory && (
              <Badge variant="secondary" className="text-xs capitalize">
                {article.category.replace(/-/g, " ")}
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {article.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime} {translations?.minRead || "min read"}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(article.lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            {article.author && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {article.author}
              </span>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-1 mt-2 flex-wrap">
              {article.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {article.tags.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{article.tags.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </article>
    </Link>
  );
}

interface KBArticleListProps {
  articles: Article[];
  showCategory?: boolean;
  className?: string;
}

export function KBArticleList({
  articles,
  showCategory = false,
  className,
}: KBArticleListProps) {
  const sortedArticles = [...articles].sort((a, b) => a.order - b.order);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {sortedArticles.map((article) => (
        <KBArticleCard
          key={`${article.category}/${article.slug}`}
          article={article}
          showCategory={showCategory}
        />
      ))}
    </div>
  );
}

export default KBArticleCard;
