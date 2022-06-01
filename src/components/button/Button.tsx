import { ButtonArgs } from '../../types';

const Button = (buttonArgs: ButtonArgs) => {
  return (
    <>
      <button
        disabled={buttonArgs.disabled}
        onClick={buttonArgs.onClickHandler}
      >
        {buttonArgs.value}
      </button>
    </>
  );
};

export default Button;
