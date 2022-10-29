const saveToken = (token) => {
  localStorage.setItem("id_token", token);
};

export { saveToken };
