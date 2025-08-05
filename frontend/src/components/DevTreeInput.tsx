import type {DevTreeLinks} from "../types";

type DevTreeInputProps = {
    item: DevTreeLinks
}

export default function DevTreeInput({item}: DevTreeInputProps) {

    return (
        <div>
            <div className='w-12 h-12 bg-cover'
                style={{backgroundImage: `url('/social/icon_${item.name}.svg')`}}>

            </div>
            <input/>
        </div>
    )
}
