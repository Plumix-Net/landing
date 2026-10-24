/**
 * NetBench facts shared by the product page and its store policy pages.
 *
 * Store listings link back to /netbench, /netbench/privacy and /netbench/terms,
 * so those paths must stay stable once the app is published.
 */

export const NETBENCH_REPO_URL = "https://github.com/Plumix-Net/NetBench";
export const NETBENCH_ISSUES_URL = `${NETBENCH_REPO_URL}/issues`;

/** Shown in the policies as the developer of the app. */
export const NETBENCH_DEVELOPER = "Plumix-Net";

/**
 * Public support address for store reviewers and users. Left empty until one is
 * chosen — the pages then point to GitHub issues only.
 */
export const NETBENCH_CONTACT_EMAIL = "";

/** Bump together with any change to the policy texts. */
export const NETBENCH_POLICY_UPDATED = "2026-10-24";

export interface StoreLink {
  id: "app-store" | "google-play";
  label: string;
  caption: string;
  /** null until the listing is live — rendered as "coming soon". */
  url: string | null;
}

export const NETBENCH_STORES: StoreLink[] = [
  { id: "app-store", label: "App Store", caption: "iPhone and iPad", url: null },
  { id: "google-play", label: "Google Play", caption: "Android phones", url: null },
];
