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
  buttonS: {
    justifyContent: "flex-start",
    paddingLeft: "5px",
  },
});

export default MsStyles;
