import {defineType, defineField} from 'sanity'

export const researchProject = defineType({
  name: 'researchProject',
  title: 'Research Project',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({
      name: 'tldr',
      title: 'TL;DR',
      type: 'localeString',
      description: 'One-sentence summary shown on the project card',
    }),
    defineField({
      name: 'hub',
      title: 'Research Hub',
      type: 'reference',
      to: [{type: 'researchHub'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Recruiting', value: 'recruiting'},
          {title: 'Completed', value: 'completed'},
          {title: 'Planning', value: 'planning'},
        ],
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g. "GraduationCap", "HandHeart")',
    }),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {name: 'hex color'}),
    }),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({name: 'participants', title: 'Participants Status', type: 'localeString'}),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      description: 'Free-text project timeline, e.g. "2024 - 2027"',
    }),
    defineField({name: 'contact', title: 'Contact Name', type: 'string'}),
    defineField({name: 'contactEmail', title: 'Contact Email', type: 'string'}),
    defineField({name: 'externalLink', title: 'External Link', type: 'url', description: 'e.g. a partner org site or survey link for this project'}),
    defineField({name: 'location', title: 'Location', type: 'localeString'}),
    defineField({
      name: 'keyFocus',
      title: 'Key Focus Areas',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'status'},
  },
})
