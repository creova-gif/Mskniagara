import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Set these via studio/.env (see .env.example) once the Sanity project exists.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'msk-niagara-studio',
  title: 'MSK Niagara',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('MSK Niagara Content')
          .items([
            S.listItem()
              .title('Team & Hubs')
              .child(
                S.list()
                  .title('Team & Hubs')
                  .items([
                    S.documentTypeListItem('teamMember').title('Team Members'),
                    S.documentTypeListItem('researchHub').title('Research Hubs'),
                  ]),
              ),
            S.listItem()
              .title('Research')
              .child(
                S.list()
                  .title('Research')
                  .items([
                    S.documentTypeListItem('researchProject').title('Projects'),
                    S.documentTypeListItem('publication').title('Publications'),
                  ]),
              ),
            S.documentTypeListItem('communityPartner').title('Community & Partners'),
            S.documentTypeListItem('timelineEvent').title('Timeline & Events'),
            S.listItem()
              .title('Media')
              .child(
                S.list()
                  .title('Media')
                  .items([
                    S.documentTypeListItem('mediaPhoto').title('Photo Events'),
                    S.documentTypeListItem('mediaVideo').title('Video Stories'),
                    S.documentTypeListItem('annualReport').title('Annual Reports'),
                  ]),
              ),
          ]),
    }),
    // GROQ playground — helpful for me during development, safe to leave for admins too
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
