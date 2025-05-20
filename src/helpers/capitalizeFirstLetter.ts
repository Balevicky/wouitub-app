export const capitalizeFirstLetter = (text: string): string => {
  if (!text) {
    return ""; // handles null or empty string input
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};
