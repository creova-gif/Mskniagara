import {defineType, defineField} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Role / Title', type: 'localeString'}),
    defineField({
      name: 'hub',
      title: 'Research Hub',
      type: 'reference',
      to: [{type: 'researchHub'}],
      description: 'Leave empty for members not tied to a specific hub',
    }),
    defineField({name: 'institution', title: 'Institution', type: 'localeString'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'memberType',
      title: 'Member Type',
      type: 'string',
      options: {
        list: [
          {title: 'Faculty', value: 'faculty'},
          {title: 'Student', value: 'student'},
          {title: 'Community', value: 'community'},
          {title: 'Staff', value: 'staff'},
        ],
      },
    }),
    defineField({
      name: 'isPostDoc',
      title: 'Postdoctoral Fellow',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isCoDirector',
      title: 'Co-Director',
      type: 'boolean',
      description: 'Co-directors are featured on the Home page leadership section',
      initialValue: false,
    }),
    defineField({
      name: 'isHubLeader',
      title: 'Hub Leader',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isProjectLeader',
      title: 'Project Leader',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'projectLeaderTitle',
      title: 'Project Leader Title',
      type: 'localeString',
      description: 'e.g. "Project #1 Leader" — only shown when Project Leader is checked',
      hidden: ({ parent }) => !parent?.isProjectLeader,
    }),
    defineField({name: 'bio', title: 'Bio', type: 'localeText'}),
    defineField({name: 'image', title: 'Photo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (used for co-director ordering on the Home page)',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role.en', media: 'image'},
  },
})
