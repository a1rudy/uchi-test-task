import React from 'react';
import cn from 'classnames';

function Decision({
  valueA,
  valueB,
  valueAnswer,
  inputValueB,
  onSetInputValueB,
}) {
  const refCanvas = React.useRef(null);
  const refInputA = React.useRef(null);
  const refInputB = React.useRef(null);
  const [inputValueA, setInputValueA] = React.useState(null);

  function handleChangeValueA(evt) {
    setInputValueA(+evt.target.value);
  }

  function handleChangeValueB(evt) {
    onSetInputValueB(+evt.target.value);
  }

  React.useEffect(() => {
    const canvas = refCanvas.current;
    const ctx = canvas.getContext('2d');

    drowCanvasArrow(ctx, 37, valueA, refInputA.current, 0);

    if (inputValueA === valueA) {
      drowCanvasArrow(
        ctx,
        calcEndAxisX(valueA),
        valueAnswer,
        refInputB.current,
        calcEndAxisX(valueA)
      );
    }
  }, [valueA, valueB, inputValueA]);

  function calcEndAxisX(value) {
    return 38.7 * (value + 1);
  }

  function drowCanvasArrow(
    ctx,
    startAxisX,
    value,
    inputNode,
    secondArrowStartAxisX
  ) {
    if (value !== null) {
      const axisY = 136;
      const endAxisX = calcEndAxisX(value);
      ctx.beginPath();
      ctx.moveTo(startAxisX, axisY);
      const targetX = (endAxisX - startAxisX) / 2 + startAxisX;
      const targetY = endAxisX * 0.01;
      ctx.quadraticCurveTo(targetX, targetY, endAxisX, axisY);

      const headLength = 15;
      const angleArrow = Math.atan2(axisY, targetX - secondArrowStartAxisX);
      ctx.moveTo(
        endAxisX - headLength * Math.cos(angleArrow - Math.PI / 6),
        axisY - headLength * Math.sin(angleArrow - Math.PI / 6)
      );
      ctx.lineTo(endAxisX, axisY);
      ctx.lineTo(
        endAxisX - headLength * Math.cos(angleArrow + Math.PI / 6),
        axisY - headLength * Math.sin(angleArrow + Math.PI / 6)
      );

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.stroke();
      ctx.closePath();

      setInputPos(inputNode, startAxisX, endAxisX, axisY);
    }
  }

  function setInputPos(inputNode, startAxisX, endAxisX, axisY) {
    inputNode.style.position = 'absolute';
    inputNode.style.bottom = `${axisY + 15}px`;
    inputNode.style.left = `${(startAxisX + endAxisX) / 2 - 25}px`;
  }

  return (
    <section className='decision'>
      <input
        className={cn('input', { input_invalid: inputValueA !== valueA })}
        disabled={inputValueA === valueA}
        onChange={handleChangeValueA}
        ref={refInputA}
        name='inputValueA'
        type='text'
        maxLength='2'
        size='1'
      />
      <input
        className={cn(
          'input',
          { input_invisible: inputValueA !== valueA },
          { input_invalid: inputValueB !== valueB }
        )}
        disabled={inputValueB === valueB}
        onChange={handleChangeValueB}
        ref={refInputB}
        name='inputValueB'
        type='text'
        maxLength='2'
        size='1'
      />
      <canvas
        ref={refCanvas}
        className='canvas-arrow'
        width='875'
        height='200'
      ></canvas>
    </section>
  );
}

export default Decision;
