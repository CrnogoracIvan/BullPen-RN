export interface ITokenListItem {
    address: string;
    decimals: number;
    lastTradeUnixTime: number;
    liquidity: number;
    logoURI: string;
    mc: number
    name: string;
    price: number;
    symbol: string;
    v24hChangePercent: number;
    v24hUSD: number;
}