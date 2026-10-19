'use client';

import dynamic from 'next/dynamic';

// `ssr: false` is only allowed with `next/dynamic` inside Client Components
// (Next.js 15+), so the client-only import lives in this wrapper.
const DynamicOrdersSectionClient = dynamic(
  () => import('./OrdersSectionClient'),
  { ssr: false }
);

export default DynamicOrdersSectionClient;
