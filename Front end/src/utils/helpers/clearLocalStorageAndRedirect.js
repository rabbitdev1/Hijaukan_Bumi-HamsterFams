export const clearLocalStorageAndRedirect = () => {
  const handleClick = (uri) => {
    setTimeout(() => {
      window.location.replace(uri);
    }, 100);
  };

  localStorage.removeItem("isLogin");
  localStorage.removeItem("isProfile");
  handleClick("/");
};
