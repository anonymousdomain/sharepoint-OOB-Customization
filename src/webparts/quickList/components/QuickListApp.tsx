import * as React from "react";
import styles from "./QuickList.module.scss";
import { IQuickListProps } from "./IQuickListProps";
import QuickList from "./QuickList";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import DocumnetItem from "./DocumentItem";
import * as utils from "../utils"
import { Customizer, mergeStyles } from "office-ui-fabric-react";
export default class QuickListApp extends React.Component<
  IQuickListProps,
  any
> {
  private _client: SPHttpClient = this.props.ctx.spHttpClient;
  private _webUrl = this.props.ctx.pageContext.web.absoluteUrl;
  state = {
    items: [],
    documents:[]
  };

  componentDidMount(): void {
    this._getQuickLinks();
    this._getDocuments();
  }

  private _getDocuments() {
    let url = this._webUrl+"/_api/web/Lists/getbytitle('Documents')/items?$select=File/Name,File/LinkngUri,Created,Modified&$expand=File";
    utils._getSPData(this._client, url).then((info) => {
      let data = info.value;
      console.log('docs',JSON.stringify(data));
      this.setState({
        documents: data,
      });
    });
  }
  private _getQuickLinks() {
    let url = `${this._webUrl}/_api/web/Lists/getbytitle('QuickList')/items`;

    utils._getSPData(this._client, url).then((info) => {
      let data = info.value;
      this.setState({
        items: data,
      });
    });
  }

 
  public render(): React.ReactElement<IQuickListProps> {

    let _container=mergeStyles(
      {
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap"
      }
    )
    return (
      <Customizer settings={{theme:this.props.themeVariant}}>
      <div className={styles.quickList}>
        <div className={_container}>
          {this.state.items.map((item) => (
            <QuickList link={item} />
          ))}
       </div>
        {/* <h3>documents</h3>
        <div>
          {this.state.documents.map((docs) => (
            <DocumnetItem link={docs} />
          ))}
        </div> */}
      </div>
      </Customizer>
    );
  }
}
