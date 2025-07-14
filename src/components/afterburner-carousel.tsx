"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

interface AfterburnerCarouselProps {
  backgrounds: string[];
}

export function AfterburnerCarousel({ backgrounds }: AfterburnerCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {backgrounds.map((bg, index) => (
            <CarouselItem key={index}>
              <div className="h-[500px] w-full overflow-hidden">
                <img
                  src={bg}
                  alt={`Background ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
