import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react-lite';

import range from 'lodash/range';
import styled from 'styled-components';
import classNames from 'classnames';
import { clicker } from './store/clicker';
import { autorun, reaction, when } from 'mobx';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
const ProgressStyled = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 1rem;
  padding: 13px;
  .progress-block {
    flex-shrink: 0;
    width: 5px;
    height: 1rem;
    &.active {
      background-color: yellow;
    }
    &.active.merge {
      background-color: green;
    }
    background-color: #efefef;
  }
`;

const ProgressBlock: React.FC<{
  ele: { click: boolean; act: boolean };
  i: number;
}> = observer((props) => {
  return (
    <div
      className={classNames('progress-block', {
        merge: props.ele.click,
        active: props.ele.act,
      })}
    ></div>
  );
});

const Progress: React.FC<{ pinned: { click: boolean; act: boolean }[] }> =
  observer((props) => {
    return (
      <ProgressStyled className="progress">
        {props.pinned.map((ele, index) => (
          <ProgressBlock ele={ele} key={index} i={index} />
        ))}
      </ProgressStyled>
    );
  });

function App() {
  const [throttleList] = useState(() =>
    clicker.create({
      index: 0,
      list: range(0, 1000).map((_) => ({ click: false, act: false })),
      start: false,
    })
  );

  const [debounceList] = useState(() =>
    clicker.create({
      index: 0,
      list: range(0, 1000).map((_) => ({ click: false, act: false })),
      start: false,
    })
  );

  const throttleClick = useMemo(() => throttle(throttleList.click, 1200), []);
  const debounceClick = useMemo(() => debounce(debounceList.click, 1200), []);

  useEffect(() => {
    let throttleId = -1;
    const throttleDeposer = autorun(() => {
      if (throttleList.start)
        throttleId = setInterval(throttleList.increase, 100);
      else {
        clearInterval(throttleId);
        throttleList.reset();
      }
    });

    let debounceId = -1;
    const debounceDeposer = autorun(() => {
      if (debounceList.start)
        debounceId = setInterval(debounceList.increase, 100);
      else {
        clearInterval(debounceId);
        debounceList.reset();
      }
    });

    return () => {
      clearInterval(throttleId);
      clearInterval(debounceId);
      throttleDeposer();
      debounceDeposer();
    };
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          debounceList.reset();
          throttleList.reset();
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          debounceList.startCount();
          throttleList.startCount();
        }}
      >
        start
      </button>
      <h3>debounce progress~</h3>
      <button onClick={debounceClick}>click</button>
      <div>
        <Progress pinned={debounceList.list} />
      </div>
      <br />
      <h3>throttle progress~</h3>
      <button onClick={throttleClick}>click</button>
      <div>
        <Progress pinned={throttleList.list} />
      </div>
    </div>
  );
}

export default observer(App);
