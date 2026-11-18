/* tslint:disable */
// Content types returned by the Laravel API (same shape the site used with the previous CMS).
/* eslint-disable */
/**
 * Generated from the previous Payload config; it describes the JSON the Laravel API returns
 * (fitnova-api/resources/cms/schema.json is the source of truth). Update by hand when fields change.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    pages: Page;
    programs: Program;
    posts: Post;
    categories: Category;
    team: Team;
    testimonials: Testimonial;
    media: Media;
    leads: Lead;
    users: User;
    'payload-kv': PayloadKv;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    pages: PagesSelect<false> | PagesSelect<true>;
    programs: ProgramsSelect<false> | ProgramsSelect<true>;
    posts: PostsSelect<false> | PostsSelect<true>;
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    team: TeamSelect<false> | TeamSelect<true>;
    testimonials: TestimonialsSelect<false> | TestimonialsSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    leads: LeadsSelect<false> | LeadsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    'payload-kv': PayloadKvSelect<false> | PayloadKvSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  fallbackLocale: null;
  globals: {
    site: Site;
  };
  globalsSelect: {
    site: SiteSelect<false> | SiteSelect<true>;
  };
  locale: null;
  widgets: {
    collections: CollectionsWidget;
  };
  user: User;
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * Every page of the site. Slug "home" is the homepage.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  name: string;
  /**
   * URL part, e.g. about-founders. Lowercase, hyphens only.
   */
  slug: string;
  /**
   * Shown in Google results and browser tabs. The H1 is the main page headline.
   */
  seo: {
    /**
     * Aim for 50–65 characters. Used exactly as typed.
     */
    title: string;
    /**
     * Aim for 120–160 characters.
     */
    description: string;
    h1: string;
    /**
     * The ending of the H1 shown in green italics, e.g. “Reverse Lifestyle Diseases”. Must be the last words of the H1.
     */
    h1Accent?: string | null;
    keywords?: string | null;
    ogImage?: (number | null) | Media;
    noindex?: boolean | null;
  };
  layout?:
    | (
        | {
            eyebrow?: string | null;
            lead?: string | null;
            finderQuestion?: string | null;
            chips?:
              | {
                  label: string;
                  program?: (number | null) | Program;
                  id?: string | null;
                }[]
              | null;
            ctaLabel?: string | null;
            ctaChosenLabel?: string | null;
            waLabel?: string | null;
            trust?:
              | {
                  before?: string | null;
                  bold?: string | null;
                  after?: string | null;
                  id?: string | null;
                }[]
              | null;
            image?: (number | null) | Media;
            /**
             * CSS focus point of the photo, e.g. "50% 50%" (centre) or "90% 50%" (right).
             */
            imagePosition?: string | null;
            floatTitle?: string | null;
            floatDoctors?:
              | {
                  name?: string | null;
                  quals?: string | null;
                  id?: string | null;
                }[]
              | null;
            badge?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'homeHero';
          }
        | {
            eyebrow?: string | null;
            sub?: string | null;
            buttons?:
              | {
                  label: string;
                  url: string;
                  style?: ('primary' | 'lime' | 'ghost' | 'wa') | null;
                  id?: string | null;
                }[]
              | null;
            trust?:
              | {
                  text: string;
                  id?: string | null;
                }[]
              | null;
            image?: (number | null) | Media;
            imagePosition?: string | null;
            showDoctorBadges?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'pageHero';
          }
        | {
            items?:
              | {
                  value: string;
                  label: string;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'stats';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            /**
             * Optional in-page id, e.g. "programs"
             */
            anchor?: string | null;
            ctaTitle?: string | null;
            ctaText?: string | null;
            ctaLinkLabel?: string | null;
            ctaUrl?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'programCards';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            button?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            colA?: string | null;
            colB?: string | null;
            rows?:
              | {
                  a: string;
                  b: string;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'compare';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            anchor?: string | null;
            steps?:
              | {
                  title: string;
                  text?: string | null;
                  id?: string | null;
                }[]
              | null;
            note?: string | null;
            button?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            buttonStyle?: ('primary' | 'ghost') | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'steps';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            anchor?: string | null;
            detailed?: boolean | null;
            focusLine?: string | null;
            quote?: string | null;
            button?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'founders';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            linkLabel?: string | null;
            linkUrl?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'founderCards';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            showHelp?: boolean | null;
            showCoachStrip?: boolean | null;
            coachesBold?: string | null;
            coachesText?: string | null;
            button?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'teamPanel';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'coaches';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            items?:
              | {
                  title: string;
                  text?: string | null;
                  id?: string | null;
                }[]
              | null;
            note?: string | null;
            fine?: string | null;
            fineLink?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'iconGrid';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            anchor?: string | null;
            limit?: number | null;
            video?: (number | null) | Media;
            videoUrl?: string | null;
            button?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'stories';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            anchor?: string | null;
            clinic?: {
              title?: string | null;
              items?:
                | {
                    text: string;
                    id?: string | null;
                  }[]
                | null;
              button?: {
                label?: string | null;
                /**
                 * e.g. /book-consultation/ or https://…
                 */
                url?: string | null;
              };
              secondary?: {
                label?: string | null;
                /**
                 * e.g. /book-consultation/ or https://…
                 */
                url?: string | null;
              };
            };
            online?: {
              title?: string | null;
              items?:
                | {
                    text: string;
                    id?: string | null;
                  }[]
                | null;
              button?: {
                label?: string | null;
                /**
                 * e.g. /book-consultation/ or https://…
                 */
                url?: string | null;
              };
              secondary?: {
                label?: string | null;
                /**
                 * e.g. /book-consultation/ or https://…
                 */
                url?: string | null;
              };
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'modes';
          }
        | {
            anchor?: string | null;
            kicker?: string | null;
            title?: string | null;
            text?: string | null;
            cover?: (number | null) | Media;
            buttonLabel?: string | null;
            fine?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'guidePromo';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            anchor?: string | null;
            buttonLabel?: string | null;
            faqs?:
              | {
                  q: string;
                  a: string;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'faq';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            quote?: string | null;
            paragraphs?:
              | {
                  text: string;
                  id?: string | null;
                }[]
              | null;
            buttons?:
              | {
                  label: string;
                  url: string;
                  style?: ('primary' | 'lime' | 'ghost' | 'wa') | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            items?:
              | {
                  text: string;
                  id?: string | null;
                }[]
              | null;
            columns?: ('1' | '2') | null;
            note?: string | null;
            source?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checklist';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            colLabel?: string | null;
            colA?: string | null;
            colB?: string | null;
            rows?:
              | {
                  label: string;
                  a?: string | null;
                  b?: string | null;
                  id?: string | null;
                }[]
              | null;
            note?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'table';
          }
        | {
            kicker?: string | null;
            title: string;
            text?: string | null;
            buttons?:
              | {
                  label: string;
                  url: string;
                  style?: ('primary' | 'lime' | 'ghost' | 'wa') | null;
                  id?: string | null;
                }[]
              | null;
            fine?: string | null;
            fineLink?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'ctaBand';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            links?:
              | {
                  label: string;
                  url: string;
                  id?: string | null;
                }[]
              | null;
            latestPosts?: number | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'linkList';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            cards?:
              | {
                  title: string;
                  text?: string | null;
                  url: string;
                  linkLabel?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'cards';
          }
        | {
            content: string; // HTML
            id?: string | null;
            blockName?: string | null;
            blockType: 'richText';
          }
        | {
            eyebrow?: string | null;
            sub?: string | null;
            ticks?:
              | {
                  text: string;
                  id?: string | null;
                }[]
              | null;
            formTitle?: string | null;
            submitLabel?: string | null;
            consent?: string | null;
            fine?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'bookingHero';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'contactButtons';
          }
        | {
            eyebrow?: string | null;
            sub?: string | null;
            cover?: (number | null) | Media;
            formTitle?: string | null;
            formSub?: string | null;
            submitLabel?: string | null;
            consent?: string | null;
            pdf?: (number | null) | Media;
            id?: string | null;
            blockName?: string | null;
            blockType: 'guideHero';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'blogIndex';
          }
        | {
            id?: string | null;
            blockName?: string | null;
            blockType: 'sitemapList';
          }
        | {
            openBadge?: string | null;
            statBadgeBold?: string | null;
            statBadgeText?: string | null;
            sub?: string | null;
            incentiveTitle?: string | null;
            incentiveText?: string | null;
            incentiveMobile?: string | null;
            counters?:
              | {
                  value?: string | null;
                  label?: string | null;
                  id?: string | null;
                }[]
              | null;
            stepsKicker?: string | null;
            stepsTitle?: string | null;
            stepsAccent?: string | null;
            steps?:
              | {
                  title: string;
                  text?: string | null;
                  id?: string | null;
                }[]
              | null;
            desksKicker?: string | null;
            desksTitle?: string | null;
            desksAccent?: string | null;
            desksText?: string | null;
            desks?:
              | {
                  title?: string | null;
                  sub?: string | null;
                  glyph?: string | null;
                  color?: string | null;
                  id?: string | null;
                }[]
              | null;
            visitKicker?: string | null;
            virtualTourUrl?: string | null;
            guideKicker?: string | null;
            guideText?: string | null;
            enquiriesKicker?: string | null;
            enquiries?:
              | {
                  title?: string | null;
                  email?: string | null;
                  id?: string | null;
                }[]
              | null;
            faqKicker?: string | null;
            faqs?:
              | {
                  q: string;
                  a: string;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'contactHub';
          }
        | {
            text: string;
            link?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'note';
          }
      )[]
    | null;
  chrome?: ('full' | 'logo') | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * All website images. Alt text describes the image for Google and screen readers.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumb?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    large?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * Program pages live at /programs/<slug>/.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "programs".
 */
export interface Program {
  id: number;
  name: string;
  /**
   * URL part, e.g. about-founders. Lowercase, hyphens only.
   */
  slug: string;
  order?: number | null;
  card: string;
  tag?: string | null;
  footerLabel?: string | null;
  heroEyebrow?: string | null;
  heroSub: string;
  trust?: string | null;
  guideButton?: boolean | null;
  layout?:
    | (
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            quote?: string | null;
            paragraphs?:
              | {
                  text: string;
                  id?: string | null;
                }[]
              | null;
            buttons?:
              | {
                  label: string;
                  url: string;
                  style?: ('primary' | 'lime' | 'ghost' | 'wa') | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            items?:
              | {
                  title: string;
                  text?: string | null;
                  id?: string | null;
                }[]
              | null;
            note?: string | null;
            fine?: string | null;
            fineLink?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'iconGrid';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            items?:
              | {
                  text: string;
                  id?: string | null;
                }[]
              | null;
            columns?: ('1' | '2') | null;
            note?: string | null;
            source?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checklist';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            colLabel?: string | null;
            colA?: string | null;
            colB?: string | null;
            rows?:
              | {
                  label: string;
                  a?: string | null;
                  b?: string | null;
                  id?: string | null;
                }[]
              | null;
            note?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'table';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            anchor?: string | null;
            steps?:
              | {
                  title: string;
                  text?: string | null;
                  id?: string | null;
                }[]
              | null;
            note?: string | null;
            button?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            buttonStyle?: ('primary' | 'ghost') | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'steps';
          }
        | {
            anchor?: string | null;
            kicker?: string | null;
            title?: string | null;
            text?: string | null;
            cover?: (number | null) | Media;
            buttonLabel?: string | null;
            fine?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'guidePromo';
          }
        | {
            kicker?: string | null;
            title: string;
            text?: string | null;
            buttons?:
              | {
                  label: string;
                  url: string;
                  style?: ('primary' | 'lime' | 'ghost' | 'wa') | null;
                  id?: string | null;
                }[]
              | null;
            fine?: string | null;
            fineLink?: {
              label?: string | null;
              /**
               * e.g. /book-consultation/ or https://…
               */
              url?: string | null;
            };
            id?: string | null;
            blockName?: string | null;
            blockType: 'ctaBand';
          }
        | {
            kicker?: string | null;
            title?: string | null;
            intro?: string | null;
            tone?: ('white' | 'cream' | 'mint' | 'forest') | null;
            links?:
              | {
                  label: string;
                  url: string;
                  id?: string | null;
                }[]
              | null;
            latestPosts?: number | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'linkList';
          }
        | {
            items?:
              | {
                  value: string;
                  label: string;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'stats';
          }
      )[]
    | null;
  faqs?:
    | {
        q: string;
        a: string;
        id?: string | null;
      }[]
    | null;
  closingTitle: string;
  closingText?: string | null;
  footerNote?: string | null;
  related?: (number | Program)[] | null;
  blogCategory?: (number | null) | Category;
  /**
   * Shown in Google results and browser tabs. The H1 is the main page headline.
   */
  seo: {
    /**
     * Aim for 50–65 characters. Used exactly as typed.
     */
    title: string;
    /**
     * Aim for 120–160 characters.
     */
    description: string;
    h1: string;
    /**
     * The ending of the H1 shown in green italics, e.g. “Reverse Lifestyle Diseases”. Must be the last words of the H1.
     */
    h1Accent?: string | null;
    keywords?: string | null;
    ogImage?: (number | null) | Media;
    noindex?: boolean | null;
  };
  condition?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  name: string;
  /**
   * URL part, e.g. about-founders. Lowercase, hyphens only.
   */
  slug: string;
  order?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  /**
   * URL part, e.g. about-founders. Lowercase, hyphens only.
   */
  slug: string;
  publishedAt: string;
  category: number | Category;
  author?: string | null;
  image?: (number | null) | Media;
  excerpt?: string | null;
  content: string; // HTML
  seo?: {
    title?: string | null;
    exactTitle?: boolean | null;
    description?: string | null;
  };
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "team".
 */
export interface Team {
  id: number;
  name: string;
  role: 'founder' | 'panel' | 'coach';
  order?: number | null;
  photo?: (number | null) | Media;
  speciality?: string | null;
  help?: string | null;
  title?: string | null;
  quals?: string | null;
  shortLine?: string | null;
  credentials?:
    | {
        text: string;
        id?: string | null;
      }[]
    | null;
  shortCredentials?:
    | {
        text: string;
        id?: string | null;
      }[]
    | null;
  bio?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * Only stories with written consent are shown on the site.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "testimonials".
 */
export interface Testimonial {
  id: number;
  name: string;
  age?: number | null;
  area?: string | null;
  tag?: string | null;
  quote: string;
  before?: string | null;
  after?: string | null;
  photo?: (number | null) | Media;
  consent: boolean;
  order?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * Every booking, callback and guide request from the website.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "leads".
 */
export interface Lead {
  id: number;
  kind: 'consultation' | 'callback' | 'guide';
  status?: ('new' | 'contacted' | 'booked' | 'closed') | null;
  notes?: string | null;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  city?: string | null;
  age?: string | null;
  concern?: string | null;
  mode?: string | null;
  callTime?: string | null;
  slot?: string | null;
  message?: string | null;
  consent?: boolean | null;
  page?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  resetPasswordRequestedAt?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
  collection: 'users';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-kv".
 */
export interface PayloadKv {
  id: number;
  key: string;
  data:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'programs';
        value: number | Program;
      } | null)
    | ({
        relationTo: 'posts';
        value: number | Post;
      } | null)
    | ({
        relationTo: 'categories';
        value: number | Category;
      } | null)
    | ({
        relationTo: 'team';
        value: number | Team;
      } | null)
    | ({
        relationTo: 'testimonials';
        value: number | Testimonial;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'leads';
        value: number | Lead;
      } | null)
    | ({
        relationTo: 'users';
        value: number | User;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  seo?:
    | T
    | {
        title?: T;
        description?: T;
        h1?: T;
        h1Accent?: T;
        keywords?: T;
        ogImage?: T;
        noindex?: T;
      };
  layout?:
    | T
    | {
        homeHero?:
          | T
          | {
              eyebrow?: T;
              lead?: T;
              finderQuestion?: T;
              chips?:
                | T
                | {
                    label?: T;
                    program?: T;
                    id?: T;
                  };
              ctaLabel?: T;
              ctaChosenLabel?: T;
              waLabel?: T;
              trust?:
                | T
                | {
                    before?: T;
                    bold?: T;
                    after?: T;
                    id?: T;
                  };
              image?: T;
              imagePosition?: T;
              floatTitle?: T;
              floatDoctors?:
                | T
                | {
                    name?: T;
                    quals?: T;
                    id?: T;
                  };
              badge?: T;
              id?: T;
              blockName?: T;
            };
        pageHero?:
          | T
          | {
              eyebrow?: T;
              sub?: T;
              buttons?:
                | T
                | {
                    label?: T;
                    url?: T;
                    style?: T;
                    id?: T;
                  };
              trust?:
                | T
                | {
                    text?: T;
                    id?: T;
                  };
              image?: T;
              imagePosition?: T;
              showDoctorBadges?: T;
              id?: T;
              blockName?: T;
            };
        stats?:
          | T
          | {
              items?:
                | T
                | {
                    value?: T;
                    label?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        programCards?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              anchor?: T;
              ctaTitle?: T;
              ctaText?: T;
              ctaLinkLabel?: T;
              ctaUrl?: T;
              id?: T;
              blockName?: T;
            };
        compare?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              button?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              colA?: T;
              colB?: T;
              rows?:
                | T
                | {
                    a?: T;
                    b?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        steps?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              anchor?: T;
              steps?:
                | T
                | {
                    title?: T;
                    text?: T;
                    id?: T;
                  };
              note?: T;
              button?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              buttonStyle?: T;
              id?: T;
              blockName?: T;
            };
        founders?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              anchor?: T;
              detailed?: T;
              focusLine?: T;
              quote?: T;
              button?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
        founderCards?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              linkLabel?: T;
              linkUrl?: T;
              id?: T;
              blockName?: T;
            };
        teamPanel?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              showHelp?: T;
              showCoachStrip?: T;
              coachesBold?: T;
              coachesText?: T;
              button?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
        coaches?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              id?: T;
              blockName?: T;
            };
        iconGrid?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              items?:
                | T
                | {
                    title?: T;
                    text?: T;
                    id?: T;
                  };
              note?: T;
              fine?: T;
              fineLink?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
        stories?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              anchor?: T;
              limit?: T;
              video?: T;
              videoUrl?: T;
              button?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
        modes?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              anchor?: T;
              clinic?:
                | T
                | {
                    title?: T;
                    items?:
                      | T
                      | {
                          text?: T;
                          id?: T;
                        };
                    button?:
                      | T
                      | {
                          label?: T;
                          url?: T;
                        };
                    secondary?:
                      | T
                      | {
                          label?: T;
                          url?: T;
                        };
                  };
              online?:
                | T
                | {
                    title?: T;
                    items?:
                      | T
                      | {
                          text?: T;
                          id?: T;
                        };
                    button?:
                      | T
                      | {
                          label?: T;
                          url?: T;
                        };
                    secondary?:
                      | T
                      | {
                          label?: T;
                          url?: T;
                        };
                  };
              id?: T;
              blockName?: T;
            };
        guidePromo?:
          | T
          | {
              anchor?: T;
              kicker?: T;
              title?: T;
              text?: T;
              cover?: T;
              buttonLabel?: T;
              fine?: T;
              id?: T;
              blockName?: T;
            };
        faq?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              anchor?: T;
              buttonLabel?: T;
              faqs?:
                | T
                | {
                    q?: T;
                    a?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        text?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              quote?: T;
              paragraphs?:
                | T
                | {
                    text?: T;
                    id?: T;
                  };
              buttons?:
                | T
                | {
                    label?: T;
                    url?: T;
                    style?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        checklist?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              items?:
                | T
                | {
                    text?: T;
                    id?: T;
                  };
              columns?: T;
              note?: T;
              source?: T;
              id?: T;
              blockName?: T;
            };
        table?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              colLabel?: T;
              colA?: T;
              colB?: T;
              rows?:
                | T
                | {
                    label?: T;
                    a?: T;
                    b?: T;
                    id?: T;
                  };
              note?: T;
              id?: T;
              blockName?: T;
            };
        ctaBand?:
          | T
          | {
              kicker?: T;
              title?: T;
              text?: T;
              buttons?:
                | T
                | {
                    label?: T;
                    url?: T;
                    style?: T;
                    id?: T;
                  };
              fine?: T;
              fineLink?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
        linkList?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              links?:
                | T
                | {
                    label?: T;
                    url?: T;
                    id?: T;
                  };
              latestPosts?: T;
              id?: T;
              blockName?: T;
            };
        cards?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              cards?:
                | T
                | {
                    title?: T;
                    text?: T;
                    url?: T;
                    linkLabel?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        richText?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
        bookingHero?:
          | T
          | {
              eyebrow?: T;
              sub?: T;
              ticks?:
                | T
                | {
                    text?: T;
                    id?: T;
                  };
              formTitle?: T;
              submitLabel?: T;
              consent?: T;
              fine?: T;
              id?: T;
              blockName?: T;
            };
        contactButtons?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              id?: T;
              blockName?: T;
            };
        guideHero?:
          | T
          | {
              eyebrow?: T;
              sub?: T;
              cover?: T;
              formTitle?: T;
              formSub?: T;
              submitLabel?: T;
              consent?: T;
              pdf?: T;
              id?: T;
              blockName?: T;
            };
        blogIndex?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              id?: T;
              blockName?: T;
            };
        sitemapList?:
          | T
          | {
              id?: T;
              blockName?: T;
            };
        contactHub?:
          | T
          | {
              openBadge?: T;
              statBadgeBold?: T;
              statBadgeText?: T;
              sub?: T;
              incentiveTitle?: T;
              incentiveText?: T;
              incentiveMobile?: T;
              counters?:
                | T
                | {
                    value?: T;
                    label?: T;
                    id?: T;
                  };
              stepsKicker?: T;
              stepsTitle?: T;
              stepsAccent?: T;
              steps?:
                | T
                | {
                    title?: T;
                    text?: T;
                    id?: T;
                  };
              desksKicker?: T;
              desksTitle?: T;
              desksAccent?: T;
              desksText?: T;
              desks?:
                | T
                | {
                    title?: T;
                    sub?: T;
                    glyph?: T;
                    color?: T;
                    id?: T;
                  };
              visitKicker?: T;
              virtualTourUrl?: T;
              guideKicker?: T;
              guideText?: T;
              enquiriesKicker?: T;
              enquiries?:
                | T
                | {
                    title?: T;
                    email?: T;
                    id?: T;
                  };
              faqKicker?: T;
              faqs?:
                | T
                | {
                    q?: T;
                    a?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        note?:
          | T
          | {
              text?: T;
              link?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
      };
  chrome?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "programs_select".
 */
export interface ProgramsSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  order?: T;
  card?: T;
  tag?: T;
  footerLabel?: T;
  heroEyebrow?: T;
  heroSub?: T;
  trust?: T;
  guideButton?: T;
  layout?:
    | T
    | {
        text?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              quote?: T;
              paragraphs?:
                | T
                | {
                    text?: T;
                    id?: T;
                  };
              buttons?:
                | T
                | {
                    label?: T;
                    url?: T;
                    style?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
        iconGrid?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              items?:
                | T
                | {
                    title?: T;
                    text?: T;
                    id?: T;
                  };
              note?: T;
              fine?: T;
              fineLink?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
        checklist?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              items?:
                | T
                | {
                    text?: T;
                    id?: T;
                  };
              columns?: T;
              note?: T;
              source?: T;
              id?: T;
              blockName?: T;
            };
        table?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              colLabel?: T;
              colA?: T;
              colB?: T;
              rows?:
                | T
                | {
                    label?: T;
                    a?: T;
                    b?: T;
                    id?: T;
                  };
              note?: T;
              id?: T;
              blockName?: T;
            };
        steps?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              anchor?: T;
              steps?:
                | T
                | {
                    title?: T;
                    text?: T;
                    id?: T;
                  };
              note?: T;
              button?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              buttonStyle?: T;
              id?: T;
              blockName?: T;
            };
        guidePromo?:
          | T
          | {
              anchor?: T;
              kicker?: T;
              title?: T;
              text?: T;
              cover?: T;
              buttonLabel?: T;
              fine?: T;
              id?: T;
              blockName?: T;
            };
        ctaBand?:
          | T
          | {
              kicker?: T;
              title?: T;
              text?: T;
              buttons?:
                | T
                | {
                    label?: T;
                    url?: T;
                    style?: T;
                    id?: T;
                  };
              fine?: T;
              fineLink?:
                | T
                | {
                    label?: T;
                    url?: T;
                  };
              id?: T;
              blockName?: T;
            };
        linkList?:
          | T
          | {
              kicker?: T;
              title?: T;
              intro?: T;
              tone?: T;
              links?:
                | T
                | {
                    label?: T;
                    url?: T;
                    id?: T;
                  };
              latestPosts?: T;
              id?: T;
              blockName?: T;
            };
        stats?:
          | T
          | {
              items?:
                | T
                | {
                    value?: T;
                    label?: T;
                    id?: T;
                  };
              id?: T;
              blockName?: T;
            };
      };
  faqs?:
    | T
    | {
        q?: T;
        a?: T;
        id?: T;
      };
  closingTitle?: T;
  closingText?: T;
  footerNote?: T;
  related?: T;
  blogCategory?: T;
  seo?:
    | T
    | {
        title?: T;
        description?: T;
        h1?: T;
        h1Accent?: T;
        keywords?: T;
        ogImage?: T;
        noindex?: T;
      };
  condition?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  publishedAt?: T;
  category?: T;
  author?: T;
  image?: T;
  excerpt?: T;
  content?: T;
  seo?:
    | T
    | {
        title?: T;
        exactTitle?: T;
        description?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  order?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "team_select".
 */
export interface TeamSelect<T extends boolean = true> {
  name?: T;
  role?: T;
  order?: T;
  photo?: T;
  speciality?: T;
  help?: T;
  title?: T;
  quals?: T;
  shortLine?: T;
  credentials?:
    | T
    | {
        text?: T;
        id?: T;
      };
  shortCredentials?:
    | T
    | {
        text?: T;
        id?: T;
      };
  bio?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "testimonials_select".
 */
export interface TestimonialsSelect<T extends boolean = true> {
  name?: T;
  age?: T;
  area?: T;
  tag?: T;
  quote?: T;
  before?: T;
  after?: T;
  photo?: T;
  consent?: T;
  order?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumb?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        card?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
        large?:
          | T
          | {
              url?: T;
              width?: T;
              height?: T;
              mimeType?: T;
              filesize?: T;
              filename?: T;
            };
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "leads_select".
 */
export interface LeadsSelect<T extends boolean = true> {
  kind?: T;
  status?: T;
  notes?: T;
  name?: T;
  phone?: T;
  email?: T;
  city?: T;
  age?: T;
  concern?: T;
  mode?: T;
  callTime?: T;
  slot?: T;
  message?: T;
  consent?: T;
  page?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  resetPasswordRequestedAt?: T;
  loginAttempts?: T;
  lockUntil?: T;
  sessions?:
    | T
    | {
        id?: T;
        createdAt?: T;
        expiresAt?: T;
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-kv_select".
 */
export interface PayloadKvSelect<T extends boolean = true> {
  key?: T;
  data?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site".
 */
export interface Site {
  id: number;
  name?: string | null;
  phone: string;
  /**
   * e.g. +919923357018
   */
  phoneRaw: string;
  /**
   * e.g. 919923357018
   */
  whatsapp: string;
  email: string;
  address: string;
  street?: string | null;
  city?: string | null;
  region?: string | null;
  postcode?: string | null;
  hours?: string | null;
  hoursClosed?: string | null;
  mapsUrl?: string | null;
  /**
   * Needs SMTP settings on the server (see README).
   */
  notifyEmail?: string | null;
  logo?: (number | null) | Media;
  announceText?: string | null;
  announceLabel?: string | null;
  announceUrl?: string | null;
  nav?:
    | {
        label: string;
        url: string;
        children?:
          | {
              label: string;
              url: string;
              id?: string | null;
            }[]
          | null;
        autoPrograms?: boolean | null;
        mobileOnly?: boolean | null;
        id?: string | null;
      }[]
    | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  /**
   * Full 3D: hero and card tilt, depth and parallax. Subtle: scroll reveals and counters only. Off: no animation. Visitors whose device asks for reduced motion never see animations.
   */
  animations?: ('full' | 'subtle' | 'off') | null;
  brandLine?: string | null;
  finderKicker?: string | null;
  finderTitle?: string | null;
  finderText?: string | null;
  symptoms?:
    | {
        label: string;
        icon?: string | null;
        url: string;
        id?: string | null;
      }[]
    | null;
  cbBadge?: string | null;
  cbTitle?: string | null;
  cbAccent?: string | null;
  cbText?: string | null;
  cbTextMobile?: string | null;
  cbTrust?:
    | {
        text: string;
        id?: string | null;
      }[]
    | null;
  cbConcerns?:
    | {
        text: string;
        id?: string | null;
      }[]
    | null;
  cbButton?: string | null;
  cbFine?: string | null;
  programLinks?:
    | {
        label: string;
        url: string;
        id?: string | null;
      }[]
    | null;
  companyLinks?:
    | {
        label: string;
        url: string;
        id?: string | null;
      }[]
    | null;
  legalLinks?:
    | {
        label: string;
        url: string;
        id?: string | null;
      }[]
    | null;
  socials?:
    | {
        network: 'instagram' | 'youtube' | 'facebook' | 'whatsapp';
        url: string;
        id?: string | null;
      }[]
    | null;
  foundedBy?: string | null;
  disclaimer?: string | null;
  copyright?: string | null;
  /** Public tracking IDs, set in the admin under Settings › Analytics & Integrations. */
  tracking?: { ga4?: string | null; clarity?: string | null };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "site_select".
 */
export interface SiteSelect<T extends boolean = true> {
  name?: T;
  phone?: T;
  phoneRaw?: T;
  whatsapp?: T;
  email?: T;
  address?: T;
  street?: T;
  city?: T;
  region?: T;
  postcode?: T;
  hours?: T;
  hoursClosed?: T;
  mapsUrl?: T;
  notifyEmail?: T;
  logo?: T;
  announceText?: T;
  announceLabel?: T;
  announceUrl?: T;
  nav?:
    | T
    | {
        label?: T;
        url?: T;
        children?:
          | T
          | {
              label?: T;
              url?: T;
              id?: T;
            };
        autoPrograms?: T;
        mobileOnly?: T;
        id?: T;
      };
  ctaLabel?: T;
  ctaUrl?: T;
  animations?: T;
  brandLine?: T;
  finderKicker?: T;
  finderTitle?: T;
  finderText?: T;
  symptoms?:
    | T
    | {
        label?: T;
        icon?: T;
        url?: T;
        id?: T;
      };
  cbBadge?: T;
  cbTitle?: T;
  cbAccent?: T;
  cbText?: T;
  cbTextMobile?: T;
  cbTrust?:
    | T
    | {
        text?: T;
        id?: T;
      };
  cbConcerns?:
    | T
    | {
        text?: T;
        id?: T;
      };
  cbButton?: T;
  cbFine?: T;
  programLinks?:
    | T
    | {
        label?: T;
        url?: T;
        id?: T;
      };
  companyLinks?:
    | T
    | {
        label?: T;
        url?: T;
        id?: T;
      };
  legalLinks?:
    | T
    | {
        label?: T;
        url?: T;
        id?: T;
      };
  socials?:
    | T
    | {
        network?: T;
        url?: T;
        id?: T;
      };
  foundedBy?: T;
  disclaimer?: T;
  copyright?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "collections_widget".
 */
export interface CollectionsWidget {
  data?: {
    [k: string]: unknown;
  };
  width: 'full';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}

