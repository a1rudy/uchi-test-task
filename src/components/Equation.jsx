import React from 'react';
import cn from 'classnames';

function Equation({ valueA, valueB, valueAnswer, inputValueB }) {
  const [inputValueAnswer, setInputValueAnswer] = React.useState('');

  function handleChangeAnswer(evt) {
    setInputValueAnswer(+evt.target.value);
  }

  return (
    <section className='equation'>
      <span>{valueA}</span>
      <span>+</span>
      <span>{valueB}</span>
      <span>=</span>
      {inputValueB !== valueB && <span>?</span>}
      <input
        className={cn(
          'input',
          { input_invisible: inputValueB !== valueB },
          { input_invalid: inputValueAnswer !== valueAnswer }
        )}
        disabled={inputValueAnswer === valueAnswer}
        onChange={handleChangeAnswer}
        name='inputAnswer'
        type='text'
        maxLength='2'
        size='1'
      />
    </section>
  );
}

export default Equation;
