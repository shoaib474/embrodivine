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
    title: "High-Quality Digitizing Files",
    description:
      "The digitizing files were extremely clean and well-structured. Every detail was accurate and ready to use without any adjustments.",
    author: "Muhammad Haris",
    source: "Facebook",
  },
  {
    rating: 5,
    title: "Fast File Delivery",
    description:
      "I received my vector file much faster than expected. The quality and accuracy exceeded my expectations.",
    author: "Sarah Johnson",
    source: "Google",
  },
  {
    rating: 5,
    title: "Professional Service",
    description:
      "Very professional service with perfectly prepared digitizing files that worked smoothly in my workflow.",
    author: "Michael Brown",
    source: "Trustpilot",
  },
  {
    rating: 5,
    title: "Highly Recommended",
    description:
      "Great communication, accurate digitizing work, and quick response time. Highly recommended for design file services.",
    author: "Emily Davis",
    source: "Facebook",
  },
];

const ReviewSection = () => {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <>
      <section className="bg-[#F5F7FC] py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-[#222222] mt-4">
              Trusted by thousands of happy customers
            </h2>

            <p className="text-[#333333] mt-4 max-w-2xl mx-auto">
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
                    bg-white
                    border border-gray-100
                    shadow-sm
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
                        className="fill-[#ff9d00] text-[#ff9d00]"
                      />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#184d7a] mb-6">
                    "{review.title}"
                  </h3>

                  {/* Description */}
                  <p className="text-[#333333] line-clamp-5 flex-grow leading-8">
                    {review.description}
                  </p>

                  {/* See More */}
                  <button
                    onClick={() => setSelectedReview(review)}
                    className="text-[#007BFF] font-medium mt-6 hover:underline m-auto"
                  >
                    See More
                  </button>

                  {/* Footer */}
                  <div className="border-t border-gray-100 pt-5 mt-5">
                    <p className="font-semibold text-[#222222]">
                      {review.author}
                    </p>

                    <span
                      className="
                        inline-block
                       
                        px-3
                       
                       
                        text-[#007BFF]
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
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-white max-w-xl w-full rounded-3xl p-8 relative border border-gray-200">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#007BFF] cursor-pointer transition-colors"
            >
              <X size={22} />
            </button>

            <div className="flex gap-1 mb-4">
              {[...Array(selectedReview.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-[#ff9d00] text-[#ff9d00]"
                />
              ))}
            </div>

            <h3 className="text-2xl font-bold text-[#184d7a] mb-4">
              "{selectedReview.title}"
            </h3>

            <p className="text-[#333333] leading-8">
              {selectedReview.description}
            </p>

            <div className="mt-8 border-t border-gray-100 pt-4">
              <p className="font-semibold text-[#222222]">
                {selectedReview.author}
              </p>

              <span className="text-[#007BFF] text-sm">
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
