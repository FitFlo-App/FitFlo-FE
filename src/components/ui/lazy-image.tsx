import React, { useState, useEffect } from "react";

interface LazyImageProps {
  alt: string;
  className?: string;
  height?: number | string;
  placeholderClassName?: string;
  src: string;
  style?: React.CSSProperties;
  width?: number | string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  alt,
  className = "",
  height,
  placeholderClassName = "",
  src,
  style = {},
  width,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Create a new image object
    const img = new Image();
    
    // Set up loading event
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    // Start loading the image
    img.src = src;
    
    // Clean up
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <>
      {!isLoaded && (
        <div
          className={`bg-gray-200 animate-pulse ${placeholderClassName || className}`}
          style={{
            width: width || "100%",
            height: height || "100%",
            ...style,
          }}
        />
      )}
      {imageSrc && (
        <img
          alt={alt}
          className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"}`}
          height={height}
          loading="lazy"
          src={imageSrc}
          style={{
            transition: "opacity 0.3s ease-in-out",
            ...style,
            display: isLoaded ? "block" : "none",
          }}
          width={width}
        />
      )}
    </>
  );
};

export default LazyImage;
