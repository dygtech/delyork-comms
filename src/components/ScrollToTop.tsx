import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position to the top of the page on every route change.
 * Works alongside Lenis smooth scrolling by resetting both native scroll
 * and Lenis's internal scroll position.
 * Also handles hash navigation - scrolls to the section if hash is present.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Reset native scroll immediately
    window.scrollTo(0, 0);

    // Also reset Lenis if it's managing scroll (it sets scroll on <html>)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Handle hash navigation - scroll to section if hash present
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Use setTimeout to ensure the page has rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
