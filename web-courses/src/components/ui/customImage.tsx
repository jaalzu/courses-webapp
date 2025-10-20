// src/components/ui/CustomImage.tsx
import Image, { ImageProps } from "next/image";
import React from "react";

type Props = Omit<ImageProps, "alt"> & {
  alt: string; 
  className?: string;
};

export function CustomImage({ className = "", alt, ...props }: Props) {
  return (
    <Image
      {...props}
      alt={alt}
      quality={90}
      loading={props.priority ? "eager" : "lazy"} 
      className={`${className}`}
    />
  );
}
