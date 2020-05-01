export function clearToken(): void {
  localStorage.removeItem('token');
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
