import { useState, useEffect } from 'react';

interface ImageProps {
  alt: string;
  src: string;
  width?: number;
  height?: number;
  className?: string; // tailwind 클래스 외부에서 유연하게 전달할 수 있도록
  onClick?: () => void;
}

const Image = ({ src, alt, width, height, className, onClick }: ImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]); // src 변경될 경우 초기화

  return (
    <>
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-transform rounded-2xl ${className ?? ''}`}
        onClick={onClick}
      />
    </>
  );
};

export default Image;
