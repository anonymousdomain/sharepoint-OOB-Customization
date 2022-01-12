import { Text, Icon, mergeStyles, Link } from "office-ui-fabric-react";
import * as React from "react";
import styles from "./QuickList.module.scss";

const QuickList = (props: any) => {
  let _container = mergeStyles({
    width: 246,
    border: "1px solid",
    borderRadius: 5,
    height:38,
    margin: "0 11px 15px 0",
    padding:12
  });
  let _innerCont = mergeStyles({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
   
  });
  let _iconCont = mergeStyles({
    margin:"7px 10px 0 0",
    fontSize:22,

  });
  let _textCont = mergeStyles({
    maxHeight:41,
    overflow:"hidden",

  });
  return (
    <div className={_container}>
      <Link href={props.link.url}>
        <div className={_innerCont}>
          <div className={_iconCont}>
            <Icon iconName="Globe"></Icon>
          </div>
          <div className={_textCont}>
            <Text>{props.link.Title}</Text>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuickList;
