import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import MainPage from "./pages/MainPage";
import Introduction from "./pages/Introduction";
import Functions from "./pages/Functions";
import Reviews from "./pages/Reviews";
import Support from "./pages/Support";
import Afterburner from "./pages/Afterburner";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { selectStatus } from "./features/dataSlice";

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
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const status = useSelector(selectStatus);
  const [isPreRendered, setIsPreRendered] = useState(false);

  const throttleRef = useRef(false);

  useEffect(() => {
    const currentIndex = routeOrder.findIndex(
      (route) => route.path === location.pathname,
    );

    if (currentIndex !== -1) {
      setCurrentPageIndex(currentIndex);
    }
  }, [location.pathname]);

  const handlePageChange = (direction) => {
    if (throttleRef.current) return;

    if (direction === "down" && currentPageIndex < routeOrder.length - 1) {
      setIsScrollingDown(true);
      setCurrentPageIndex((prev) => prev + 1);
      navigate(routeOrder[currentPageIndex + 1].path);
    } else if (direction === "up" && currentPageIndex > 0) {
      setIsScrollingDown(false);
      setCurrentPageIndex((prev) => prev - 1);
      navigate(routeOrder[currentPageIndex - 1].path);
    }

    throttleRef.current = true;

    setTimeout(() => {
      throttleRef.current = false;
    }, 1500);
  };

  const handleScroll = (event) => {
    if (event.deltaY > 0) {
      handlePageChange("down");
    } else {
      handlePageChange("up");
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handlePageChange("down"),
    onSwipedDown: () => handlePageChange("up"),
    trackMouse: true,
  });

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
    <div {...swipeHandlers} className="app-container">
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
