import React from 'react';

import { CustomCheckbox } from './CustomCheckbox';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Checkbox',
  component: CustomCheckbox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <CustomCheckbox {...args} />;

export const UnChecked = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
UnChecked.args = {
  checked: false,
  label: 'Checkbox',
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: 'Checkbox',
};
