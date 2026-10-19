'use client';

// antd v5 renders static methods (e.g. `notification.success`) via the legacy
// `ReactDOM.render`, which React 19 removed. This patch wires them to
// `createRoot`. See https://u.ant.design/v5-for-19
import '@ant-design/v5-patch-for-react-19';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

const AntStyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => {
    // Next.js 15 calls this on every streamed flush, so only emit styles that
    // were not emitted yet (same approach as `@ant-design/nextjs-registry`).
    const styleText = extractStyle(cache, { plain: true, once: true });
    if (styleText.includes('.data-ant-cssinjs-cache-path{content:"";}')) {
      return null;
    }
    return <style id='antd' dangerouslySetInnerHTML={{ __html: styleText }} />;
  });
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default AntStyledComponentsRegistry;
