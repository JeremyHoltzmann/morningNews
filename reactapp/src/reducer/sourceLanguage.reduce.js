export default function (language = "fr", action) {
  if (action.type === "changeLanguage") {
    if (!action.language) return language;
    return action.language;
  }
  return language;
}
