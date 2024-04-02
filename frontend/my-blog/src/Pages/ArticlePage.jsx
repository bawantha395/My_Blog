import { useState, useEffect } from "react"; //useeffect loading data from server like lojical things
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

export default function ArticlePage() {
  const [articleInfo, setsArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setsArticleInfo(newArticleInfo);
    };
    loadArticleInfo(); 
  }, []);

  const article = articles.find((article) => article.name === articleId);

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      <p> this article has {articleInfo.upvotes} upvote(s)</p>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
}
