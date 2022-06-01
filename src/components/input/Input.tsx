import { InputArgs } from '../../types';
import './styles.css';

const Input = (inputArgs: InputArgs) => {
  return (
    <div className="rgtchat-input">
      {inputArgs.type == 'text' ? (
        <input
          type={inputArgs.type}
          placeholder={inputArgs.placeHolder}
          defaultValue={inputArgs.defaultValue}
          onChange={inputArgs.onInputChangeHandler}
        />
      ) : null}
    </div>
  );
};

export default Input;
