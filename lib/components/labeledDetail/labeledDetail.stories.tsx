import { CloudSnowIcon, UserIcon } from '@icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { LabeledDetail } from './LabeledDetail';

const meta = {
  component: LabeledDetail,
  title: 'Components/Labeled Detail',
} satisfies Meta<typeof LabeledDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    details: '123456789',
    iconComponent: CloudSnowIcon,
    label: 'Account',
  },
};

export const WithImage: Story = {
  args: {
    details: '987654321',
    iconImage: <img alt="Account" height={54} src="/images/locker.webp" width={54} />,
    label: 'Account',
  },
};

export const CustomLabel: Story = {
  args: {
    details: 'Some details',
    iconComponent: UserIcon,
    label: 'Custom Label',
  },
};
