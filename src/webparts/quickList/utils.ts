import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from "@microsoft/sp-http"
import { SectionSizesEnum } from "./components/SectionSizeEnum";
export const _getSPData = async (client: SPHttpClient, url: string): Promise<any> => {
    let res: SPHttpClientResponse = await client.get(
        url,
        SPHttpClient.configurations.v1
    );
    let json = res.json();
    return json;
}

export const _postSPData = async (client: SPHttpClient, url: string, sppayload: any): Promise<any> => {

    const spOpts: ISPHttpClientOptions = {
        body:sppayload
    };
    let res: SPHttpClientResponse = await client.post(url, SPHttpClient.configurations.v1, spOpts)
    let json = res.json()
    return json;
}

export function getWebPartSectionSize(width: number): SectionSizesEnum {
    if (width < 300)
        return SectionSizesEnum.small;
    if (width < 400)
        return SectionSizesEnum.medium50;
    if (width < 500)
        return SectionSizesEnum.medium23;
    if (width < 800)
        return SectionSizesEnum.large;

    return SectionSizesEnum.jumbo;
}
