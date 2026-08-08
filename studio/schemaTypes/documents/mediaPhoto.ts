import {defineType, defineField} from 'sanity'

export const mediaPhoto = defineType({
  name: 'mediaPhoto',
  title: 'Media — Photo Event',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'date', title: 'Date', type: 'localeString'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'hub', title: 'Research Hub', type: 'reference', to: [{type: 'researchHub'}]}),
    defineField({name: 'imageCount', title: 'Number of Images', type: 'number'}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Roundtable', value: 'roundtable'},
          {title: 'Launch', value: 'launch'},
          {title: 'Forum', value: 'forum'},
          {title: 'Community', value: 'community'},
        ],
      },
    }),
    defineField({name: 'year', title: 'Year', type: 'string'}),
    defineField({
      name: 'aspect',
      title: 'Thumbnail Aspect',
      type: 'string',
      description: 'Controls the masonry-grid card height on the Media page',
      options: {list: [{title: 'Tall', value: 'tall'}, {title: 'Wide', value: 'wide'}, {title: 'Square', value: 'square'}]},
    }),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'date.en', media: 'thumbnail'},
  },
})
