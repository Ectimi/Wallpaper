import {FC} from "react";
import {useSnapshot} from "valtio";
import {store} from "@/store";
import Image from '@/components/Image'
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

export const Detail: FC = () => {
    const snap = useSnapshot(store)

    return snap.currentImage ?
        <Stack sx={{width: '100%', height: '100%', backgroundImage: theme => theme.linearGradient.detail}}>
            <Container>
                <Image src={snap.currentImage.url}/>
            </Container>
        </Stack> : null
}