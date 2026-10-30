import { isReleased, type CollectionKey } from '@/lib/release-policy';

const internalPreviewUids = new Set(
  (import.meta.env.KK_INTERNAL_PREVIEW_UIDS ?? '')
    .split(',')
    .map((uid: string) => uid.trim())
    .filter(Boolean)
);

export const internalPreviewActive = internalPreviewUids.size > 0;

export function isPreviewIncluded(collection: CollectionKey, uid: string): boolean {
  return isReleased(collection, uid) || internalPreviewUids.has(uid);
}
