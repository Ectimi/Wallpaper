import {useSafeState} from "ahooks";
import Skeleton from "@mui/material/Skeleton";

export default function Image(props: { src: string, otherProps?: any }) {
    const {src, otherProps = {}} = props
    const [loading, setLoading] = useSafeState(true)
    return <>
        {
            loading ? <Skeleton variant="rectangular" width="100%" height={210}/> : null
        }
        <img
            style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                flexGrow: 1,
                display: loading ? 'none' : 'block'
            }}
            src={src}
            onLoad={() => setLoading(false)}
            {...otherProps}
        />
    </>
}