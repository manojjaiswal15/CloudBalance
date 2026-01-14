import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';

const Table = ({ costdata, type }) => {
   const [isLoading,setIsLoading]=useState(false)

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).replace("_", " ");
  }

  const months = [
    { key: "01-2025", label: "Jan 2025" },
    { key: "02-2025", label: "Feb 2025" },
    { key: "03-2025", label: "Mar 2025" },
    { key: "04-2025", label: "Apr 2025" },
    { key: "05-2025", label: "May 2025" }
  ];

  useEffect(()=>{
    setIsLoading(true)

    setTimeout(()=>{
      setIsLoading(false)
    },500)
  },[type])

  const getTotal = (monthCost = {}) => Object.values(monthCost).reduce((sum, v) => sum + v, 0);
  type = capitalizeFirstLetter(type)

  return (
   isLoading ? <div className='flex items-center justify-center w-full mx-auto]'> <Loading/></div> :  <div className="py-5">
      <table className="p-3 w-full border border-gray-300">
        <thead>
          <tr className="border border-gray-300 bg-gray-100 text-gray-500 text-center">
            <th className="border border-gray-300 p-[5px] text-left pl-4">
              {type}
            </th>
            {months.map(m => (
              <th key={m.key} className="border border-gray-300 p-[5px]">
                {m.label}
              </th>
            ))}
            <th className="border border-gray-300 p-[5px]">Total</th>
          </tr>
        </thead>

        <tbody>
          { costdata.map((item) => {
            const total = getTotal(item.monthCost);

            return (
              <tr key={item.type}>
                <td className="border border-gray-300 font-semibold text-sm pl-4">
                  {item.type}
                </td>

                {months.map(m => (
                  <td
                    key={m.key}
                    className="border border-gray-300 text-center text-sm p-1 text-gray-600"
                  >
                    ${item.monthCost?.[m.key] ?? 0}
                  </td>
                ))}

                <td className="border border-gray-300 text-center text-sm p-1 font-semibold">
                  ${total}
                </td>
              </tr>
            )
          })  
        }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
