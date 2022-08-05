export default function (articleList = [], action) {
  console.log("🚀 ~ file: article.reducer.js ~ line 2 ~ action", action);
  if (action.type === "addArticle") {
    var tmpArticles = [...articleList];
    if (tmpArticles.find((element) => element.title === action.article.title))
      return tmpArticles;
    tmpArticles.push(action.article);
    return tmpArticles;
  }
  if (action.type === "addArticles") {
    return action.articles;
  }
  if (action.type === "removeArticle") {
    var tmpArticles = [...articleList];
    tmpArticles.splice(
      tmpArticles.findIndex((element) => element.title === action.articleTitle),
      1
    );
    return tmpArticles;
  }
  return articleList;
}
