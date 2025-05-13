import { Ellipsis } from "lucide-react";

const AdminTable = ({
  headers,
  data,
  renderRow,
  openOptions,
  handleToggleOptions,
  optionItems,
  tHeadStyle,
  optionStyle,
  responsiveStyle,
}) => {
  const defaultTHeadStyle =
    "font-medium border border-gray-200 px-4 py-2 md:text-[18px] sm:text-[16px] text-[14px] break-words whitespace-normal";
  const defaultOptionStyle =
    "py-[12px] px-[16px] transition hover:bg-slate-100 cursor-pointer";

  return (
    <table
      className={`table-fixed w-full ${responsiveStyle} border 
      border-gray-200 bg-white rounded-md shadow-sm my-8`}
    >
      <thead className="bg-gray-100">
        <tr className="text-center">
          {headers.map((header, index) => (
            <th
              key={index}
              className={`${tHeadStyle || defaultTHeadStyle} ${
                header.width ? header.width : ""
              }`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="text-center">
            {renderRow(item, index)}
            <td className={`${tHeadStyle || defaultTHeadStyle} relative`}>
              <div className="relative">
                <Ellipsis
                  size={18}
                  className="cursor-pointer mx-auto"
                  onClick={() => handleToggleOptions(index)}
                />

                {openOptions?.[index]?.open && (
                  <ul
                    className="w-[150px] bg-white shadow-md z-100
                    border border-slate-100 rounded-sm absolute bottom-[-calc(50%)] text-[14px] right-0"
                  >
                    {optionItems.map((option, optIndex) => (
                      <li
                        key={optIndex}
                        className={`${optionStyle || defaultOptionStyle} ${
                          optIndex < optionItems.length - 1
                            ? "border-b border-slate-200"
                            : ""
                        }`}
                        onClick={() => option.onClick(item)}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
