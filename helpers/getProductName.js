export const getProductName = (name) => {
  const newName = name.toLowerCase();

  return newName.charAt(0).toUpperCase() + newName.slice(1);
};
