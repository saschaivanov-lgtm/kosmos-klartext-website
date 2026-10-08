import policy from '@/data/release-policy.json';
import type { GraphEntry } from '@/lib/graph';

export type CollectionKey = keyof typeof policy.content;
export type RobotsDirective = 'index, follow' | 'noindex, follow' | 'noindex, nofollow';

const allowed = Object.fromEntries(
  Object.entries(policy.content).map(([collection, uids]) => [collection, new Set(uids)])
) as Record<CollectionKey, Set<string>>;

export const releasePolicy = policy;
export const globalRobotsLock = policy.globalRobotsLock as RobotsDirective | null;
export const navigation = policy.staticRoutes.filter((route) => 'nav' in route && route.nav);

export function isReleased(collection: CollectionKey, uid: string): boolean {
  return allowed[collection].has(uid);
}

export function filterReleased<T extends GraphEntry>(collection: CollectionKey, entries: T[]): T[] {
  return entries.filter((entry) => isReleased(collection, entry.data.uid));
}

export function robotsTargetForEntry(entry: GraphEntry): RobotsDirective {
  const type = entry.data.type as keyof typeof policy.robotsTargets;
  return (policy.robotsTargets[type] ?? policy.robotsTargets.default) as RobotsDirective;
}

export function robotsTargetForPath(pathname: string): RobotsDirective {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const route = policy.staticRoutes.find((candidate) => candidate.path === normalized);
  if (route) return route.robotsTarget as RobotsDirective;
  if (normalized.startsWith('/mediathek/videos/')) return policy.robotsTargets.video as RobotsDirective;
  if (normalized.startsWith('/quellen/') && normalized !== '/quellen/') return policy.robotsTargets.source_canonical as RobotsDirective;
  return policy.robotsTargets.default as RobotsDirective;
}

export function sitemapStaticRoutes(): string[] {
  return policy.staticRoutes.filter((route) => route.sitemap).map((route) => route.path);
}
