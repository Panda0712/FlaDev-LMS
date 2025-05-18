import { useEffect, useState } from "react";
import { fetchCourses } from "~/apis/endpoints";

const useCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchCourses()
      .then((res) => {
        setCourses(res || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return { loading, courses };
};

export default useCourses;
