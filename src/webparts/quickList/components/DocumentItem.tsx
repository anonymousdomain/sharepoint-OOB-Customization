import * as React from "react";
import styles from "./QuickList.module.scss";

const DocumnetItem = (props: any) => {
  return (
    <div>
      <li>
        <div><a href={props.link.File.linkingUri}target="_blank">{props.link.File.Name}</a></div>
      <div>created at#{props.link.Created}</div>
      <div>modified at#{props.link.Modified}</div>
      </li>
    </div>
  );
};

export default DocumnetItem;
