function capitalizeFirstLetter(text) {
  const textFirstCapitalLetter = text.charAt(0).toUpperCase() + text.slice(1);
  return textFirstCapitalLetter;
}

export { capitalizeFirstLetter};
