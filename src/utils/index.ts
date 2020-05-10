import { ViewType } from 'types/data';

export const isServer = typeof window === 'undefined';

/**
 * returns a view type based on screen width
 *
 * @export
 * @param width screen width
 * @returns screen type
 */
export function getView(width: number): ViewType {
  let newView: ViewType = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
}
