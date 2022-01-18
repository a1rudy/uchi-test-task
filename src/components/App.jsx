import React from 'react';
import Equation from './Equation';
import Decision from './Decision';

function App() {
  const [valueA, setvalueA] = React.useState(null);
  const [valueB, setvalueB] = React.useState(null);
  const [valueAnswer, setValueAnswer] = React.useState(null);
  const [inputValueB, setInputValueB] = React.useState(null);

  function onSetInputValueB(valueB) {
    setInputValueB(valueB);
  }

  React.useEffect(() => {
    const a = calcRandomInteger(6, 9);
    setvalueA(a);
    const b = calcRandomInteger(11 - a, 14 - a);
    setvalueB(b);
    setValueAnswer(a + b);
  }, []);

  function calcRandomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  return (
    <main className='page'>
      <Equation
        valueA={valueA}
        valueB={valueB}
        valueAnswer={valueAnswer}
        inputValueB={inputValueB}
      />
      <Decision
        valueA={valueA}
        valueB={valueB}
        valueAnswer={valueAnswer}
        inputValueB={inputValueB}
        onSetInputValueB={onSetInputValueB}
      />
    </main>
  );
}

export default App;
