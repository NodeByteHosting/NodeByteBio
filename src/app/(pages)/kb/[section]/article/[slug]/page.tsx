import dynamic from "next/dynamic";

// Load ArticleLayout dynamically to avoid prerender/runtime issues if it uses browser-only libs
const ArticleLayout = dynamic(() => import('components/Layouts/Article').then(m => m.ArticleLayout));

export default async function KnowledgeBase() {
    return <ArticleLayout />
}