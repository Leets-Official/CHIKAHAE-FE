interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  message: string;
  checked: boolean;
  onChange: (value: string) => void;
  required?: boolean;
  isActive?: boolean;
}

const RadioButton = ({
  id,
  name,
  value,
  message,
  checked,
  onChange,
  required,
}: RadioButtonProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center space-x-1 cursor-pointer select-none p-2 rounded-md`}
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
        className={
          'w-4 h-4 rounded-full border flex items-center justify-center transition-colors duration-200 border-border-gray-weak'
        }
      >
        {checked && <div className='w-2 h-2 rounded-full bg-fg-accent-blue-weak' />}
      </div>
      <span className='body-14-r text-fg-primary'>{message}</span>
    </label>
  );
};

export default RadioButton;
