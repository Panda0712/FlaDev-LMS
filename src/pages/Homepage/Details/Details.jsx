import { detailsInfo } from "~/pages/Homepage/Details/constants";

const Details = () => {
  return (
    <section
      className="lg:px-28 md:px-24 sm:px-18 px-12 
    my-[45px] flex max-lg:flex-col max-lg:justify-center items-center gap-[30px]"
    >
      {detailsInfo.map((item) => (
        <div
          key={item.heading}
          className="basis-[calc(25%-15px)] max-lg:w-full 
          text-center flex flex-col items-center justify-center 
          bg-[#f5f5f5] rounded-[20px] lg:min-h-[181px] 
          md:min-h-[150px] sm:min-h-[120px] min-h-[100px]"
        >
          <h3
            className="lg:text-[32px] md:text-[28px] sm:text-[24px] text-[20px] 
          font-semibold text-[#ff782d]"
          >
            {item.heading}
          </h3>
          <p className="md:text-[18px] sm:text-[16px] text-[14px] font-semibold">
            {item.subHeading}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Details;
