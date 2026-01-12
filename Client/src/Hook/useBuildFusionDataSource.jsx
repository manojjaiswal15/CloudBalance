import { useMemo } from "react";

const formatMonthLabel = (key) => {
  const month = key.substring(0, 3);
  const year = key.substring(3);
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
};

const useBuildFusionDataSource = (costdata) => {
  return useMemo(() => {
    if (!Array.isArray(costdata) || costdata.length === 0) return null;

    const monthKeys = Object.keys(costdata[0])
      .filter(
        key =>
          key !== "type" &&
          key !== "total" &&
          typeof costdata[0][key] === "number"
      );

    return {
      chart: {
        xaxisname: "Months",
        yaxisname: "Cost (in $)",
        theme: "gammel",
        drawcrossline: "1",
        formatnumberscale: "0"
      },

      // 🔹 X-axis labels
      categories: [
        {
          category: monthKeys.map(k => ({
            label: formatMonthLabel(k)
          }))
        }
      ],

      // 🔹 Series = instance types
      dataset: costdata.map(row => ({
        seriesname: row.type,
        data: monthKeys.map(k => ({
          value: row[k] || 0
        }))
      }))
    };
  }, [costdata]);
};

export default useBuildFusionDataSource;
