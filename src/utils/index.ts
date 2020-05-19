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

export function clearToken(): void {
  localStorage.removeItem('token');
}

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function getToken(): string | undefined {
  try {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
      clearToken();
      return undefined;
    }
    return token;
  } catch (err) {
    clearToken();
    return undefined;
  }
}

export function getBearerToken(): string {
  return `Bearer ${getToken()}`;
}
