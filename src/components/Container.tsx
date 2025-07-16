import { useState } from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'formTop' | 'formMiddle' | 'formBottom';
type ContainerState = 'enabled' | 'select';

interface ContainerProps {
  variant?: Variant;
  children?: React.ReactNode;
}

const stateClassMap = {
  enabled: {
    border: 'border-[#9CA6AF]',
    bg: 'bg-white',
  },
  select: {
    border: 'border-[#5fc6f0]',
    bg: 'bg-white',
  },
};

const Container = ({ variant = 'default', children }: ContainerProps) => {
  const [selected, setSelected] = useState(false);
  const state: ContainerState = selected ? 'select' : 'enabled';
  const current = stateClassMap[state];

  const containerClass = clsx(
    'w-full h-[80px] px-4 py-3 flex flex-col cursor-pointer',
    variant === 'default' && 'rounded-lg border-[2px] border-b-5 shadow-md',
    variant !== 'default' && 'border-t border-[#9CA6AF]',
    variant === 'formTop' && 'rounded-t-lg',
    variant === 'formBottom' && 'rounded-b-lg',
    current.border,
    current.bg,
  );

  return (
    <div className={containerClass} onClick={() => setSelected(!selected)}>
      {children}
    </div>
  );
};

export default Container;
