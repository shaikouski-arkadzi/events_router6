export const loader = () => {
  return JSON.parse(localStorage.getItem('user'));
};
