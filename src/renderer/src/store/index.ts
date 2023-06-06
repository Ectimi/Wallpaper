import {proxy} from 'valtio'
import {TImageItem, TImageList} from "@/api";

type TDetail = {
    imageList:TImageList,
    currentImage:TImageItem | null
}

export const store = proxy<TDetail>({
    imageList:[],
    currentImage:null
})