import { detailsInfo } from "~/pages/Homepage/Details/constants";

const Details = () => {
  return (
    <section className="px-28 my-[45px] flex items-center gap-[30px]">
      {detailsInfo.map((item) => (
        <div
          key={item.heading}
          className="basis-[calc(25%-15px)] text-center flex flex-col items-center justify-center bg-[#f5f5f5] rounded-[20px] min-h-[181px]"
        >
          <h3 className="text-[32px] font-semibold text-[#ff782d]">
            {item.heading}
          </h3>
          <p className="text-[18px] font-semibold">{item.subHeading}</p>
        </div>
      ))}
    </section>
  );
};

export default Details;
