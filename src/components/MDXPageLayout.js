import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { formatH1, formatTable, formatIframe } from '../helper';

import Layout from './layout';

const components = {
  // Map HTML element tag to React component
  h1: ({ children, ...props }) => formatH1({ children, ...props }),
  table: props => formatTable(props),
  iframe: (props, i) => formatIframe(props),
};

const MDXPageLayout = ({ location, children }) => (
  <Layout location={location} >
    <MDXProvider
      components={components}
    >
      {children}
    </MDXProvider>
  </Layout>
);

export default MDXPageLayout;