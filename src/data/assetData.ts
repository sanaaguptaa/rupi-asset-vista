export interface AssetData {
  assetClass: string;
  verifiedAmount: number;
  outOfScopeAmount: number;
  assetWriteoffAmount: number;
  soldOutAmount: number;
  grandTotal: number;
  // Making these properties required instead of optional since they're used throughout the app
  assetName: string;
  assetId: string;
  assetType: string;
  department: string;
  purchaseDate: string;
  location: string;
  purchaseValue: number;
  status: string;
}

// Keep the existing asset data, already properly formatted with all fields

export const assetData: AssetData[] = [
  {
    assetClass: "Building",
    assetName: "Headquarters Building",
    assetId: "AST100001",
    assetType: "Buildings",
    department: "Corporate",
    purchaseDate: "2015-03-15",
    location: "Mumbai",
    status: "Active",
    verifiedAmount: 2939536813,
    outOfScopeAmount: 2254321,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 2962113134,
    purchaseValue: 2962113134
  },
  {
    assetClass: "Computer",
    assetName: "Server Infrastructure",
    assetId: "AST100002",
    assetType: "IT Assets",
    department: "IT",
    purchaseDate: "2020-06-22",
    location: "Delhi",
    status: "Active",
    verifiedAmount: 238815549,
    outOfScopeAmount: 0,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 238815549,
    purchaseValue: 238815549
  },
  {
    assetClass: "IT & EF",
    assetName: "Network Equipment",
    assetId: "AST100003",
    assetType: "IT Assets",
    department: "IT",
    purchaseDate: "2019-04-10",
    location: "Bangalore",
    status: "Active",
    verifiedAmount: 1061052835,
    outOfScopeAmount: 843218853,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 1904271688,
    purchaseValue: 1904271688
  },
  {
    assetClass: "Intangible",
    assetName: "Software Licenses",
    assetId: "AST100004",
    assetType: "Intangibles",
    department: "IT",
    purchaseDate: "2021-01-05",
    location: "Chennai",
    status: "Active",
    verifiedAmount: 192459937,
    outOfScopeAmount: 0,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 192459937,
    purchaseValue: 192459937
  },
  {
    assetClass: "Land",
    assetName: "Corporate Campus",
    assetId: "AST100005",
    assetType: "Land",
    department: "Real Estate",
    purchaseDate: "2010-07-30",
    location: "Hyderabad",
    status: "Active",
    verifiedAmount: 2710767059,
    outOfScopeAmount: 2203011605,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 4913778664,
    purchaseValue: 4913778664
  },
  {
    assetClass: "Moulds",
    assetName: "Production Moulds",
    assetId: "AST100006",
    assetType: "Plant & Machinery",
    department: "Manufacturing",
    purchaseDate: "2018-09-14",
    location: "Pune",
    status: "Under Maintenance",
    verifiedAmount: 0,
    outOfScopeAmount: 6215477091,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 6215477091,
    purchaseValue: 6215477091
  },
  {
    assetClass: "OE",
    assetName: "Office Equipment",
    assetId: "AST100007",
    assetType: "IT Assets",
    department: "Facilities",
    purchaseDate: "2022-02-18",
    location: "Kolkata",
    status: "Active",
    verifiedAmount: 2245719,
    outOfScopeAmount: 5900869,
    assetWriteoffAmount: 31561870,
    soldOutAmount: 0,
    grandTotal: 315143575,
    purchaseValue: 315143575
  },
  {
    assetClass: "Others",
    assetName: "Miscellaneous Assets",
    assetId: "AST100008",
    assetType: "Inventory",
    department: "Logistics",
    purchaseDate: "2021-11-30",
    location: "Jaipur",
    status: "Active",
    verifiedAmount: 60335993,
    outOfScopeAmount: 0,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 60335993,
    purchaseValue: 60335993
  },
  {
    assetClass: "P&M",
    assetName: "Manufacturing Equipment",
    assetId: "AST100009",
    assetType: "Plant & Machinery",
    department: "Manufacturing",
    purchaseDate: "2017-05-22",
    location: "Ahmedabad",
    status: "Active",
    verifiedAmount: 3733243329,
    outOfScopeAmount: 330582310,
    assetWriteoffAmount: 0,
    soldOutAmount: 8340261,
    grandTotal: 4147720800,
    purchaseValue: 4147720800
  },
  {
    assetClass: "Vehicles",
    assetName: "Fleet Vehicles",
    assetId: "AST100010",
    assetType: "Vehicles",
    department: "Transportation",
    purchaseDate: "2019-10-08",
    location: "Lucknow",
    status: "Active",
    verifiedAmount: 2923456470,
    outOfScopeAmount: 0,
    assetWriteoffAmount: 0,
    soldOutAmount: 438147686,
    grandTotal: 3416652356,
    purchaseValue: 3416652356
  }
];

// Summary data for the bottom row of the table
export const summaryData = {
  verifiedAmount: 14061914704,
  outOfScopeAmount: 9777883048,
  assetWriteoffAmount: 31561870,
  soldOutAmount: 8955933.947,
  grandTotal: 24366768787
};
