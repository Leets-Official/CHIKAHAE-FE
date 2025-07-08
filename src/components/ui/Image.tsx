//create Image component - 박민성

import { useState, useEffect } from 'react';

interface ImageProps {
  alt: string;
  src: string;
  width?: number;
  height?: number;
  fallbackSrc?: string; //image 파일 잘못된 경로 입력 시 보여줄 image
  className?: string; //tailwind 클래스 외부에서 유연하게 전달할 수 있도록
  style?: React.CSSProperties; // 부모에서 원하는 스타일 props로 전달하도록
  onClick?: () => void;
}

const Image = ({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/fallback.png',
  className,
  style,
  onClick,
}: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]); // src,fallbackSrc 변경될 경우, IsLoaded와 HasError의 값 false로 초기화

  return (
    <>
      {!isLoaded && !hasError && <div>Loading {alt}...</div>}
      {hasError && <div>이미지를 불러올 수 없습니다.</div>}
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-transform hover:scale-105 rounded-2xl ${className ?? ''}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          } else {
            setHasError(true);
          }
        }}
        onClick={onClick}
        style={{
          ...style,
          display: isLoaded && !hasError ? 'block' : 'none',
          transition: 'opacity 0.5s ease-in-out', //애니메이션 기능
          opacity: isLoaded ? 1 : 0,
        }}
      />
    </>
  );
};

export default Image;
