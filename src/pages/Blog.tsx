import { Link } from "react-router-dom";
import { ArrowRight, Rss } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/Seo";
import { BLOG_POSTS, formatPostDate } from "@/blog/posts";

const Blog = () => (
  <SiteLayout>
    <Seo path="/blog" />
    <section className="container py-12 md:py-16">
      <div className="max-w-2xl">
        <span className="text-xs font-mono uppercase tracking-wider text-primary-glow">Blog</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Plumix blog</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Releases, porting guides and deep dives into Flutter's architecture — written while porting
          it to C#.
        </p>
        <a
          href="/blog/rss.xml"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <Rss className="h-4 w-4" /> RSS feed
        </a>
      </div>

      <ol className="mt-12 max-w-3xl space-y-4">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="group block card-surface rounded-xl p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.minutes} min read</span>
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-primary-glow transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">{post.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-glow">
                Read the post <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  </SiteLayout>
);

export default Blog;
