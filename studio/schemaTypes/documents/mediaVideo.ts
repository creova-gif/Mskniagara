import {defineType, defineField} from 'sanity'

export const mediaVideo = defineType({
  name: 'mediaVideo',
  title: 'Media — Video Story',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'speaker', title: 'Speaker Name', type: 'string'}),
    defineField({name: 'role', title: 'Speaker Role', type: 'localeString'}),
    defineField({name: 'hub', title: 'Research Hub', type: 'reference', to: [{type: 'researchHub'}]}),
    defineField({name: 'duration', title: 'Duration', type: 'string', description: 'e.g. "4:32"'}),
    defineField({name: 'date', title: 'Date', type: 'localeString'}),
    defineField({name: 'views', title: 'View Count', type: 'number'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
    defineField({name: 'videoUrl', title: 'Video URL', type: 'url', description: 'Link to the hosted video (YouTube, Vimeo, etc.)'}),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'speaker', media: 'thumbnail'},
  },
})
