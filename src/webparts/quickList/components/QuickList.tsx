import { Text, Icon, mergeStyles, Link } from "office-ui-fabric-react";
import * as React from "react";
import styles from "./QuickList.module.scss";
import { SectionSizesEnum } from "./SectionSizeEnum";

const QuickList = (props: any) => {
  let _width ="28%";
  let _border="1px solid"
  let _sectionSize: SectionSizesEnum = props.sectionSize;
  if (_sectionSize === SectionSizesEnum.medium50) {
    _width = "100%";
  } else if (_sectionSize === SectionSizesEnum.medium23) {
    _width ="88.35%%";
  } else if (_sectionSize === SectionSizesEnum.large) {
    _width = "41.35%";
  }
  let _container = mergeStyles({
    width: _width,
    border:_border,
    borderRadius: 5,
    height: 35,
    marginBottom: "1px",
    padding: 12,
  });
  let _innerCont = mergeStyles({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  });
  let _iconCont = mergeStyles({
    margin: "7px 10px 0 0",
    fontSize: 22,
  });
  let _textCont = mergeStyles(styles.textWrapper,{
    maxHeight: 41,
    overflow: "hidden",
  });
  
  return (
    <div className={_container}>
      <Link className={styles.link} href={props.link.url}>
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
