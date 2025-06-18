import Slider from "react-slick";
import FeedbackCard from "@/components/commons/FeedbackCard";

const feedbacks = [
  {
    name: "Phuc D.",
    verified: true,
    content: 'I absolutely love this custom made skibidi toilet keycap set .',
    rating: 5,
  },
  {
    name: "Joe M.",
    verified: true,
    content: 'Your mother.”',
    rating: 5,
  },
  {
    name: "Ambatu K.",
    verified: true,
    content: 'This keycap set is so explosive!”',
    rating: 5,
  },
  {
    name: "Ambatu K.",
    verified: true,
    content: 'This keycap set is so explosive!”',
    rating: 5,
  },{
    name: "Ambatu K.",
    verified: true,
    content: 'This keycap set is so explosive!”',
    rating: 5,
  },{
    name: "Ambatu K.",
    verified: true,
    content: 'This keycap set is so explosive!”',
    rating: 5,
  }
  // ...add more feedbacks
];

export default function FeedbackSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    centerMode: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 0" }}>
      <h2 style={{ fontSize: 56, fontWeight: 700, marginBottom: 32, letterSpacing: 1 }}>
        OUR HAPPY CUSTOMERS
      </h2>
      <Slider {...settings} lazyLoad="anticipated">
        {feedbacks.map((fb, idx) => (
          <div key={idx}>
            <FeedbackCard {...fb} />
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .feedback-card {
          background: #fff;
          border: 1.5px solid #ececec;
          border-radius: 24px;
          padding: 32px 28px 32px 28px;
          min-height: 200px;
          margin: 0 12px;
          box-shadow: none;
          transition: box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .feedback-content {
          color: #444;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: calc(1.5em * 4);
        }
        .slick-slide > div {
          display: flex;
          height: 100%;
        }
        .slick-list {
          margin: 0 -12px;
        }
      `}</style>
    </div>
  );
}
