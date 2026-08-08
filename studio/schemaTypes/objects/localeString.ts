import {defineType, defineField} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({name: 'en', title: 'English', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'fr', title: 'Français', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'en'},
  },
})
