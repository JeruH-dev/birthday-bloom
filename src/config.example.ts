/**
 * Birthday Bloom v3.0 example configuration.
 *
 * Copy this file to `src/config.ts` or import pieces from it while building a
 * customized celebration.
 */

import { ConfigValidator, type EnhancedBirthdayConfig } from '@/features/core/models/dataModels';
import {
  createCustomFamilyMemberTemplate,
  createDefaultBrotherProfile,
  createDefaultFatherProfile,
  createDefaultFriendProfile,
  createDefaultGrandmotherProfile,
  createDefaultMotherProfile,
  createDefaultSisterProfile,
  createFamilyMemberProfile,
  getAllFamilyTemplateDefinitions,
  migrateLegacyFamilyMember,
  validateFamilyMemberProfile,
} from '@/features/core/models/familyTemplates';

export const minimalConfig: Partial<EnhancedBirthdayConfig> = {
  core: {
    name: 'Naboraj',
    dateOfBirth: new Date('2001-05-22'),
    gender: 'male',
    relationship: 'friend',
  },
  personalization: {
    theme: 'fun',
    favoriteColor: '#FF6B6B',
  },
};

export const comprehensiveConfig: EnhancedBirthdayConfig = ConfigValidator.mergeWithDefaults({
  core: {
    name: 'Naboraj Sarkar',
    dateOfBirth: new Date('2001-05-22'),
    gender: 'male',
    relationship: 'friend',
  },
  personalization: {
    theme: 'energetic',
    favoriteColor: '#FF6B6B',
    favoriteEmojis: ['party', 'sparkle', 'star'],
    customMessage: 'Happy birthday to the legend of our friend group!',
    interests: ['coding', 'gaming', 'music', 'travel'],
    hobbies: ['programming', 'video production', 'digital art'],
  },
  sections: {
    showCake: true,
    showPhotos: true,
    showVideos: true,
    showQuiz: true,
    showHeartTree: true,
    showTimeline: true,
  },
  metadata: {
    version: '3.0.0',
    tags: ['birthday', 'friend', 'celebration'],
    isPublic: false,
  },
});

export const brotherConfig = createDefaultBrotherProfile('Rajesh', new Date('1998-03-15'));
brotherConfig.basicInfo.preferredName = 'Raj';
brotherConfig.identity.occupation = 'Software Engineer';
brotherConfig.personality.traits = ['protective', 'humorous', 'ambitious', 'loyal'];
brotherConfig.specialized.childhoodMemories = ['Playing cricket after school', 'Building our first website together'];
brotherConfig.personalNotes.whatMakesThemSpecial = 'He shows up when it matters and makes hard days lighter.';

export const sisterConfig = createDefaultSisterProfile('Priya', new Date('2000-07-22'));
sisterConfig.basicInfo.preferredName = 'Pri';
sisterConfig.identity.occupation = 'Data Scientist';
sisterConfig.personality.traits = ['analytical', 'creative', 'compassionate', 'ambitious'];
sisterConfig.specialized.siblingTraditions = ['Long birthday calls', 'Trying a new dessert every year'];
sisterConfig.personalNotes.whatMakesThemSpecial = 'She has a rare mix of clarity, courage, and warmth.';

export const parentProfiles = [
  createDefaultFatherProfile('Amit'),
  createDefaultMotherProfile('Maya'),
];

export const extendedFamilyProfiles = [
  createDefaultGrandmotherProfile('Nirmala'),
  createFamilyMemberProfile('uncle', 'Sanjay'),
  createFamilyMemberProfile('aunt', 'Kavita'),
  createFamilyMemberProfile('cousin', 'Anika'),
];

export const chosenFamilyProfiles = [
  createDefaultFriendProfile('Arjun'),
  createFamilyMemberProfile('guardian', 'Mrs. Sen', undefined, {
    specialized: {
      supportResponsibilities: ['Education guidance', 'Life advice'],
    },
  }),
];

export const customCoachTemplate = createCustomFamilyMemberTemplate('Coach', [
  { id: 'training-memory', label: 'Training memory', type: 'textarea' },
  { id: 'lesson-learned', label: 'Lesson learned', type: 'textarea' },
]);

export const migratedLegacyProfile = migrateLegacyFamilyMember({
  id: 'legacy-1',
  type: 'extended',
  name: 'Legacy Relative',
  profileData: {
    oldNotes: 'Imported from the v2 loose family object.',
  },
});

export const availableFamilyTemplates = getAllFamilyTemplateDefinitions();
export const brotherValidationErrors = validateFamilyMemberProfile(brotherConfig);

export function exampleValidation() {
  const validation = ConfigValidator.validate(comprehensiveConfig);
  const safeConfig = ConfigValidator.sanitize(comprehensiveConfig);

  return {
    validation,
    safeConfig,
    familyProfileErrors: [
      ...validateFamilyMemberProfile(brotherConfig),
      ...validateFamilyMemberProfile(sisterConfig),
    ],
  };
}

export default comprehensiveConfig;
