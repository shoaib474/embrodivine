import { useState } from "react";
import { Star, X } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/navigation";

const reviews = [
  {
    rating: 5,
    title: "Amazing Embroidery Quality",
    description:
      "The embroidery designs stitched perfectly on my machine. Every detail was clean and professional. The download process was simple and customer support was incredibly helpful whenever I had questions.",
    author: "John Smith",
    source: "Facebook",
  },
  {
    rating: 5,
    title: "Fast Delivery",
    description:
      "I requested a custom digitizing order and received the files much faster than expected. The quality exceeded my expectations and the stitches were extremely smooth.",
    author: "Sarah Johnson",
    source: "Google",
  },
  {
    rating: 5,
    title: "Professional Service",
    description:
      "I've worked with many embroidery providers and EmbroDivine stands out. The files were perfectly optimized and required no modifications before production.",
    author: "Michael Brown",
    source: "Trustpilot",
  },
  {
    rating: 5,
    title: "Highly Recommended",
    description:
      "Excellent communication, beautiful embroidery designs, and very quick support responses. Definitely my go-to place for embroidery files.",
    author: "Emily Davis",
    source: "Facebook",
  },
];

const ReviewSection = () => {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <>
      <section className="bg-[#101010] py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Trusted by thousands of happy customers
            </h2>

            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Don’t just believe us… see what others say
            </p>
          </div>

          {/* Slider */}
          <Swiper
            modules={[Autoplay, Pagination, Mousewheel, Navigation]}
            navigation
            loop={true}
            spaceBetween={16}
            mousewheel={{
              forceToAxis: false,
              sensitivity: 1,
              releaseOnEdges: true,
              thresholdDelta: 50,
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div
                  className="
                    bg-[#222222]
                    rounded-lg
                    p-8
                    min-h-[450px]
                    max-w-[350px] mx-auto
                    flex
                    flex-col
                    transition-all
                    duration-300
                    text-center
                  "
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6 m-auto">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-6">
                    {review.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 line-clamp-5 flex-grow leading-8">
                    {review.description}
                  </p>

                  {/* See More */}
                  <button
                    onClick={() => setSelectedReview(review)}
                    className="text-yellow-500 font-medium mt-6 hover:underline m-auto"
                  >
                    See More
                  </button>

                  {/* Footer */}
                  <div className="border-t border-white/10 pt-5 mt-5">
                    <p className="font-semibold text-white">{review.author}</p>

                    <span
                      className="
                        inline-block
                        mt-3
                        px-3
                        py-1
                        rounded-full
                        bg-yellow-500/10
                        text-yellow-500
                        text-xs
                        font-medium
                      "
                    >
                      {review.source}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Modal */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
          <div className="bg-[#1F1F1F] max-w-xl w-full rounded-3xl p-8 relative border border-yellow-500/20">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              <X size={22} />
            </button>

            <div className="flex gap-1 mb-4">
              {[...Array(selectedReview.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-500 text-yellow-500"
                />
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedReview.title}
            </h3>

            <p className="text-gray-300 leading-8">
              {selectedReview.description}
            </p>

            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="font-semibold text-white">
                {selectedReview.author}
              </p>

              <span className="text-yellow-500 text-sm">
                {selectedReview.source}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewSection;
