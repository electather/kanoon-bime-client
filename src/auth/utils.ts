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
