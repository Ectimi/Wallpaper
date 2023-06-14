import {CSSProperties, FC, useEffect, useMemo} from "react";
import {useSnapshot} from "valtio";
import {styled} from "@mui/material";
import {store} from "@/store";
import Image from '@/components/Image'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import Button from '@mui/material/Button';
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {useRequest, useSafeState} from "ahooks";
import {getAllDisplays} from "@/api";

const ImageContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '65%',
    backgroundImage: theme.linearGradient.grounding,
    [theme.breakpoints.up('md')]: {
        height: '100%',
        width: '80%'
    }
}))

const Title = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    color:'#fff',
    fontSize:'16px',
    '&::before': {
        content: '""',
        display: 'block',
        width: '4px',
        height: '20px',
        marginRight: '5px',
        backgroundColor: theme.palette.primary.main
    }
}))

const TagBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginTop:'10px'
})

const TagItem = styled(Box)((props: { index: number }) => ({
    marginLeft: props.index === 0 ? 0 : '10px',
    color: '#fff',
    fontSize:'12px'
}))

const Select = styled(MuiSelect)({
    color:'#fff',
    'fieldset':{
        borderColor:'rgba(255, 255, 255, 0.7)'
    },
    'svg':{
        color:'rgba(255, 255, 255, 0.54)'
    }
})

export const Detail: FC = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'));
    const {currentImage} = useSnapshot(store)
    const {data:allDisplays} = useRequest(getAllDisplays)
    const [selectedImage,setSelectedImage] = useSafeState(currentImage?.resolution)
    const tags = useMemo(() => {
        if (currentImage) {
            const splits = currentImage!.tag.match(/(category_[^_]+)/g)
            return splits!.map(tag => tag.replace('category_', ''))
        }
        return []
    }, [currentImage])
    const resolutions = useMemo(() => {
        if (currentImage) {
            const obj: Record<string, string> = {}
            let key: keyof (typeof currentImage)
            for (key in currentImage) {
                if (key.startsWith('img_')) {
                    let name = key.replace('img_', '');
                    name = name.replace('_', 'x')
                    obj[name] = currentImage![key]
                }
            }
            if(!obj[currentImage.resolution]){
                obj[currentImage.resolution] = currentImage.url
            }
            return obj;
        }
        return {}
    }, [currentImage])
    const imageStyle = useMemo<CSSProperties>(() => {
        if (isMd) {
            return {
                height: 'auto',
                width: '100%'
            }
        }
        return {
            width: '90%',
            height: 'auto'
        }
    }, [isMd])

   useEffect(()=>{
      console.log('all',allDisplays)
   },[allDisplays])

    return currentImage ?
        <Stack sx={{width: '100%', height: '100%', backgroundColor: theme => theme.palette.primary.dark}}
               direction={isMd ? 'row' : 'column'}>
            <ImageContainer>
                <Image src={resolutions[selectedImage!]} style={imageStyle}/>
            </ImageContainer>
            <Box sx={{padding: '10px'}}>
                <Title>标签</Title>
                <TagBox>
                    {
                        tags.map((tag, index) => <TagItem key={tag} index={index}>{tag}</TagItem>)
                    }
                </TagBox>
                <Title sx={{marginTop:'10px'}}>分辨率</Title>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select value={selectedImage} onChange={e=>setSelectedImage(e.target.value as string)}>
                        {
                            Object.keys(resolutions).map((name)=><MenuItem key={name} value={name}>{name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Title sx={{marginTop:'10px'}}>操作</Title>
                <Stack useFlexGap direction="row" sx={{marginTop:'10px'}} spacing={{ xs: 1, sm: 2 }}>
                    <Button variant="contained">设置为壁纸</Button>
                    <Button variant="contained">设置为锁屏</Button>
                </Stack>
            </Box>
        </Stack> : null
}