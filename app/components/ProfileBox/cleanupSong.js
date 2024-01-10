import Filter from "bad-words";

function cleanupSong(inputString) {
  try {
    // need try catch bc Filter doesnt account for chars outside of ASCII
    const filter = new Filter();
    filter.addWords("Kanye");
    const filteredTitle = filter.clean(inputString);
    if (filteredTitle.includes("*")) {
      return filteredTitle;
    }
  } catch (e) {
    console.log(e);
  }

  if (inputString.charAt(0) === "(" || inputString.charAt(0) === "[") {
    return inputString;
  }
  const firstOpeningParenthesisIndex = inputString.indexOf("(");
  const firstOpeningBracketIndex = inputString.indexOf("[");
  const firstHyphenIndex = inputString.indexOf("-");

  // Find the index of the first occurrence of either parentheses or brackets
  const index = Math.min(
    firstOpeningParenthesisIndex !== -1
      ? firstOpeningParenthesisIndex
      : Infinity,
    firstOpeningBracketIndex !== -1 ? firstOpeningBracketIndex : Infinity,
    firstHyphenIndex !== -1 ? firstHyphenIndex : Infinity
  );

  if (index !== -1 && index !== Infinity) {
    // If there is an opening parenthesis/bracket/hyphen
    return inputString.slice(0, index).trim();
  } else {
    // If there are no parentheses or brackets
    return inputString;
  }
}

export default cleanupSong;
