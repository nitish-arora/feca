import React from 'react';
import IFrame from './iframe';
import renderer from 'react-test-renderer';

const src= "";
const height = "";
const width = "";

test('should match snapshot with hidden options', () => {
  const component = renderer.create(
    <IFrame src={src} height={height} width={width} />
  );
  
  expect(component.toJSON()).toMatchSnapshot();
});