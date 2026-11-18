import CmsPage, { cmsPageMetadata } from '@/components/CmsPage';

// /programs/ = the CMS page with slug "programs" (the overview); individual programs are in ./[slug].
export const generateMetadata = () => cmsPageMetadata('programs');

export default function ProgramsPage() {
  return <CmsPage slug="programs" />;
}
