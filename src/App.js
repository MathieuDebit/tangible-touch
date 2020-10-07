import React, { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const canvas = useRef(null);

  const [touches, setTouches] = useState([]);

  useEffect(() => {
    const canvasEl = canvas.current;

    canvasEl.addEventListener('touchstart', handleStart, false);
    canvasEl.addEventListener('touchend', handleEnd, false);
    canvasEl.addEventListener('touchcancel', handleCancel, false);
    canvasEl.addEventListener('touchmove', handleMove, false);

    return () => {
      canvasEl.removeEventListener('touchstart', handleStart);
      canvasEl.removeEventListener('touchend', handleEnd);
      canvasEl.removeEventListener('touchcancel', handleCancel);
      canvasEl.removeEventListener('touchmove', handleMove);
    };
  });

  function handleStart(event) {
    event.preventDefault();

    const context = canvas.current.getContext('2d');
    const changedTouches = event.changedTouches;
    setTouches(() => event.touches);
    console.log('handleStart', event.touches);

    for (let i = 0; i < changedTouches.length; i++) {
      const color = colorForTouch(changedTouches[i]);
      context.beginPath();
      context.lineWidth = 5;
      context.arc(changedTouches[i].pageX, changedTouches[i].pageY, 50, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.stroke();
      log('touchstart: ' + i);
    }

  }

  function handleMove(event) {
    event.preventDefault();

    const context = canvas.current.getContext('2d');
    const changedTouches = event.changedTouches;
    setTouches(() => event.touches);

    for (let i = 0; i < changedTouches.length; i++) {
      const color = colorForTouch(changedTouches[i]);
      context.beginPath();
      context.clearRect(changedTouches[i].pageX - 100, touches[i].pageY - 100, 200, 200);
      context.arc(changedTouches[i].pageX, changedTouches[i].pageY, 50, 0, 2 * Math.PI, false);
      context.stokeStyle = color;
      context.stroke();
    }
  }

  function handleEnd(event) {
    event.preventDefault();

    const context = canvas.current.getContext('2d');
    const changedTouches = event.changedTouches;
    setTouches(() => event.touches);
    console.log('handleEnd', event.touches);

    for (let i = 0; i < changedTouches.length; i++) {
      log('touchend: ' + i);
      // const color = colorForTouch(touches[i]);
      context.clearRect(changedTouches[i].pageX - 55, changedTouches[i].pageY - 55, 110, 110);
    }
  }

  function handleCancel(event) {
    event.preventDefault();

    log('touchcancel');

    const changedTouches = event.changedTouches;
    setTouches(() => event.touches);

    for (let i = 0; i < changedTouches.length; i++) {
    }
  }

  function colorForTouch(touch) {
    let r = touch.identifier % 16;
    let g = Math.floor(touch.identifier / 3) % 16;
    let b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    const color = '#' + r + g + b;
    // log('color for touch with identifier ' + touch.identifier + ': ' + color);
    return color;
  }

  function log(msg) {
    const p = document.getElementById('log');
    p.innerHTML = msg + '<br>' + p.innerHTML;
  }

  return (
    <div className="App">
      <canvas ref={canvas} width={window.innerWidth} height={window.innerHeight}>
        Your browser does not support canvas element.
      </canvas>
      <br/>
      <div className="box">
        <h1>{touches.length}</h1>
        <pre id="log">Ready</pre>
      </div>
    </div>
  );
}

export default App;
