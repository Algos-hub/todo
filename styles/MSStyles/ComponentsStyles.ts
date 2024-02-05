import { makeStyles } from "@fluentui/react-components";

const MsStyles = makeStyles({
  button: {
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    ":hover:active": {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
  },
  drawer: {
    top: "40px",
  },
});

export default MsStyles;
