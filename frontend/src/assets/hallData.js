 
 // Helper function
const createSeats = (prefix, count, booked = []) =>
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    available: !booked.includes(i + 1),
  }));

const hallsData = [
  {
    id: 1,
    name: "Hall 1",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H1T1", label: "Table 1", leftSeats: createSeats("A", 4, [2]), rightSeats: createSeats("B", 4, [4]) },
          { tableId: "H1T2", label: "Table 2", leftSeats: createSeats("C", 4, [1]), rightSeats: createSeats("D", 4, []) },
          { tableId: "H1T3", label: "Table 3", leftSeats: createSeats("E", 4, []), rightSeats: createSeats("F", 4, [3]) },
        ],
      },
      {
        rowNo: 2,
        tables: [
          { tableId: "H1T4", label: "Table 4", leftSeats: createSeats("G", 4, []), rightSeats: createSeats("H", 4, [2]) },
          { tableId: "H1T5", label: "Table 5", leftSeats: createSeats("I", 4, [3]), rightSeats: createSeats("J", 4, []) },
          { tableId: "H1T6", label: "Table 6", leftSeats: createSeats("K", 4, []), rightSeats: createSeats("L", 4, [1]) },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Hall 2",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H2T1", label: "Table 1", leftSeats: createSeats("M", 3, [1]), rightSeats: createSeats("N", 3, []) },
          { tableId: "H2T2", label: "Table 2", leftSeats: createSeats("O", 3, []), rightSeats: createSeats("P", 3, [2]) },
        ],
      },
      {
        rowNo: 2,
        tables: [
          { tableId: "H2T3", label: "Table 3", leftSeats: createSeats("Q", 3, [3]), rightSeats: createSeats("R", 3, []) },
          { tableId: "H2T4", label: "Table 4", leftSeats: createSeats("S", 3, []), rightSeats: createSeats("T", 3, [1]) },
        ],
      },
    ],
  },

  {
    id: 3,
    name: "Hall 3",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H3T1", label: "Table 1", leftSeats: createSeats("U", 5, [2]), rightSeats: createSeats("V", 5, []) },
          { tableId: "H3T2", label: "Table 2", leftSeats: createSeats("W", 5, []), rightSeats: createSeats("X", 5, [3]) },
        ],
      },
      {
        rowNo: 2,
        tables: [
          { tableId: "H3T3", label: "Table 3", leftSeats: createSeats("Y", 5, []), rightSeats: createSeats("Z", 5, [1]) },
          { tableId: "H3T4", label: "Table 4", leftSeats: createSeats("AA", 5, [4]), rightSeats: createSeats("AB", 5, []) },
        ],
      },
    ],
  },

  {
    id: 4,
    name: "Hall 4",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H4T1", label: "Table 1", leftSeats: createSeats("AC", 4, [1]), rightSeats: createSeats("AD", 4, []) },
          { tableId: "H4T2", label: "Table 2", leftSeats: createSeats("AE", 4, []), rightSeats: createSeats("AF", 4, [2]) },
        ],
      },
    ],
  },

  {
    id: 5,
    name: "Hall 5",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H5T1", label: "Table 1", leftSeats: createSeats("AG", 6, [3]), rightSeats: createSeats("AH", 6, []) },
        ],
      },
      {
        rowNo: 2,
        tables: [
          { tableId: "H5T2", label: "Table 2", leftSeats: createSeats("AI", 6, []), rightSeats: createSeats("AJ", 6, [5]) },
        ],
      },
    ],
  },

  {
    id: 6,
    name: "Hall 6",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H6T1", label: "Table 1", leftSeats: createSeats("AK", 4, []), rightSeats: createSeats("AL", 4, [1]) },
          { tableId: "H6T2", label: "Table 2", leftSeats: createSeats("AM", 4, [4]), rightSeats: createSeats("AN", 4, []) },
          { tableId: "H6T3", label: "Table 3", leftSeats: createSeats("AO", 4, []), rightSeats: createSeats("AP", 4, [2]) },
        ],
      },
    ],
  },

  {
    id: 7,
    name: "Hall 7",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H7T1", label: "Table 1", leftSeats: createSeats("AQ", 3, [1]), rightSeats: createSeats("AR", 3, []) },
          { tableId: "H7T2", label: "Table 2", leftSeats: createSeats("AS", 3, []), rightSeats: createSeats("AT", 3, [2]) },
          { tableId: "H7T3", label: "Table 3", leftSeats: createSeats("AU", 3, []), rightSeats: createSeats("AV", 3, []) },
        ],
      },
    ],
  },

  {
    id: 8,
    name: "Hall 8",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H8T1", label: "Table 1", leftSeats: createSeats("AW", 4, []), rightSeats: createSeats("AX", 4, [4]) },
          { tableId: "H8T2", label: "Table 2", leftSeats: createSeats("AY", 4, [1]), rightSeats: createSeats("AZ", 4, []) },
        ],
      },
      {
        rowNo: 2,
        tables: [
          { tableId: "H8T3", label: "Table 3", leftSeats: createSeats("BA", 4, []), rightSeats: createSeats("BB", 4, [3]) },
          { tableId: "H8T4", label: "Table 4", leftSeats: createSeats("BC", 4, []), rightSeats: createSeats("BD", 4, []) },
        ],
      },
    ],
  },

  {
    id: 9,
    name: "Hall 9",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H9T1", label: "Table 1", leftSeats: createSeats("BE", 5, [5]), rightSeats: createSeats("BF", 5, []) },
        ],
      },
      {
        rowNo: 2,
        tables: [
          { tableId: "H9T2", label: "Table 2", leftSeats: createSeats("BG", 5, []), rightSeats: createSeats("BH", 5, [2]) },
        ],
      },
    ],
  },

  {
    id: 10,
    name: "Hall 10",
    rows: [
      {
        rowNo: 1,
        tables: [
          { tableId: "H10T1", label: "Table 1", leftSeats: createSeats("BI", 4, [2]), rightSeats: createSeats("BJ", 4, []) },
          { tableId: "H10T2", label: "Table 2", leftSeats: createSeats("BK", 4, []), rightSeats: createSeats("BL", 4, [1]) },
          { tableId: "H10T3", label: "Table 3", leftSeats: createSeats("BM", 4, [3]), rightSeats: createSeats("BN", 4, []) },
        ],
      },
    ],
  },
];

export default hallsData;