import { useEffect } from 'react';
import { useLocation } from 'react-router';


const HEADER_OFFSET = 90;

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {

    if (hash) {
      const targetId = hash.replace('#', '');


      const timeoutId = setTimeout(() => {
        const element = document.getElementById(targetId);

        if (element) {

          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - HEADER_OFFSET;

          window.scrollTo( {
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }


    window.scrollTo( {
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
