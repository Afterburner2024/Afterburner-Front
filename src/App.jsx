import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable"; // useSwipeable 훅 사용
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
  const navigate = useNavigate(); // useNavigate 훅 추가
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const status = useSelector(selectStatus);
  const [isPreRendered, setIsPreRendered] = useState(false);

  const handleScroll = (event) => {
    const deltaY = event.deltaY;

    if (deltaY > 0 && currentPageIndex < routeOrder.length - 1) {
      setIsScrollingDown(true); // 아래로 스크롤
      setCurrentPageIndex((prev) => prev + 1);
      navigate(routeOrder[currentPageIndex + 1].path); // 페이지 전환 추가
    } else if (deltaY < 0 && currentPageIndex > 0) {
      setIsScrollingDown(false); // 위로 스크롤
      setCurrentPageIndex((prev) => prev - 1);
      navigate(routeOrder[currentPageIndex - 1].path); // 페이지 전환 추가
    }
  };

  // 스와이프 위 (다음 페이지)
  const handleSwipedUp = () => {
    if (currentPageIndex < routeOrder.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      navigate(routeOrder[currentPageIndex + 1].path); // navigate로 페이지 전환
    }
  };

  // 스와이프 아래 (이전 페이지)
  const handleSwipedDown = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      navigate(routeOrder[currentPageIndex - 1].path); // navigate로 페이지 전환
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

  const swipeHandlers = useSwipeable({
    onSwipedUp: handleSwipedUp,
    onSwipedDown: handleSwipedDown,
    trackMouse: true, // 마우스 드래그로도 테스트 가능
  });

  if (isPreRendered) {
    return <Loading />;
  }

  return (
    <div {...swipeHandlers} className="app-container">
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
