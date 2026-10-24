import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { proseComponents } from "@/components/site/Prose";
import { BLOG_POSTS, formatPostDate, getPost } from "@/blog/posts";
import { useContent } from "@/content/registry";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPost(slug);
  const path = `/blog/${slug}`;
  const Content = useContent(path);

  if (!post) return <NotFound />;

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <SiteLayout>
      <Seo path={path} />
      <article className="container max-w-3xl py-12 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary-glow"
        >
          <Link to="/blog" className="hover:text-primary">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground normal-case font-sans tracking-normal truncate">
            {post.title}
          </span>
        </nav>

        <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight leading-tight">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.updated && (
            <>
              <span aria-hidden>·</span>
              <span>
                Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{post.minutes} min read</span>
        </div>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.description}</p>

        <div className="mt-4">
          {Content ? (
            <Content components={proseComponents} />
          ) : (
            <p className="mt-10 text-muted-foreground">Loading…</p>
          )}
        </div>

        <aside className="mt-16 card-surface rounded-2xl p-8">
          <h2 className="text-xl font-semibold tracking-tight">Try Plumix</h2>
          <p className="mt-2 text-muted-foreground">
            Install the packages from NuGet and mount your first Flutter-style widget tree in a few
            minutes.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-gradient-primary text-primary-foreground border-0 shadow-primary">
              <Link to="/docs">
                Get started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-border bg-secondary/30 hover:bg-secondary/60">
              <Link to="/controls">Browse the controls</Link>
            </Button>
          </div>
        </aside>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
              More from the blog
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="block h-full card-surface rounded-lg p-5 hover:border-primary/40 transition-colors"
                  >
                    <div className="font-medium">{p.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </SiteLayout>
  );
};

export default BlogPost;
