export default function (language = "fr", action) {
  if (action.type === "changeLanguage") {
    console.log("🚀 ~ file: user.reducer.js ~ line 2 ~ action", action);
    if (!action.language) return language;
    return action.language;
  }
  return language;
}
