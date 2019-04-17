export const getStorage = (name: string) => {
  if (!name) {
    return;
  }
  return window.localStorage.getItem(name);
};

export const setStorage = (name: string, content: any) => {
  if (!name) {
    return;
  }
  content = typeof content === 'string' ? content : JSON.stringify(content);
  window.localStorage.setItem(name, content);
};
