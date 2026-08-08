import {defineType, defineField} from 'sanity'

export const communityPartner = defineType({
  name: 'communityPartner',
  title: 'Community Partner',
  type: 'document',
  description: 'Shared across the Community, Partners, and Partnership pages',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({name: 'website', title: 'Website', type: 'url'}),
    defineField({name: 'contact', title: 'Contact Email', type: 'string'}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Newcomer Services', value: 'newcomer-services'},
          {title: 'Health Services', value: 'health-services'},
          {title: 'Research', value: 'research'},
          {title: 'Social Services', value: 'social-services'},
          {title: 'Education & Libraries', value: 'education-libraries'},
          {title: 'Youth Empowerment', value: 'youth-empowerment'},
          {title: 'Government & Public Health', value: 'government-public-health'},
          {title: 'International', value: 'international'},
          {title: 'Funder', value: 'funder'},
          {title: 'Academic Institution', value: 'academic-institution'},
        ],
      },
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, {name: 'hex color'}),
    }),
    defineField({
      name: 'showOn',
      title: 'Show On',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Community page', value: 'community'},
          {title: 'Partners page', value: 'partners'},
          {title: 'Partnership page (funders/logos strip)', value: 'partnership'},
        ],
      },
      description: 'Which page(s) this partner should appear on',
    }),
  ],
  preview: {
    select: {title: 'name.en', subtitle: 'category', media: 'logo'},
  },
})
