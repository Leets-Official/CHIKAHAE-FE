import clsx from 'clsx';
import {ReactComponent as Coin} from '@/assets/icons/coin.svg';

interface ItemCardProps {
    id : string;
    icon : React.ComponentType < React.SVGProps < SVGSVGElement >>;
    price : number;
    active : boolean;
    onClick : () => void;
}

const ItemCard : React.FC < ItemCardProps > = ({icon: Icon, price, active, onClick}) => {
    return (
        <div
            className={clsx(
                'w-[100px] h-[130px] flex flex-col justify-center items-center gap-[10px] p-[15px] rounded-[8px] border-[3px] transition-all duration-200 cursor-pointer',
                active ? 'border-border-blue' : 'border-border-lightgray',
            )}
            onClick={onClick}
        >
            <div className='w-[70px] h-[100px] flex items-center justify-center flex-col'>
                <div className='w-[70px] h-[70px] rounded-full bg-bg-tertiary-blue flex items-center justify-center '>
                    <Icon />
                </div>
                <div className='w-[70px] h-[20px] gap-[8px] flex items-center justify-center pt-[10px]'>
                    <Coin className='w-[20px] h-[20px]'/>
                    <span className='body-14-b'>{price}</span>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
