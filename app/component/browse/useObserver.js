import { useEffect } from "react"

  export const useObserver = ({
      target,
      onIntersect,
      root = null,
      rootMargin = "150px", 
      threshold = 1.0, 
  }) => {
      useEffect(() => {
          let observer

          if (target && target.current) {
              observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
              observer.observe(target.current)
          }

          // observer를 사용하는 컴포넌트가 해제되면 observer 역시 꺼 주자. 
          return () => observer && observer.disconnect()
      }, [target, rootMargin, threshold])
  }