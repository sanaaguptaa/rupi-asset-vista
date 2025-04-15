
export interface AssetData {
  assetClass: string;
  verifiedAmount: number;
  outOfScopeAmount: number;
  assetWriteoffAmount: number;
  soldOutAmount: number;
  grandTotal: number;
}

// Based on the data in the provided image
export const assetData: AssetData[] = [
  {
    assetClass: "Building",
    verifiedAmount: 2939536813,
    outOfScopeAmount: 2254321,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 2962113134
  },
  {
    assetClass: "Computer",
    verifiedAmount: 238815549,
    outOfScopeAmount: 0,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 238815549
  },
  {
    assetClass: "IT & EF",
    verifiedAmount: 1061052835,
    outOfScopeAmount: 843218853,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 1904271688
  },
  {
    assetClass: "Intangible",
    verifiedAmount: 192459937,
    outOfScopeAmount: 0,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 192459937
  },
  {
    assetClass: "Land",
    verifiedAmount: 2710767059,
    outOfScopeAmount: 2203011605,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 4913778664
  },
  {
    assetClass: "Moulds",
    verifiedAmount: 0,
    outOfScopeAmount: 6215477091,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 6215477091
  },
  {
    assetClass: "OE",
    verifiedAmount: 2245719,
    outOfScopeAmount: 5900869,
    assetWriteoffAmount: 31561870,
    soldOutAmount: 0,
    grandTotal: 315143575
  },
  {
    assetClass: "Others",
    verifiedAmount: 60335993,
    outOfScopeAmount: 0,
    assetWriteoffAmount: 0,
    soldOutAmount: 0,
    grandTotal: 60335993
  },
  {
    assetClass: "P&M",
    verifiedAmount: 3733243329,
    outOfScopeAmount: 330582310,
    assetWriteoffAmount: 0,
    soldOutAmount: 8340261,
    grandTotal: 4147720800
  },
  {
    assetClass: "Vehicles",
    verifiedAmount: 2923456470,
    outOfScopeAmount: 0,
    assetWriteoffAmount: 0,
    soldOutAmount: 438147686,
    grandTotal: 3416652356
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
