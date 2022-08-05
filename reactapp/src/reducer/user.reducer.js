export default function (token = "", action) {
  if (action.type === "signin") {
    return action.token;
  }
  return token;
}
