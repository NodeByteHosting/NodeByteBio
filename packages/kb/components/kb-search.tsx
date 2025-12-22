"use client";

import { useState, useMemo } from "react";
import { Search, X, FileText, Folder, Tag, Clock } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Input } from "@/packages/ui/components/ui/input";
import { Badge } from "@/packages/ui/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/packages/ui/components/ui/dialog";
import { Button } from "@/packages/ui/components/ui/button";
import { cn } from "@/packages/core/lib/utils";

interface SearchResult {
  slug: string;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
  score: number;
}

interface KBSearchProps {
  articles: SearchResult[];
  className?: string;
  variant?: "inline" | "dialog";
}

export function KBSearch({ articles, className, variant = "inline" }: KBSearchProps) {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);

    return articles
      .map((article) => {
        let score = 0;
        const titleLower = article.title.toLowerCase();
        const descLower = article.description.toLowerCase();
        const excerptLower = article.excerpt?.toLowerCase() || "";
        const tagsLower = article.tags?.map((t) => t.toLowerCase()) || [];

        for (const term of searchTerms) {
          // Title matches (highest weight)
          if (titleLower.includes(term)) score += 10;
          if (titleLower.startsWith(term)) score += 5;

          // Description matches
          if (descLower.includes(term)) score += 5;

          // Tag matches
          if (tagsLower.some((tag) => tag.includes(term))) score += 7;

          // Content matches
          if (excerptLower.includes(term)) score += 3;
        }

        return { ...article, score };
      })
      .filter((article) => article.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query, articles]);

  const handleSelect = () => {
    setQuery("");
    setIsOpen(false);
  };

  const SearchContent = () => (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("kb.searchPlaceholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-lg z-50 max-h-[400px] overflow-auto">
          {results.map((result) => (
            <Link
              key={`${result.category}/${result.slug}`}
              href={`/kb/${result.category}/${result.slug}`}
              onClick={handleSelect}
              className="block p-3 hover:bg-accent transition-colors border-b last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{result.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      <Folder className="h-3 w-3 mr-1" />
                      {result.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {result.description}
                  </p>
                  {result.tags && result.tags.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      {result.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Clock className="h-3 w-3" />
                  {result.readingTime} {t("kb.minRead")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-lg z-50 p-6 text-center">
          <Search className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">{t("kb.noResults.forQuery")} &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("kb.noResults.description")}
          </p>
        </div>
      )}
    </div>
  );

  if (variant === "dialog") {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className={cn("gap-2", className)}>
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">{t("kb.search.button")}</span>
            <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{t("kb.search.dialogTitle")}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <SearchContent />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return <SearchContent />;
}

export default KBSearch;
