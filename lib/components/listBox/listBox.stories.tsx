import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { ListBox } from './listBox';

const meta = {
  args: {
    onSelect: action('onSelect'),
  },
  component: ListBox,
  parameters: {
    actions: {
      handles: ['select'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?node-id=1325-26433&node-type=frame&t=WXY6OvkJJFs2NEPl-0',
    },
    docs: {
      description: {
        component:
          'A listbox widget presents a list of options and allows a user to select one or more of them.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/ListBox',
} satisfies Meta<typeof ListBox>;

export default meta;

type Story = StoryObj<typeof meta>;

const countries = [
  {
    countryName: 'Germany',
    destinationCountryCode: 'DE',
    flagEmoji: '🇩🇪',
  },
  {
    countryName: 'Finland',
    destinationCountryCode: 'FI',
    flagEmoji: '🇫🇮',
  },
  {
    countryName: 'Belgium',
    destinationCountryCode: 'BE',
    flagEmoji: '🇧🇪',
  },
  {
    countryName: 'Portugal',
    destinationCountryCode: 'PT',
    flagEmoji: '🇵🇹',
  },
  {
    countryName: 'Bulgaria',
    destinationCountryCode: 'BG',
    flagEmoji: '🇧🇬',
  },
];

export const Default: Story = {
  args: {
    'aria-label': 'Countries',
    id: 'list-box-default',
    options: countries.map((country) => ({
      id: country.countryName,
      value: country.countryName,
    })),
  },
};
