import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { action } from 'storybook/actions';

import { Combobox } from './combobox';

const meta = {
  args: {
    onSelect: action('onSelect'),
  },
  component: Combobox,
  parameters: {
    actions: {
      handles: ['select'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/rUvwRrvXRta7egY4ju7JQm/Unity-Design-System?node-id=1325-26433&node-type=frame&t=nq1T1KcBhWSL314j-0',
    },
    docs: {
      description: {
        component:
          'Accessible autocomplete input that enables users to filter a list of options and select one or more values. It uses popover and input components under the hood.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Combobox',
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: function Render(args) {
    const [selected, onSelect] = useState<string>();

    const options = useMemo(() => {
      return countries.map((country) => ({
        id: country.countryName,
        value: country.countryName,
      }));
    }, []);

    return (
      <Combobox
        {...args}
        inputProps={{ ...args.inputProps, fullWidth: true, label: 'Country' }}
        onSelect={(option) => onSelect(option?.id)}
        options={options}
        selected={selected}
      />
    );
  },
};

export const Controlled: Story = {
  render: function Render(args) {
    const [selected, onSelect] = useState<string>();
    const [value, setValue] = useState('');

    const options = useMemo(
      () =>
        value
          ? [...Array(3).keys()].map((_, index) => ({
              id: index.toString(),
              value: value.repeat(index + 1),
            }))
          : [],
      [value],
    );

    return (
      <Combobox
        {...args}
        inputProps={{
          label: 'Controlled',
          onChange: (event) => {
            setValue(event?.target.value);
          },
          value,
        }}
        onSelect={(option) => {
          onSelect(option?.id);
          setValue(option?.value ?? '');
        }}
        options={options}
        selected={selected}
      />
    );
  },
};

export const SizeSmall: Story = {
  ...Default,
  args: {
    size: 'sm',
  },
};

export const EmptyOptions: Story = {
  ...Default,
  args: {
    options: [],
  },
};

export const EmptyListPlaceholder: Story = {
  ...Default,
  args: {
    emptyListPlaceholder: <div>Nothing here</div>,
  },
};

export const Prefix: Story = {
  ...Default,
  args: {
    inputProps: {
      slots: {
        prefix: <div style={{ height: 20, width: 20 }}>✔</div>,
      },
    },
  },
};

export const Suffix: Story = {
  ...Default,
  args: {
    inputProps: {
      slots: {
        suffix: <div style={{ height: 20, width: 20 }}>✔</div>,
      },
    },
  },
};

export const AssistiveHint: Story = {
  ...Default,
  args: {
    assistiveHint: 'Assistive hint',
  },
};

export const AssistiveStatusMessage: Story = {
  ...Default,
  args: {
    assistiveStatusMessage: 'Assistive status message',
  },
};

export const NoScrollIndicator: Story = {
  ...Default,
  args: {
    options: [
      { id: '1', value: 'option 1' },
      { id: '2', value: 'option 2' },
      { id: '3', value: 'option 3' },
      { id: '4', value: 'option 4' },
      { id: '5', value: 'option 5' },
      { id: '6', value: 'option 6' },
      { id: '7', value: 'option 7' },
      { id: '8', value: 'option 8' },
      { id: '9', value: 'option 9' },
      { id: '10', value: 'option 10' },
    ],
    scrollIndicator: false,
  },
};

export const ListFooter: Story = {
  ...Default,
  render: function Render(args) {
    const [selected, onSelect] = useState<string>();

    const options = useMemo(() => {
      return countries.map((country) => ({
        id: country.countryName,
        value: country.countryName,
      }));
    }, []);

    return (
      <Combobox
        {...args}
        inputProps={{ ...args.inputProps, fullWidth: true, label: 'Country' }}
        listFooter={
          <div style={{ borderTop: '1px solid #eee', padding: '8px 16px' }}>
            Custom footer content
          </div>
        }
        onSelect={(option) => onSelect(option?.id)}
        options={options}
        selected={selected}
      />
    );
  },
};
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
  {
    countryName: 'Denmark',
    destinationCountryCode: 'DK',
    flagEmoji: '🇩🇰',
  },
  {
    countryName: 'Lithuania',
    destinationCountryCode: 'LT',
    flagEmoji: '🇱🇹',
  },
  {
    countryName: 'Luxembourg',
    destinationCountryCode: 'LU',
    flagEmoji: '🇱🇺',
  },
  {
    countryName: 'Latvia',
    destinationCountryCode: 'LV',
    flagEmoji: '🇱🇻',
  },
  {
    countryName: 'Croatia',
    destinationCountryCode: 'HR',
    flagEmoji: '🇭🇷',
  },
  {
    countryName: 'France',
    destinationCountryCode: 'FR',
    flagEmoji: '🇫🇷',
  },
  {
    countryName: 'Hungary',
    destinationCountryCode: 'HU',
    flagEmoji: '🇭🇺',
  },
  {
    countryName: 'Sweden',
    destinationCountryCode: 'SE',
    flagEmoji: '🇸🇪',
  },
  {
    countryName: 'Slovenia',
    destinationCountryCode: 'SI',
    flagEmoji: '🇸🇮',
  },
  {
    countryName: 'Monaco',
    destinationCountryCode: 'MC',
    flagEmoji: '🇲🇨',
  },
  {
    countryName: 'Slovakia',
    destinationCountryCode: 'SK',
    flagEmoji: '🇸🇰',
  },
  {
    countryName: 'Ireland',
    destinationCountryCode: 'IE',
    flagEmoji: '🇮🇪',
  },
  {
    countryName: 'Estonia',
    destinationCountryCode: 'EE',
    flagEmoji: '🇪🇪',
  },
  {
    countryName: 'Italy',
    destinationCountryCode: 'IT',
    flagEmoji: '🇮🇹',
  },
  {
    countryName: 'Spain',
    destinationCountryCode: 'ES',
    flagEmoji: '🇪🇸',
  },
  {
    countryName: 'Austria',
    destinationCountryCode: 'AT',
    flagEmoji: '🇦🇹',
  },
  {
    countryName: 'Czechia',
    destinationCountryCode: 'CZ',
    flagEmoji: '🇨🇿',
  },
  {
    countryName: 'Nicaragua',
    destinationCountryCode: 'NI',
    flagEmoji: '🇳🇮',
  },
  {
    countryName: 'Poland',
    destinationCountryCode: 'PL',
    flagEmoji: '🇵🇱',
  },
  {
    countryName: 'Romania',
    destinationCountryCode: 'RO',
    flagEmoji: '🇷🇴',
  },
  {
    countryName: 'Netherlands',
    destinationCountryCode: 'NL',
    flagEmoji: '🇳🇱',
  },
];
