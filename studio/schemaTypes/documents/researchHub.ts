import {defineType, defineField} from 'sanity'

export const researchHub = defineType({
  name: 'researchHub',
  title: 'Research Hub',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the hub detail page URL, e.g. "childhood" -> /about/hubs/childhood',
      options: {source: 'name.en'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color used for this hub\'s icon/accent throughout the site, e.g. #089EA5',
      validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {name: 'hex color'}),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name used to render this hub\'s icon in the app (e.g. "Users", "HeartPulse")',
    }),
    defineField({
      name: 'objectives',
      title: 'Objectives',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'highlightProjects',
      title: 'Highlight Projects',
      description: 'Short example projects shown on this hub\'s detail page (distinct from the full Research Projects registry)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'highlightProject',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'localeString'}),
            defineField({name: 'description', title: 'Description', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.en'}},
        },
      ],
    }),
    defineField({name: 'coverImage', title: 'Cover Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {title: 'name.en', media: 'coverImage'},
  },
})
