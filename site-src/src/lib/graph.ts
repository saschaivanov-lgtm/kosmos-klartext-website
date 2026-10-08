import { getCollection } from 'astro:content';
import { filterReleased } from '@/lib/release-policy';

export type GraphEntry = {
  id: string;
  collection: string;
  data: Record<string, any>;
  body?: string;
};

export type LinkedEntry = {
  entry: GraphEntry;
  relation: string;
  direction: 'outgoing' | 'incoming';
};

export async function loadGraph(options: { includeInternal?: boolean } = {}) {
  const allTopicWorlds = (await getCollection('topicWorlds')) as unknown as GraphEntry[];
  const allTopics = (await getCollection('topics')) as unknown as GraphEntry[];
  const allKnowledge = (await getCollection('knowledge')) as unknown as GraphEntry[];
  const allVideos = (await getCollection('videos')) as unknown as GraphEntry[];
  const allSources = (await getCollection('sources')) as unknown as GraphEntry[];
  const allClaims = (await getCollection('claims')) as unknown as GraphEntry[];
  const allContentSources = (await getCollection('contentSources')) as unknown as GraphEntry[];
  const allContentLinks = (await getCollection('contentLinks')) as unknown as GraphEntry[];
  const allLearningPaths = (await getCollection('learningPaths')) as unknown as GraphEntry[];
  const allProjects = (await getCollection('projects')) as unknown as GraphEntry[];
  const allCooperations = (await getCollection('cooperations')) as unknown as GraphEntry[];
  // Das Magazin bleibt als späterer Contenttyp im Schema, ist aber nicht Teil des V1-Korpus.
  const allMagazines: GraphEntry[] = [];

  const topicWorlds = options.includeInternal ? allTopicWorlds : filterReleased('topicWorlds', allTopicWorlds);
  const topics = options.includeInternal ? allTopics : filterReleased('topics', allTopics);
  const knowledge = options.includeInternal ? allKnowledge : filterReleased('knowledge', allKnowledge);
  const videos = options.includeInternal ? allVideos : filterReleased('videos', allVideos);
  const sources = options.includeInternal ? allSources : filterReleased('sources', allSources);
  const learningPaths = options.includeInternal ? allLearningPaths : filterReleased('learningPaths', allLearningPaths);
  const projects = options.includeInternal ? allProjects : filterReleased('projects', allProjects);
  const cooperations = options.includeInternal ? allCooperations : filterReleased('cooperations', allCooperations);
  const magazines = options.includeInternal ? allMagazines : filterReleased('magazines', allMagazines);

  const entities = [...topicWorlds, ...topics, ...knowledge, ...videos, ...sources, ...learningPaths, ...projects, ...cooperations, ...magazines];
  const byUid = new Map(entities.map((entry) => [entry.data.uid, entry]));
  const claims = options.includeInternal ? allClaims : allClaims.filter((entry) => byUid.has(entry.data.contentUid));
  const contentSources = options.includeInternal ? allContentSources : allContentSources.filter((entry) => byUid.has(entry.data.contentUid) && byUid.has(entry.data.sourceUid));
  const contentLinks = options.includeInternal ? allContentLinks : allContentLinks.filter((entry) => byUid.has(entry.data.fromUid) && byUid.has(entry.data.toUid));
  const claimsByUid = new Map(claims.map((entry) => [entry.data.uid, entry]));

  function linked(uid: string): LinkedEntry[] {
    const result: LinkedEntry[] = [];
    for (const link of contentLinks) {
      if (link.data.fromUid === uid) {
        const entry = byUid.get(link.data.toUid);
        if (entry) result.push({ entry, relation: link.data.relation, direction: 'outgoing' });
      }
      if (link.data.toUid === uid) {
        const entry = byUid.get(link.data.fromUid);
        if (entry) result.push({ entry, relation: link.data.relation, direction: 'incoming' });
      }
    }
    return result;
  }

  function sourcesFor(uid: string) {
    return contentSources.flatMap((relation) => {
      if (relation.data.contentUid !== uid) return [];
      const source = byUid.get(relation.data.sourceUid);
      return source ? [{ source, relation }] : [];
    });
  }

  function referencesFor(sourceUid: string) {
    return contentSources.flatMap((relation) => {
      if (relation.data.sourceUid !== sourceUid) return [];
      const content = byUid.get(relation.data.contentUid);
      return content ? [{ content, relation }] : [];
    });
  }

  return {
    topicWorlds,
    topics,
    knowledge,
    videos,
    sources,
    claims,
    contentSources,
    contentLinks,
    learningPaths,
    projects,
    cooperations,
    magazines,
    byUid,
    claimsByUid,
    linked,
    sourcesFor,
    referencesFor
  };
}

export function routeFor(entry: GraphEntry): string {
  const { type, slug } = entry.data;
  if (type === 'theme_world') return `/entdecken/themenwelten/${slug}/`;
  if (type === 'knowledge') return `/wissen/${slug}/`;
  if (type === 'video') return `/mediathek/videos/${slug}/`;
  if (type === 'source_canonical') return `/quellen/${slug}/`;
  if (type === 'topic') return `/entdecken/themen/${slug}/`;
  if (type === 'learning_path') return `/entdecken/lernpfade/${slug}/`;
  if (type === 'research_project') return `/projekte/${slug}/`;
  if (type === 'cooperation') return `/kooperationen/${slug}/`;
  if (type === 'magazine_article') return `/magazin/${slug}/`;
  return '/';
}

export function typeLabel(type: string): string {
  return ({
    theme_world: 'Themenwelt',
    topic: 'Thema',
    knowledge: 'Wissenseintrag',
    video: 'Video',
    source_canonical: 'Quelle',
    learning_path: 'Lernpfad',
    research_project: 'Projekt',
    cooperation: 'Kooperation',
    magazine_article: 'Magazin'
  } as Record<string, string>)[type] ?? type;
}

export function relationLabel(relation: string, direction: 'outgoing' | 'incoming'): string {
  const key = `${relation}:${direction}`;
  return ({
    'contains:outgoing': 'Enthält',
    'contains:incoming': 'Teil von',
    'explained_by:outgoing': 'Vertiefung',
    'explained_by:incoming': 'Erklärt dieses Thema',
    'featured_video:outgoing': 'Passendes Video',
    'featured_video:incoming': 'Vertieft im Wissenseintrag',
    'background_for:outgoing': 'Wissenshintergrund',
    'background_for:incoming': 'Video zum Wissenseintrag',
    'related_to:outgoing': 'Verwandt',
    'related_to:incoming': 'Verwandt'
    ,'uses:outgoing': 'Nutzt'
    ,'uses:incoming': 'Verwendet in'
    ,'documents:outgoing': 'Dokumentiert'
    ,'documents:incoming': 'Projektkontext'
  } as Record<string, string>)[key] ?? 'Verknüpft';
}
