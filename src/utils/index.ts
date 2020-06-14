import moment from 'moment';
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

export function formatDate(date?: Date): string {
  if (!date) {
    return 'تعیین نشده!';
  }
  return moment(date).format('D MMM YYYY');
}

export function formatAccess(access?: string): string {
  switch (access) {
    case 'BIME_GOZAR':
      return 'بیمه گذار';
    case 'ADMIN':
      return 'مدیریت';
    case 'KARSHENAS':
      return 'کارشناس';
    default:
      return 'خطا';
  }
}

export function formatMoney(
  amount: any,
  currency = 'ریال',
  decimalCount = 0,
  decimal = '.',
  thousands = ',',
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i: any = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '') +
      currency
    );
  } catch (e) {
    console.log(e);
  }
}
