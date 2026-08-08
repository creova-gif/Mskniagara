import {defineType, defineField} from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'fr', title: 'Français', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'en'},
  },
})
