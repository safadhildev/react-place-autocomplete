const styles = {
  input: { flex: 1, fontSize: "16px" },
  button: {
    margin: "0 0 0 10px",
  },
  tag: {
    margin: "30px 0 10px",
  },
  form: {
    container: {
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 2,
      "box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.1)",
      "-webkit-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.1)",
      "-moz-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.1)",
    },
    wrapper: {
      flex: 1,
      backgroundColor: "white",
      width: "400px",
      display: "flex",
      flexDirection: "column",
      gap: 5,
    },
  },

  result: {
    wrapper: {
      flex: 1,
      backgroundColor: "white",
      width: "400px",
      display: "flex",
      flexDirection: "column",
      gap: 0,
    },
    container: {
      position: "absolute",
      top: 90,
      left: 10,
      zIndex: 1,
      "box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
      "-webkit-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
      "-moz-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: "14px",
      display: "flex",
      flexDirection: "row",
      flexShrink: 1,
    },
    subtitle_bold: {
      fontSize: "14px",
      fontWeight: "bold",
      flexWrap: "wrap",
      flexShrink: 1,
      width: "200px",
      backgroundColor: "red",
    },
  },
};


export default styles