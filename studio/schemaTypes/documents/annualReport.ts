import {defineType, defineField} from 'sanity'

export const annualReport = defineType({
  name: 'annualReport',
  title: 'Media — Annual Report',
  type: 'document',
  fields: [
    defineField({name: 'year', title: 'Year Range', type: 'string', description: 'e.g. "2024–2025"'}),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({name: 'pages', title: 'Page Count', type: 'number'}),
    defineField({name: 'publishDate', title: 'Publish Date', type: 'localeString'}),
    defineField({
      name: 'stats',
      title: 'Highlighted Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string', description: 'e.g. "26", "150+"'}),
            defineField({name: 'label', title: 'Label', type: 'localeString'}),
          ],
          preview: {select: {title: 'value', subtitle: 'label.en'}},
        },
      ],
    }),
    defineField({name: 'file', title: 'Report PDF', type: 'file'}),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'year'},
  },
})
