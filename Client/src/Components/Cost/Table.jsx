
const Table = ({costdata,type}) => {
    
  return (
  <div className="py-5">
    <table className='p-3 w-full border-gray-300 border'>
      <thead>
        <tr className='border-gray-300 border bg-gray-100 text-gray-500 text-center'>
          <th className='border-gray-300 border p-[5px] text-left pl-4'>{type}</th>
          <th className='border-gray-300 border p-[5px]'>Jan 2025</th>
          <th className='border-gray-300 border p-[5px]'>Feb 2025</th>
          <th className='border-gray-300 border p-[5px]'>Mar 2025</th>
          <th className='border-gray-300 border p-[5px]'>Apr 2025</th>
          <th className='border-gray-300 border p-[5px]'>May 2025</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        {costdata.map((item, index) => (
          <tr key={index}>
             <td className='border-gray-300 border font-semibold text-sm pl-4'>{item.type}</td>
             <td className='border-gray-300 border text-center text-sm p-1 text-gray-600'>${item.jan2025}</td>
             <td className='border-gray-300 border text-center text-sm p-1 text-gray-600'>${item.feb2025}</td>
             <td className='border-gray-300 border text-center text-sm p-1 text-gray-600'>${item.mar2025}</td>
             <td className='border-gray-300 border text-center text-sm p-1 text-gray-600'>${item.apr2025}</td>
              <td className='border-gray-300 border text-center text-sm p-1 text-gray-600'>${item.may2025}</td>
              <td className='border-gray-300 border text-center text-sm p-1 text-gray-600'>${item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default Table