import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const reviewSchema = z.object({
  scientific: z.object({
    status: z.enum(['passed', 'pending']),
    reviewer: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
  }),
  editorial: z.object({
    status: z.enum(['passed', 'pending']),
    reviewer: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
  })
});

const moderatedState = {
  workflowState: z.enum(['approved', 'review_ready']),
  visibility: z.enum(['public', 'preview']),
  review: reviewSchema
};

const topicWorlds = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topic-worlds' }),
  schema: z.object({
    uid: z.string().regex(/^tw-/),
    type: z.literal('theme_world'),
    slug: z.string(),
    locale: z.literal('de'),
    title: z.string(),
    summary: z.string(),
    leadQuestion: z.string(),
    accent: z.string(),
    ...moderatedState
  })
});

const topics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/topics' }),
  schema: z.object({
    uid: z.string().regex(/^topic-/),
    type: z.literal('topic'),
    slug: z.string(),
    locale: z.literal('de'),
    title: z.string(),
    summary: z.string(),
    worldIds: z.array(z.string().regex(/^tw-/)).min(1),
    ...moderatedState
  })
});

const knowledge = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/knowledge' }),
  schema: z.object({
    uid: z.string().regex(/^knowledge-/),
    type: z.literal('knowledge'),
    slug: z.string(),
    locale: z.literal('de'),
    title: z.string(),
    dek: z.string(),
    summary: z.string(),
    readingMinutes: z.number().int().positive(),
    topicIds: z.array(z.string().regex(/^topic-/)).min(1),
    claimIds: z.array(z.string().regex(/^claim-/)).default([]),
    heroImage: z.object({ src: z.string(), alt: z.string().min(1) }).optional(),
    scientificStatus: z.enum(['established', 'active_research', 'mixed']).default('established'),
    sourceGap: z.string().optional(),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    ...moderatedState
  })
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    uid: z.string().regex(/^video-/),
    type: z.literal('video'),
    slug: z.string(),
    locale: z.literal('de'),
    title: z.string(),
    dek: z.string(),
    platform: z.literal('youtube'),
    platformId: z.string(),
    publicUrl: z.url(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    durationDisplay: z.string().optional(),
    durationStatus: z.enum(['observed', 'not_verified']),
    pageMode: z.enum(['deep', 'metadata']),
    knowledgeIds: z.array(z.string().regex(/^knowledge-/)).default([]),
    topicIds: z.array(z.string().regex(/^topic-/)).min(1),
    thumbnail: z.object({ src: z.string(), alt: z.string().min(1) }),
    chapters: z.array(z.object({ time: z.string(), seconds: z.number().int().nonnegative(), title: z.string() })).default([]),
    ...moderatedState
  })
});

const sources = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/data/sources' }),
  schema: z.object({
    uid: z.string().regex(/^source-/),
    type: z.literal('source_canonical'),
    slug: z.string(),
    locale: z.literal('de'),
    kind: z.enum(['paper', 'book', 'book_chapter', 'reference_work', 'technical_report', 'official_background']),
    title: z.string(),
    authors: z.array(z.string()).min(1),
    year: z.number().int(),
    publisher: z.string(),
    url: z.url(),
    identifiers: z.record(z.string(), z.string()).optional(),
    summary: z.string(),
    limits: z.string(),
    ...moderatedState
  })
});

const claims = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/data/claims' }),
  schema: z.object({
    uid: z.string().regex(/^claim-/),
    type: z.literal('claim'),
    contentUid: z.string(),
    statement: z.string(),
    scientificCore: z.boolean(),
    scope: z.string().optional(),
    limits: z.string().optional(),
    ...moderatedState
  })
});

const contentSources = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/data/relations/content-sources' }),
  schema: z.object({
    uid: z.string().regex(/^cs-/),
    type: z.literal('content_source'),
    contentUid: z.string(),
    sourceUid: z.string().regex(/^source-/),
    role: z.enum(['supports', 'background', 'definition', 'limitation']),
    claimUids: z.array(z.string().regex(/^claim-/)).default([]),
    locator: z.string(),
    ...moderatedState
  })
});

const contentLinks = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/data/relations/content-links' }),
  schema: z.object({
    uid: z.string().regex(/^link-/),
    type: z.literal('content_link'),
    fromUid: z.string(),
    toUid: z.string(),
    relation: z.enum(['contains', 'explained_by', 'featured_video', 'related_to', 'background_for', 'uses', 'documents']),
    ...moderatedState
  })
});

const learningPaths = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learning-paths' }),
  schema: z.object({
    uid: z.string().regex(/^path-/),
    type: z.literal('learning_path'),
    slug: z.string(),
    locale: z.literal('de'),
    title: z.string(),
    summary: z.string(),
    knowledgeIds: z.array(z.string().regex(/^knowledge-/)).min(2),
    ...moderatedState
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    uid: z.string().regex(/^project-/),
    type: z.literal('research_project'),
    slug: z.string(), locale: z.literal('de'), title: z.string(), summary: z.string(),
    projectKind: z.enum(['science_communication', 'technical_contribution']),
    statusLabel: z.string(), topicIds: z.array(z.string()).default([]),
    ...moderatedState
  })
});

const cooperations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cooperations' }),
  schema: z.object({
    uid: z.string().regex(/^cooperation-/),
    type: z.literal('cooperation'),
    slug: z.string(), locale: z.literal('de'), title: z.string(), summary: z.string(),
    scientificStatus: z.literal('external_hypothesis'),
    consensusNote: z.string(), topicIds: z.array(z.string()).default([]),
    ...moderatedState
  })
});

const magazines = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/magazine' }),
  schema: z.object({
    uid: z.string().regex(/^magazine-/), type: z.literal('magazine_article'),
    slug: z.string(), locale: z.literal('de'), title: z.string(), summary: z.string(),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(), topicIds: z.array(z.string()).default([]),
    ...moderatedState
  })
});

export const collections = {
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
  magazines
};
