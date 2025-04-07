import ExampleAvatar from "~/assets/images/example-avatar.png";
import NavigationText from "~/components/NavigationText/NavigationText";
import CartCard from "~/pages/Cart/CartCard/CartCard";
import CartDetails from "~/pages/Cart/CartDetails/CartDetails";

const cartInfo = [
  {
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZdgcqM3lVd1LrdxnV-0NAsHPJO3hGXhTIIvWDenmqOJJ5Y80A1z_x8tSqcim-ht-21Oum43KXU0QgEGFelh9jZOpJpHwhRvwaJW7Jt5t0yMvGeqlEbcGkYYu7W17gS8XdXr8yjH-U0mOCd3BMOTKncpI9B8i0ZB83gJhzq0spVVqqgtVTmhd71jau/s320-rw/4406786_4821_2.jpg",
    instructor: "John Smilga",
    instructorRole: "Software Engineer",
    instructorDescription:
      "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
    courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
    description:
      "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
    duration: "20.5 hours",
    students: 19387,
    price: 1949000,
    discount: 0,
    courseModule: [
      { title: "Introduction to UX Design", lessons: 5, duration: "1 hour" },
      {
        title: "Basics of User-Centered Design",
        lessons: 5,
        duration: "1 hour",
      },
      { title: "Elements of User Experience", lessons: 5, duration: "1 hour" },
      { title: "Visual Design Principles", lessons: 5, duration: "1 hour" },
    ],
    reviews: [
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
    ],
  },
  {
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZdgcqM3lVd1LrdxnV-0NAsHPJO3hGXhTIIvWDenmqOJJ5Y80A1z_x8tSqcim-ht-21Oum43KXU0QgEGFelh9jZOpJpHwhRvwaJW7Jt5t0yMvGeqlEbcGkYYu7W17gS8XdXr8yjH-U0mOCd3BMOTKncpI9B8i0ZB83gJhzq0spVVqqgtVTmhd71jau/s320-rw/4406786_4821_2.jpg",
    instructor: "John Smilga",
    instructorRole: "Software Engineer",
    instructorDescription:
      "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
    courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
    description:
      "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
    duration: "20.5 hours",
    students: 19387,
    price: 1949000,
    discount: 0,
    courseModule: [
      { title: "Introduction to UX Design", lessons: 5, duration: "1 hour" },
      {
        title: "Basics of User-Centered Design",
        lessons: 5,
        duration: "1 hour",
      },
      { title: "Elements of User Experience", lessons: 5, duration: "1 hour" },
      { title: "Visual Design Principles", lessons: 5, duration: "1 hour" },
    ],
    reviews: [
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
    ],
  },
  {
    thumbnail:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZdgcqM3lVd1LrdxnV-0NAsHPJO3hGXhTIIvWDenmqOJJ5Y80A1z_x8tSqcim-ht-21Oum43KXU0QgEGFelh9jZOpJpHwhRvwaJW7Jt5t0yMvGeqlEbcGkYYu7W17gS8XdXr8yjH-U0mOCd3BMOTKncpI9B8i0ZB83gJhzq0spVVqqgtVTmhd71jau/s320-rw/4406786_4821_2.jpg",
    instructor: "John Smilga",
    instructorRole: "Software Engineer",
    instructorDescription:
      "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
    courseName: "MERN Stack Course 2023 - MongoDB, Express, React and NodeJS",
    description:
      "This course is meticulously crafted to provide you with a foundational understanding of the principles, methodologies, and tools that drive exceptional user experiences in the digital landscape.",
    duration: "20.5 hours",
    students: 19387,
    price: 1949000,
    discount: 0,
    courseModule: [
      { title: "Introduction to UX Design", lessons: 5, duration: "1 hour" },
      {
        title: "Basics of User-Centered Design",
        lessons: 5,
        duration: "1 hour",
      },
      { title: "Elements of User Experience", lessons: 5, duration: "1 hour" },
      { title: "Visual Design Principles", lessons: 5, duration: "1 hour" },
    ],
    reviews: [
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
      {
        avatar: ExampleAvatar,
        name: "John Doe",
        reviewedAt: "22/3/2024",
        rating: 5,
        content:
          "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.",
      },
    ],
  },
];

const Cart = () => {
  return (
    <section>
      <NavigationText placeTo="Giỏ hàng" />
      <div className="px-28 pt-[32px] pb-[90px] relative">
        <h3 className="text-[32px] font-semibold mb-1">Giỏ hàng</h3>
        <p className="mb-[24px] font-medium text-[#555555]">
          3 khóa học trong giỏ hàng
        </p>

        <div className="flex justify-between gap-12">
          <div className="flex flex-col gap-5 basis-[calc(70%-24px)]">
            {cartInfo.map((cartItem, index) => (
              <CartCard key={index} cartItem={cartItem} />
            ))}
          </div>

          <CartDetails />
        </div>
      </div>
    </section>
  );
};

export default Cart;
