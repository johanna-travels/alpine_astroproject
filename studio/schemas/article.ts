import { defineField, defineType } from 'sanity';

const destinationOptions = [
  { title: 'Bali', value: 'bali' },
  { title: 'Belgium', value: 'belgium' },
  { title: 'Greece', value: 'greece' },
  { title: 'Japan', value: 'japan' },
];

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published date (display text)',
      type: 'string',
      group: 'content',
      placeholder: '19 June 2026',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destinationSlug',
      title: 'Destination',
      type: 'string',
      group: 'settings',
      options: { list: destinationOptions },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category label',
      type: 'string',
      group: 'settings',
      placeholder: 'JAPAN',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / card image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (rule) => rule.required() }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraphs',
      type: 'array',
      group: 'content',
      of: [{ type: 'text' }],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            { name: 'navTitle', title: 'Table of contents label', type: 'string', validation: (rule) => rule.required() },
            { name: 'sectionId', title: 'Section ID (no spaces)', type: 'string', validation: (rule) => rule.required() },
            { name: 'heading', title: 'Section heading', type: 'string', validation: (rule) => rule.required() },
            { name: 'body', title: 'Section body', type: 'blockContent', validation: (rule) => rule.required() },
          ],
          preview: {
            select: { title: 'navTitle', subtitle: 'heading' },
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'destinationSlug', media: 'heroImage' },
  },
});
