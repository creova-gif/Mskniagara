import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  studioHost: 'msk-niagara',
  deployment: {
    appId: 'x6ehc3lh2guw2tpiojpgwjqq',
  },
})
