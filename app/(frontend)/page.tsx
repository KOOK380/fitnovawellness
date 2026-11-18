import CmsPage, { cmsPageMetadata } from '@/components/CmsPage';

// Homepage = the CMS page with slug "home".
export const generateMetadata = () => cmsPageMetadata('home');

export default function Home() {
  return <CmsPage slug="home" />;
}
