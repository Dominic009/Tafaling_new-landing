interface ITokenLS {
  access_token: string;
  refresh_token: string;
}

export const getAccessToken = () => {
  return (
    JSON.parse(localStorage.getItem('auth-token') as string)?.accessT || ''
  );
};

export const getRefreshToken = () => {
  return (
    JSON.parse(localStorage.getItem('auth-token') as string)?.refreshT || ''
  );
};

export const setTokenInLS = (item: ITokenLS) => {
  localStorage.removeItem('auth-token');
  localStorage.setItem(
    'auth-token',
    JSON.stringify({
      accessT: item.access_token,
      refreshT: item.refresh_token,
    })
  );
};
