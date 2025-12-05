export const GroupTabLabel=['Service','Instance Type','Account ID','Usage Type','Platform','Region','Usage Type Group','Purchase Operation','API Opeation','Resources','Charge Type','Availbilityzone','Tenacncy','Legal Entity','Billing Entity']



export const dataSource = {
  chart: {
    caption: "Split of visitors by Channels",
    placevaluesinside: "1",
    showvalues: "0",
    plottooltext: "<b>$dataValue</b> visitors from $label in $seriesName",
    theme: "candy"
  },
  categories: [
    {
      category: [
        {
          label: "Organic"
        },
        {
          label: "Offline Stores"
        },
        {
          label: "Email Campaigns"
        },
        {
          label: "Social Events"
        },
        {
          label: "Paid Channels"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "2017",
      data: [
        {
          value: "17000"
        },
        {
          value: "19500"
        },
        {
          value: "12500"
        },
        {
          value: "14500"
        },
        {
          value: "17500"
        }
      ]
    },
    {
      seriesname: "2018",
      data: [
        {
          value: "25400"
        },
        {
          value: "29800"
        },
        {
          value: "21800"
        },
        {
          value: "19500"
        },
        {
          value: "21200"
        }
      ]
    }
  ],
};