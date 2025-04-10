import NavigationText from "~/components/NavigationText/NavigationText";

const Courses = () => {
  return (
    <section>
      <NavigationText placeTo="Danh sách khóa học" />

      <div className="flex gap-[32px] items-start justify-between">
        <div>
          <div className="flex items-center justify-between gap-5"></div>
          <div></div>
        </div>
        <div className="flex flex-col gap-[32px]"></div>
      </div>
    </section>
  );
};

export default Courses;
