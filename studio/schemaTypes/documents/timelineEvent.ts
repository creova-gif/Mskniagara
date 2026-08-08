import {defineType, defineField} from 'sanity'

export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({
      name: 'dateValue',
      title: 'Date',
      type: 'date',
      description: 'Used to sort events and determine upcoming vs. past automatically',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'time', title: 'Time', type: 'string', description: 'Free-text, e.g. "2:00 PM - 4:00 PM EST"'}),
    defineField({name: 'location', title: 'Location', type: 'localeString'}),
    defineField({name: 'locationUrl', title: 'Location Map Link', type: 'url'}),
    defineField({name: 'registration', title: 'Registration Info', type: 'localeString'}),
    defineField({name: 'registrationUrl', title: 'Registration Link', type: 'url'}),
    defineField({
      name: 'isFeatured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Featured upcoming events get highlighted styling on the Timeline page',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date, soonest first',
      name: 'dateAsc',
      by: [{field: 'dateValue', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'dateValue'},
  },
})
