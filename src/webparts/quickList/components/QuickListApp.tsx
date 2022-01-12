import * as React from "react";
import styles from "./QuickList.module.scss";
import { IQuickListProps } from "./IQuickListProps";
import QuickList from "./QuickList";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import * as utils from "../utils"
import {SectionSizesEnum} from "./SectionSizeEnum"
import { Customizer, FontSizes, mergeStyles } from "office-ui-fabric-react";
export default class QuickListApp extends React.Component<
  IQuickListProps,
  any
> {
  private _client: SPHttpClient = this.props.ctx.spHttpClient;
  private _webUrl = this.props.ctx.pageContext.web.absoluteUrl;
  private _sectionSize:number=this.props.webPartSectionSize;
  //private _sectionWidth: number = this.props.webPartSectionSize;
  state = {
    items: [],
    documents:[],
    sectionSize:SectionSizesEnum.small
  };

  componentDidMount(): void {
    this._getQuickLinks();
    this._getDocuments();
    this._loadSectionSize();
  }

  private _loadSectionSize() {
    this.setState({
      sectionSize: utils.getWebPartSectionSize(this._sectionSize)
    });
  }

  private _getDocuments() {
    let url = this._webUrl+"/_api/web/Lists/getbytitle('Documents')/items?$select=File/Name,File/LinkngUri,Created,Modified&$expand=File";
    utils._getSPData(this._client, url).then((info) => {
      let data = info.value;
    
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
        flexWrap:"wrap",
        justifyContent:"space-between"
      }
    )
    let _header=mergeStyles(
      {
        fontSize:20,
        marginBottom:18,
        fontWeight:500,
      }
    )
    return (
      <Customizer settings={{theme:this.props.themeVariant}}>
      <div className={styles.quickList}>
        <div className={_header}>Parent Component {this._sectionSize}</div>
        <div className={_container}>
          {this.state.items.map((item) => (
            <QuickList link={item} sectionSize={this.state.sectionSize} />
          ))}
       </div>
      </div>
      </Customizer>
    );
  }
}
