import { PrivateAnimationType } from "@/graphql/gql/graphql";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { Button } from "@mui/material";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type CarouselProps = {
  hasMore: boolean;
  fetchMore: () => void;
  onItemClicked: (animation: PrivateAnimationType) => () => void;
};

export type CarouselMethods = {
  reset: () => void;
  setData: (data: PrivateAnimationType[]) => void;
};

const Carousel = forwardRef<CarouselMethods, CarouselProps>(
  ({ onItemClicked, fetchMore, hasMore }, ref) => {
    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          setData([]);
          setReachedStart(true);
          setReachedEnd(false);
        },
        setData: (data: PrivateAnimationType[]) =>
          setData((prev) => prev.concat(data)),
      }),
      []
    );

    const scrollRef = useRef<HTMLUListElement>(null);
    const lastItemRef = useRef<HTMLLIElement>(null);
    const firstItemRef = useRef<HTMLLIElement>(null);

    const [data, setData] = useState<PrivateAnimationType[]>([]);
    const [reachedEnd, setReachedEnd] = useState(false);
    const [reachedStart, setReachedStart] = useState(true);

    const prev = () => () => {
      scrollRef.current?.scrollBy({
        left: -scrollRef.current?.offsetWidth,
        behavior: "smooth",
      });
    };

    const next = () => () => {
      setReachedStart(false);
      scrollRef.current?.scrollBy({
        left: scrollRef.current?.offsetWidth,
        behavior: "smooth",
      });
    };

    const setItemRef = useCallback(
      (index: number) => (element: HTMLLIElement) => {
        if (index === 0) {
          firstItemRef.current = element;
        } else if (index === data.length - 1) {
          lastItemRef.current = element;
        }
      },
      [data]
    );

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setReachedEnd(entry.isIntersecting);
          if (hasMore) {
            fetchMore();
          }
        },
        {
          rootMargin: "0px",
          threshold: 1.0,
        }
      );

      const currentLastItem = lastItemRef.current;
      if (currentLastItem) {
        observer.observe(currentLastItem);
      }

      return () => {
        if (currentLastItem) {
          observer.disconnect();
        }
      };
    }, [data, fetchMore, hasMore]);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setReachedStart(entry.isIntersecting);
        },
        {
          rootMargin: "0px",
          threshold: 1.0,
        }
      );

      const currentFirstItem = firstItemRef.current;
      if (currentFirstItem) {
        observer.observe(currentFirstItem);
      }

      return () => {
        if (currentFirstItem) {
          observer.disconnect();
        }
      };
    }, [reachedStart]);

    return (
      <>
        <ul ref={scrollRef} className="flex overflow-x-auto">
          {data.map((animation: PrivateAnimationType, index: number) => (
            <li
              ref={setItemRef(index)}
              key={index}
              className="w-52 aspect-square p-1 flex-shrink-0"
            >
              <DotLottiePlayer
                autoplay
                loop
                className="rounded-md overflow-hidden bg-white drop-shadow cursor-pointer hover:opacity-80 transform transition-transform duration-300 ease-in-out"
                src={animation.url}
                onClick={onItemClicked(animation)}
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-center space-x mt-2">
          <Button disabled={reachedStart} onClick={prev()}>
            Previous
          </Button>
          <Button disabled={reachedEnd} onClick={next()}>
            Next
          </Button>
        </div>
      </>
    );
  }
);

export default Carousel;
