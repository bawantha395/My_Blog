import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import ArticlePage from "./Pages/ArticlePage";
import ArticlesListPage from "./Pages/ArticlesListPage";
import HomePage from "./Pages/HomePage";
import NavBar from "./NavBar";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticlesListPage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

//const response axios.get("http://localhost:8002/api/articles/learn-react");
//const data =response.data;
