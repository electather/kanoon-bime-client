/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const BIIPage = lazyLoad(
  () => import('./index'),
  module => module.BII,
);
