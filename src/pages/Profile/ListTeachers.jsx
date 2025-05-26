import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "~/apis/endpoints";
import Input from "~/components/Input/Input";
import Loading from "~/components/Loading/Loading";
import TeacherCard from "~/pages/Profile/TeacherCard/TeacherCard";
import { ACCOUNT_ROLES } from "~/utils/constants";

const ListTeachers = () => {
  const [adminProfile, setAdminProfile] = useState([]);
  const [loading, setLoading] = useState(false);

  const admin = adminProfile.find((user) => user.role === ACCOUNT_ROLES.ADMIN);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile()
      .then((res) => {
        console.log(res);
        setAdminProfile(res || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="w-full pb-[90px]">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="md:text-[24px] text-[20px] font-semibold">Giảng viên</h3>
        <span className="md:text-[18px] text-[16px] font-semibold">(1)</span>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="relative">
          <Input
            name="name"
            content="Tìm giảng viên"
            icon={
              <Search className="absolute right-2 top-[50%] transform translate-y-[-50%]" />
            }
          />
        </div>
      </div>

      <div
        className="relative mt-5 grid lg:grid-cols-3 md:grid-cols-2 
      max-[500px]:grid-cols-1! max-sm:grid-cols-2 gap-[20px]"
      >
        <TeacherCard teacher={admin} />
      </div>
    </section>
  );
};

export default ListTeachers;
