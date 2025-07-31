import { ReactComponent as ToothbrushBlueIcon } from '@/assets/icons/thumbnail_toothbrush_blue.svg';
import { ReactComponent as ToothbrushGreenIcon } from '@/assets/icons/thumbnail_toothbrush_green.svg';
import { ReactComponent as ToothbrushPurpleIcon } from '@/assets/icons/thumbnail_toothbrush_purple.svg';
import { ReactComponent as ThumbnailDog } from '@/assets/icons/thumbnail_dog.svg';
import { ReactComponent as ThumbnailRabbit } from '@/assets/icons/thumbnail_rabbit.svg';
import { ReactComponent as ThumbnailSquirrel } from '@/assets/icons/thumbnail_squirrel.svg';
import type { StoreItem } from '@/types/storeitem';


export const TOOTHBRUSH_ITEMS: StoreItem[] = [
  { id: 'blue', icon: ToothbrushBlueIcon, price: 999, isCompleted: false },
  { id: 'green', icon: ToothbrushGreenIcon, price: 999, isCompleted: false },
  { id: 'purple', icon: ToothbrushPurpleIcon, price: 999, isCompleted: false },
];

export const CHARACTER_ITEMS: StoreItem[] = [
  { id: 'rabbit', icon: ThumbnailRabbit, price: 999, isCompleted: false },
  { id: 'dog', icon: ThumbnailDog, price: 999, isCompleted: false },
  { id: 'squirrel', icon: ThumbnailSquirrel, price: 999, isCompleted: false },
];
