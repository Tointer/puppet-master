import classNames from 'classnames';
import React from 'react';
import MyInput from './MyInput';

interface TokenInputProps {
  className?: string;
  value?: string;
  jumpValue?: string;
  onChange?: (e: string) => void;
    jumpLabel?: string;
}

const TokenInput = ({
  className,
  value,
  jumpValue,
  onChange,
  jumpLabel = 'MAX',
}: TokenInputProps) => {

    const setMaxAmount = () => {
        if (jumpValue) {
            onChange!(jumpValue);
        }
    }

  return (
    <div className='flex items-center justify-between mt-1 w-full'>
        <MyInput
            className={classNames(className)}
            value={value ? value.toString() : ''}
            onChange={(s) =>
                s.match(/^[0-9]*[.,]?[0-9]*$/) &&
                onChange!(s)
            }
            disabled={false}
        />
        <button
        onClick={setMaxAmount}
        className="bg-transparent border border-gray-600 hover:bg-gray-600/25 rounded-md px-2 py-1 text-xs font-sora"
        >
        {jumpLabel}
        </button>
    </div>
  );
};

export default TokenInput;
