
export const ITEM_PRICE = 999;
export const TOOTHBRUSH_LABELS = {
  blue: '파란색 칫솔',
  green: '초록색 칫솔',
  purple: '보라색 칫솔',
};
export const CHARACTER_LABELS = {
  rabbit: '토끼',
  dog: '강아지',
  squirrel: '다람쥐',
};

export const TOOTHBRUSH_ITEMS: StoreItem[] = [
  { id: 'blue', icon: ToothbrushBlueIcon, price: ITEM_PRICE, label: TOOTHBRUSH_LABELS.blue, isCompleted: false },
  { id: 'green', icon: ToothbrushGreenIcon, price: ITEM_PRICE, label: TOOTHBRUSH_LABELS.green, isCompleted: false },
  { id: 'purple', icon: ToothbrushPurpleIcon, price: ITEM_PRICE, label: TOOTHBRUSH_LABELS.purple, isCompleted: false },
];

export const CHARACTER_ITEMS: StoreItem[] = [
  { id: 'rabbit', icon: ThumbnailRabbit, price: ITEM_PRICE, label: CHARACTER_LABELS.rabbit, isCompleted: false },
  { id: 'dog', icon: ThumbnailDog, price: ITEM_PRICE, label: CHARACTER_LABELS.dog, isCompleted: false },
  { id: 'squirrel', icon: ThumbnailSquirrel, price: ITEM_PRICE, label: CHARACTER_LABELS.squirrel, isCompleted: false },
];
