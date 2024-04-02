import { useState, useEffect } from "react"; //useeffect loading data from server like lojical things
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

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

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setsArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <AddCommentForm articleName={articleId } onArticleUpdated={ updatedArticle => setsArticleInfo(updatedArticle)}/>
      <CommentsList comments={articleInfo.comments} />
    </>
  );
}
