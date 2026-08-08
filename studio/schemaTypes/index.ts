import {localeString} from './objects/localeString'
import {localeText} from './objects/localeText'

import {researchHub} from './documents/researchHub'
import {teamMember} from './documents/teamMember'
import {researchProject} from './documents/researchProject'
import {publication} from './documents/publication'
import {communityPartner} from './documents/communityPartner'
import {timelineEvent} from './documents/timelineEvent'
import {mediaPhoto} from './documents/mediaPhoto'
import {mediaVideo} from './documents/mediaVideo'
import {annualReport} from './documents/annualReport'

export const schemaTypes = [
  // Shared objects
  localeString,
  localeText,
  // Documents
  researchHub,
  teamMember,
  researchProject,
  publication,
  communityPartner,
  timelineEvent,
  mediaPhoto,
  mediaVideo,
  annualReport,
]
