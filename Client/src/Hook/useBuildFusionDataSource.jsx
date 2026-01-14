import { useMemo } from "react";

// "01-2025" -> "Jan 2025"
const formatMonthLabel = (key) => {
  const [month, year] = key.split("-");
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${monthNames[parseInt(month,10)-1]} ${year}`;
};

const useBuildFusionDataSource = (costdata) => {
  return useMemo(() => {
    if (!Array.isArray(costdata) || costdata.length === 0) return null;

    // 🔹 Get month keys dynamically from monthCost
    const monthKeys = Object.keys(costdata[0].monthCost || {});

    return {
      chart: {
        xaxisname: "Months",
        yaxisname: "Cost (in $)",
        theme: "gammel",
        drawcrossline: "1",
        formatnumberscale: "0"
      },

      categories: [
        {
          category: monthKeys.map(k => ({
            label: formatMonthLabel(k)
          }))
        }
      ],

      dataset: costdata.map(row => ({
        seriesname: row.type, // AWS Lambda, EC2, etc
        data: monthKeys.map(k => ({
          value: row.monthCost?.[k] || 0
        }))
      }))
    };
  }, [costdata]);
};

export default useBuildFusionDataSource;
