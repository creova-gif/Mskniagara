import {defineType, defineField} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'localeString',
      description: 'e.g. "Journal Article", "Report", "Conference Presentation"',
    }),
    defineField({name: 'authors', title: 'Authors', type: 'localeString'}),
    defineField({name: 'date', title: 'Publication Date', type: 'localeString'}),
    defineField({name: 'year', title: 'Year', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'hub',
      title: 'Research Hub',
      type: 'reference',
      to: [{type: 'researchHub'}],
    }),
    defineField({name: 'abstract', title: 'Abstract', type: 'localeText'}),
    defineField({name: 'link', title: 'External Link', type: 'url'}),
    defineField({name: 'doi', title: 'DOI', type: 'string', description: 'Just the DOI, e.g. 10.1234/abcd — not the full URL'}),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {name: 'hex color'}),
    }),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'year'},
  },
})
