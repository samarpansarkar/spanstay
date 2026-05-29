import { useInView } from "react-intersection-observer";

const useRevealAnimation = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return {
    ref,
    inView,
  };
};

export default useRevealAnimation;
