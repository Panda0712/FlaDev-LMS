import StarImg from "~/assets/images/star.png";
import Button from "~/components/Button/Button";
import Star from "~/components/Star/Star";

const CourseReviews = ({ courseInfo }) => {
  return (
    <section className="py-[32px]">
      <h3 className="text-[20px] font-semibold">Đánh giá học viên</h3>

      <div className="flex gap-5 justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 py-[24px]">
            <div className="flex items-center gap-2">
              <img src={StarImg} className="w-[20px] h-[20px]" alt="" />
              <span className="text-[20px] leading-1 mt-[2px] font-semibold">
                4.6
              </span>
            </div>
            <p className="text-[18px] leading-1 mt-[4px] font-semibold text-[#555555]">
              100.000 đánh giá
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={5} />
            <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
              90%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={4} />
            <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
              85%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={3} />
            <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
              40%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={2} />
            <p className="text-[18px] font-medium leading-1 mt-[4px] text-[#555555]">
              10%
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Star value={1} />
            <p className="text-[18px] font-medium text-[#555555]">5%</p>
          </div>
        </div>

        <div className="relative flex flex-col gap-[16px] basis-[60%]">
          {courseInfo?.reviews?.map((review, index) => (
            <div
              key={index}
              className="rounded-[16px] border border-slate-200 p-[24px] flex items-start justify-between gap-5 basis-[100%]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review?.avatar}
                  className="w-[60px] h-[60px] object-cover"
                  alt=""
                />
                <span className="text-[20px] font-semibold">
                  {review?.name}
                </span>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <img src={StarImg} className="w-[20px] h-[20px]" alt="" />
                    <span className="text-[20px] font-semibold leading-1 mt-[4px]">
                      {review?.rating}
                    </span>
                  </div>

                  <p className="text-[#555555] font-medium mt-[3px]">
                    Đánh giá vào {review?.reviewedAt}
                  </p>
                </div>

                <p className="max-w-xl font-medium text-[#334155]">
                  {review?.content}
                </p>
              </div>
            </div>
          ))}

          <Button
            title="Hiện thêm đánh giá"
            type="secondary"
            style="max-w-[180px] py-3 rounded-[8px] border border-[#0f172a] mt-2"
          />
        </div>
      </div>
    </section>
  );
};

export default CourseReviews;
