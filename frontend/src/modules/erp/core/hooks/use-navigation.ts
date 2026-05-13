'use client';

import { usePathname } from 'next/navigation';
import { pageTitles } from '../config';

export function useNavigation() {
  const pathname = usePathname();
  const pathAfterErp = pathname?.split('/erp/')[1] || 'dashboard';
  
  // Extract active slug
  const pathSegments = pathAfterErp.split('/');
  let activeSlug = pathAfterErp;
  
  if (pathSegments.length >= 2) {
    const twoSegment = `${pathSegments[0]}/${pathSegments[1]}`;
    if (pageTitles[twoSegment]) {
      activeSlug = twoSegment;
    }
  }
  
  if (!pageTitles[activeSlug] && pathSegments.length >= 1) {
    if (pageTitles[pathSegments[0]]) {
      activeSlug = pathSegments[0];
    }
  }

  const pageTitle = pageTitles[activeSlug] || 'ERP';

  // Build breadcrumb
  const breadcrumbs: Array<{ label: string; href: string }> = [
    { label: 'ERP', href: '/erp/dashboard' },
  ];

  if (pathSegments.length >= 1 && pathSegments[0] !== 'dashboard') {
    const moduleLabel = pageTitles[pathSegments[0]] || pathSegments[0];
    breadcrumbs.push({ label: moduleLabel, href: `/erp/${pathSegments[0]}` });
  }

  if (pathSegments.length >= 2) {
    const subLabel = pageTitles[activeSlug] || pathSegments[1];
    breadcrumbs.push({ label: subLabel, href: pathname });
  }

  return { activeSlug, pageTitle, breadcrumbs, pathname };
}
