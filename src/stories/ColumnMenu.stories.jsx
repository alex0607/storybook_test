import React from 'react';

import { ColumnMenu } from './ColumnMenu';

const generateItems = (length) =>
  Array.from({ length }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    value: `item ${k}`
  }));

export default {
  title: 'Example/ColumnMenu',
  component: ColumnMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <ColumnMenu {...args} />;

export const ColumnMenuExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ColumnMenuExample.args = {
  defaultItems: generateItems(15),
};
