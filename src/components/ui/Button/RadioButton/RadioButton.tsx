interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  required?: boolean;
  radioState: 'enabled' | 'select' | 'disabled';
}

const stateClassMap = {
  enabled: { border: 'border-[#9CA6AF]', bg: 'bg-white' },
  select: { border: 'border-[#3DAFD9]', bg: 'bg-white' },
  disabled: { border: 'border-[#9CA6AF]', bg: 'bg-[#BAC3CB]' },
};

const RadioButton = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
  required,
  radioState,
}: RadioButtonProps) => {
  const { border, bg } = stateClassMap[radioState];

  return (
    <label
      htmlFor={id}
      className={`flex items-center space-x-1 cursor-pointer select-none p-2 rounded-md ${border} ${bg}`}
    >
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        required={required}
        className='sr-only'
      />

      <div
        className={`
          w-4 h-4 rounded-full border-1
          flex items-center justify-center
          transition-colors duration-200
          ${stateClassMap[radioState].border}
          ${checked ? 'border-blue_weak' : 'border-border_default'}
        `}
      >
        {checked && <div className='w-2 h-2 rounded-full bg-fg-accent-blue-weak' />}
      </div>
      <span className='text-sm text-black'>{label}</span>
    </label>
  );
};

export default RadioButton;
