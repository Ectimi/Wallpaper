import {sendEvent} from './ipc.ts'

interface ISearchImage{
  start:number;
  count:number;
  kw:string;
}

export type TImageItem = {
  id:string;
  resolution:string;
  url:string;
  url_thumb:string;
  tag:string;
}

export type TImageList = Array<TImageItem>

interface ISearchResponse{
  errno:string;
  errmsg:string;
  consume:string;
  total:string;
  data:TImageList
}
export async function searchImage({start ,count ,kw } :ISearchImage = {start:0,count:0,kw:''}):Promise<ISearchResponse>{
  const url = `http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=${start}&count=${count}&kw=${kw}`
  const data = await fetch(url)
  return data.json()
}

export function getAllDisplays(){
  return sendEvent('getAllDisplays')
}