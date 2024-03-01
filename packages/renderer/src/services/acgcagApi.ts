import axios from 'axios';
import GameBananaAPI from './gamebananaApi';
import type {GBToolPost} from './gamebananaApi';

const ENDPOINT = 'https://raw.githubusercontent.com/SkinnyDevi/modern-acgcag/develop/acgcag_api';
const EXTRA_TOOLS_ENDPOINT = ENDPOINT + '/extra_tools.json';

interface ExtraToolsACGCAG {
  tools: string[];
}

export default class ACGCAG_API {
  public static async getExtraTools() {
    const response = (await axios.get(EXTRA_TOOLS_ENDPOINT)).data;
    if (response.error !== undefined)
      throw new Error('Could not fetch for new tools from ACGCAG API');

    const {tools} = response as ExtraToolsACGCAG;

    const gbTools: GBToolPost[] = [];
    for (const tool of tools) gbTools.push(await GameBananaAPI.toolFromUrl(tool));

    return gbTools;
  }
}
