import FusionCharts from "fusioncharts";
import ReactFusioncharts from "react-fusioncharts"
import Charts from "fusioncharts/fusioncharts.charts";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy"
import GammelTheme from "fusioncharts/themes/fusioncharts.theme.gammel"
import UmberTheme from "fusioncharts/themes/fusioncharts.theme.umber"

export default ReactFusioncharts.fcRoot(
 FusionCharts,
 Charts,
 CandyTheme,
 GammelTheme,
 UmberTheme
);


export const GroupTabLabel=['Service','Instance Type','Usage Type','Platform','Region','Usage Type Group','Purchase Option','Resource','Tenancy','Legal Entity','Billing Entity']


export const dataSource = {
  chart: {
    xaxisname: "Months",
    yaxisname: "Cost (in $)",
    formatnumberscale: "1",
    plottooltext:
      "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
    theme: "gammel",
    drawcrossline: "1"
  },
  categories: [
    {
      category: [
        {
          label: "Jun 2025"
        },
        {
          label: "Jul 2025"
        },
        {
          label: "Aug 2025"
        },
        {
          label: "Sep 2025"
        },
        {
          label: "Oct 2025"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "CK Discounts",
      data: [
        {
          value: "1962576"
        },
        {
          value: "1798024"
        },
        {
          value: "1961897"
        },
        {
          value: "1903654"
        },
        {
          value: "1642759"
        }
      ]
    },
    {
      seriesname: "AWS Service",
      data: [
        {
          value: "2108450"
        },
        {
          value: "2469894"
        },
        {
          value: "2868084"
        },
        {
          value: "4229856"
        },
        {
          value: "3553050"
        }
      ]
    },
    {
      seriesname: "Amazon AppStore",
      data: [
        {
          value: "452054"
        },
        {
          value: "487083"
        },
        {
          value: "455873"
        },
        {
          value: "467823"
        },
        {
          value: "483328"
        }
      ]
    }
  ]
};