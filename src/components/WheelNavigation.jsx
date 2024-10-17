import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const routeOrder = [
  { path: "/" },
  { path: "/introduction" },
  { path: "/function" },
  { path: "/reviews" },
  { path: "/support" },
  { path: "/afterburner" },
];

const WheelNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleWheel = (event) => {
      const currentIndex = routeOrder.findIndex(
        (route) => route.path === location.pathname,
      );

      if (event.deltaY > 0 && currentIndex < routeOrder.length - 1) {
        navigate(routeOrder[currentIndex + 1].path);
      }
      if (event.deltaY < 0 && currentIndex > 0) {
        navigate(routeOrder[currentIndex - 1].path);
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [location, navigate]);

  return null;
};

export default WheelNavigation;
