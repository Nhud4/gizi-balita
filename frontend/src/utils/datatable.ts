import {
  createTheme,
  PaginationOptions,
  TableStyles,
} from "react-data-table-component";

createTheme(
  "solarized",
  {
    text: {
      primary: "#676D7A",
      secondary: "#2aa198",
    },
    divider: {
      default: "rgba(255, 255, 255, 0.1)",
    },
  },
  "dark"
);

export const tableStyles = (resetSort?: boolean): TableStyles => ({
  table: {
    style: {
      fontFamily: "Poppins, sans-serif",
      background: "#fff",
      paddingLeft: 10, // 15
      paddingRight: 10, // 15
      position: "relative",
      minHeight: "400px",
    },
  },
  head: {
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 12, // 15
      fontWeight: 500,
      zIndex: 1,
    },
  },
  headRow: {
    style: {
      background: "#F5F5F5", // '#F6F6F7'
      borderRadius: 5,
      ".rdt_TableCol_Sortable span": {
        display: resetSort ? "none" : "inline-flex",
      },
    },
  },

  cells: {
    style: {
      marginBottom: "0.7rem 0", // 1.5em 0
      lineHeight: "135%", // 135%
    },
  },
  rows: {
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 12,
      fontWeight: 400,
      "&:first-child": {
        marginTop: 0,
      },
      "&:nth-child(odd)": {
        background: "white",
        borderBottom: "1px solid #dae0eb",
      },
      "&:nth-child(even)": {
        background: "white",
        borderBottom: "1px solid #dae0eb",
      },
    },
  },
  pagination: {
    style: {
      background: "rgba(255,255,255,0.1)",
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      color: "white",
      fontSize: "16px",
    },
    pageButtonsStyle: {
      fill: "#fff",
      color: "#fff",
    },
  },
  expanderButton: {
    style: {
      backgroundColor: "white",
      color: "#dae0eb",
    },
  },
  expanderRow: {
    style: {
      fontFamily: "Poppins, sans-serif",
      fontSize: 12,
      fontWeight: 400,
      "&:nth-child(odd)": {
        background: "white",
        borderBottom: "1px solid #dae0eb",
      },
      "&:nth-child(even)": {
        background: "white",
        borderBottom: "1px solid #dae0eb",
      },
    },
  },
});

export const paginationInfo: PaginationOptions = {
  rowsPerPageText: "Baris setiap halaman:",
  rangeSeparatorText: " dari",
};
