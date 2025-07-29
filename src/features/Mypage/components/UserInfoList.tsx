import React from 'react';

export interface MenuItemType {
    key: string;
    label: string;
    value: string;
}

interface UserInfoListProps {
  items: MenuItemType[];
}

const UserInfoList: React.FC<UserInfoListProps> = ({ items }) => {
  return (
    <div className="w-full h-[46px] flex flex-col">
      {items.map((item) => (
        <div key={item.key} className="flex flex-row py-[12px] items-center justify-between text-fg-medium">
          <span className="text-base font-extrabold">
            {item.label}
          </span>
          <span className="text-base font-bold">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserInfoList;
