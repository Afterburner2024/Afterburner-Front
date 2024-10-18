import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector } from "react-redux";
import MainPage from "./pages/MainPage";
import Introduction from "./pages/Introduction";
import Functions from "./pages/Functions";
import Reviews from "./pages/Reviews";
import Support from "./pages/Support";
import Afterburner from "./pages/Afterburner";
import WheelNavigation from "./components/WheelNavigation";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { selectStatus } from "./features/dataSlice"; // 로딩 상태 선택자 추가

import "./assets/css/app.css";

const routeOrder = [
  { path: "/", element: <MainPage /> },
  { path: "/introduction", element: <Introduction /> },
  { path: "/function", element: <Functions /> },
  { path: "/reviews", element: <Reviews /> },
  { path: "/support", element: <Support /> },
  { path: "/afterburner", element: <Afterburner /> },
];

function App() {
  const location = useLocation();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const status = useSelector(selectStatus);
  const [isPreRendered, setIsPreRendered] = useState(false);

  const handleScroll = (event) => {
    const deltaY = event.deltaY;

    if (deltaY > 0 && currentPageIndex < routeOrder.length - 1) {
      setIsScrollingDown(true); // 아래로 스크롤
      setCurrentPageIndex((prev) => prev + 1);
    } else if (deltaY < 0 && currentPageIndex > 0) {
      setIsScrollingDown(false); // 위로 스크롤
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentPageIndex]);

  useEffect(() => {
    if (status === "loading") {
      setIsPreRendered(true);
    }
  }, [status]);

  useEffect(() => {
    if (status !== "loading" && isPreRendered) {
      const preRenderTimer = setTimeout(() => {
        setIsPreRendered(false);
      }, 2000);

      return () => clearTimeout(preRenderTimer);
    }
    return undefined;
  }, [status, isPreRendered]);

  if (isPreRendered) {
    return <Loading />;
  }

  return (
    <div className="app-container">
      <WheelNavigation />
      <Header />
      {location.pathname !== "/" ? <Navigation /> : null}
      <TransitionGroup className="page-wrapper bg-mainBg">
        <CSSTransition
          key={location.pathname}
          timeout={0}
          classNames={isScrollingDown ? "slide-down" : "slide-up"}
        >
          <Routes location={location}>
            {routeOrder.map((route, index) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <div className={`section section-${index}`}>
                    {route.element}
                  </div>
                }
              />
            ))}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

export default App;
