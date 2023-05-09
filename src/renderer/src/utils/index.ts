export const genUid = (function () {
  const soup =
    '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return (length: number = 20) => {
    const soupLength = soup.length;
    const id = [];
    for (let i = 0; i < length; i++) {
      id[i] = soup.charAt(Math.random() * soupLength);
    }
    return id.join('');
  };
})();

export const throttle = (fn: Function, delay: number = 100) => {
  let timer: NodeJS.Timeout | null = null;
  return (...params: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...params);
        timer = null;
      }, delay);
    }
  };
};
