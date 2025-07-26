import React from 'react';
import EditMenuItem from '@/features/Mypage/components/EditMenuItem';
import type { EditMenuItemType } from '@/features/Mypage/components/EditMenuItem';

interface EditMenuListProps {
  items: EditMenuItemType[];
}

const EditMenuList: React.FC<EditMenuListProps> = ({ items }) => (
  <ul className='flex flex-col'>
    {items.map((item) => (
      // 1) 안정적인 key: item.key 사용
      // 2) onClick을 EditMenuItem에 전달
      <li key={item.key}>
        <EditMenuItem
          item={item}
          // 필요하다면 path 등 다른 prop도 같이 전달
        />
      </li>
    ))}
  </ul>
);

export default EditMenuList;
