import { Link } from "react-router-dom";
import FacebookIcon from "~/assets/facebook.svg?react";
import InstagramIcon from "~/assets/instagram.svg?react";
import TwitterIcon from "~/assets/twitter.svg?react";
import Logo from "/logo.jpg";

const Footer = () => {
  const iconStyle = "w-6 h-6 cursor-pointer transition hover:opacity-70";
  const listItemStyle =
    "md:text-[18px] text-[16px] text-[#555555] font-semibold mt-4 transition hover:opacity-80";

  return (
    <footer className="pt-8 px-8 bg-[#f5f5f5] border-t border-slate-300">
      <div className="flex flex-wrap gap-8 justify-between border-b border-slate-300 pt-6 py-16">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <img src={Logo} className="w-10 h-10 object-cover" alt="" />
            <h2 className="md:text-[24px] text-[20px] font-semibold">FlaDev</h2>
          </div>

          <h3 className="max-w-[350px] text-[#333333]">
            FlaDev là môi trường học tập trực tuyến chất lượng với đội ngũ giảng
            viên dày dặn kinh nghiệm và đam mê trong việc dẫn dắt thế hệ trẻ.
            Hàng chục khóa học lập trình hữu ích sẽ đưa bạn đến với sự nghiệp
            đỉnh cao trong ngành IT.
          </h3>
        </div>
        <ul>
          <h2 className="md:text-[20px] text-[18px] font-bold mb-7">
            Khám phá
          </h2>
          <Link to="/courses">
            <li className={listItemStyle}>Khóa học</li>
          </Link>
          <Link to="/blog">
            <li className={listItemStyle}>Bài viết</li>
          </Link>
          <Link to="/contact">
            <li className={listItemStyle}>Liên hệ</li>
          </Link>
          <Link to="/about">
            <li className={listItemStyle}>Giới thiệu</li>
          </Link>
        </ul>
        <ul>
          <h2 className="md:text-[20px] text-[18px] font-bold mb-7">
            Lập trình
          </h2>
          <Link to="/courses">
            <li className={listItemStyle}>Web Development</li>
          </Link>
          <Link to="/courses">
            <li className={listItemStyle}>App Development</li>
          </Link>
          <Link to="/courses">
            <li className={listItemStyle}>Java</li>
          </Link>
          <Link to="/courses">
            <li className={listItemStyle}>Python</li>
          </Link>
          <Link to="/courses">
            <li className={listItemStyle}>C++</li>
          </Link>
        </ul>
        <ul>
          <h2 className="md:text-[20px] text-[18px] font-bold mb-7">
            Liên hệ với chúng tôi
          </h2>
          <li className="max-w-[400px] text-[#555555] mb-4">
            Địa chỉ: 280 An Dương Vương, phường 4, quận 5, TPHCM
          </li>
          <li className="max-w-[400px] text-[#555555]">
            Số điện thoại: (+84) 369332842
          </li>
          <li className="max-w-[400px] text-[#555555]">
            Email: fladev@gmail.com
          </li>

          <div className="flex items-center gap-3 mt-3">
            <Link to="https://www.facebook.com/">
              <FacebookIcon className={`${iconStyle} fill-[#4267B2]`} />
            </Link>
            <Link to="https://www.x.com/">
              <TwitterIcon className={`${iconStyle} fill-[#1DA1F2]`} />
            </Link>
            <Link to="https://www.instagram.com/">
              <InstagramIcon className={`${iconStyle} fill-[#C13584]`} />
            </Link>
          </div>
        </ul>
      </div>
      <div className="text-center py-8">
        <p className="text-[#555555]">
          Copyright © 2025 FlaDev LMS | Phát triển bởi PandaTeam
        </p>
      </div>
    </footer>
  );
};

export default Footer;
