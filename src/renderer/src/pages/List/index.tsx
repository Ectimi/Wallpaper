import {FC, useRef} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {useRequest, useSafeState} from 'ahooks';
import {searchImage, TImageList} from "@/api";
import {useScrollToBottom} from '@/hooks/useScrollToBottom';
import {styled} from '@mui/material';
import {TImageItem} from "@/api";
import {store} from "@/store";
import useCols from '@/hooks/useCols';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MuiImageList from '@mui/material/ImageList';
import MuiImageListItem from '@mui/material/ImageListItem';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Image from '@/components/Image'

const ImageList = styled(MuiImageList)({
    width: '100%',
    height: '100%',
    margin: 0,
    gap: 2,
});

const ImageListItem = styled(MuiImageListItem)({
    '&:hover':{
        boxShadow:'0 0 1px 1px #a6d3ed'
    }
})

const SkeletonList = () => {
    const cols = useCols();

    return (
        <ImageList cols={cols} sx={{height: 'unset'}}>
            {Array.from({length:30}).map((_, index) => (
                <ImageListItem key={index}>
                    <Skeleton variant="rectangular" width="100%" height={210}/>
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export const List: FC = () => {
    const params = useParams<{ type: string }>();
    const navigate = useNavigate()
    const cols = useCols();
    const pagination = useRef({
        start: 0,
        count: 30,
        total: 0,
        hasMore: true,
    })
    const [imageList, setImageList] = useSafeState<TImageList>([])
    const { run: loadData, loading} = useRequest(searchImage, {
        defaultParams: [{
            start: pagination.current.start,
            count: pagination.current.count,
            kw: params.type!
        }],
        onSuccess(res) {
            const _imageList = [...imageList, ...res.data].filter((item, index, array) => array.findIndex(i => i.id === item.id) === index)
            setImageList(_imageList)
            pagination.current.total = parseInt(res.total)
            pagination.current.start += pagination.current.count
            if (imageList.length >= pagination.current.total) {
                pagination.current.hasMore = false
            }
        }
    });

    const listItemClickHandle = (imageItem:TImageItem)=>{
        store.currentImage = imageItem;
        store.imageList = imageList
        navigate('/detail')
    }

    const listRef = useRef(null);
    useScrollToBottom(listRef, () => {
        if (pagination.current.hasMore) {
            loadData({
                start: pagination.current.start,
                count: pagination.current.count,
                kw: params.type!
            });
        }
    });

    return (
        <Box
            ref={listRef}
            sx={{
                backgroundImage: 'var(--background-image)',
                paddingBottom: '10px',
                height: '100%',
                overflowY: 'auto',
            }}
        >
            {imageList.length > 0 ? (
                <ImageList cols={cols} sx={{height: 'unset'}}>
                    {imageList.map((item) => (
                        <ImageListItem key={item.id} onClick={()=>listItemClickHandle(item)}>
                            <Image src={item.url_thumb}/>
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <>
                    <SkeletonList/>
                </>
            )}

            {imageList.length > 0 && loading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',
                    }}
                >
                    <CircularProgress sx={{color: '#3b83f7'}} size={20}/>
                </Box>
            )}

            {!pagination.current.hasMore && !loading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',
                    }}
                >
                    <Typography variant="subtitle2" gutterBottom color="#d5d5d5">
                        没有更多了
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
