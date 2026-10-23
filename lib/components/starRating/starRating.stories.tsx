import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import StarRating, { type StarRatingProps } from './starRating';

const meta = {
  args: {
    onSubmit: action('onSubmit'),
  },
  argTypes: {
    'data-testid': {
      control: 'text',
      description: 'Sets a `data-testid` attribute to the button for testing purposes.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled and cannot be interacted with.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    labels: {
      control: 'object',
      description: 'The labels for the stars.',
      table: {
        type: {
          detail: '{ 1: "string", 2: "string", 3: "string", 4: "string", 5: "string" }',
          summary: 'object',
        },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the component is in a loading animation and cannot be interacted with.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onSubmit: {
      action: 'onSubmit',
      description: 'The callback function that is executed when a rating is submitted.',
      table: {
        category: 'Actions',
        type: { summary: '(rating: number) => void' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the label when no rating is selected.',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'The title/question of the field.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  component: StarRating,
  parameters: {
    actions: {
      handles: ['onSubmit'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Kkxbf7yNOvmTZ7bMFtcoRg/Purchase-Flow?node-id=9913-1856&m=dev',
    },
    docs: {
      description: {
        component: 'Star Rating component for gathering user feedback.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/StarRating',
} satisfies Meta<typeof StarRating>;

export default meta;

const Template: StoryObj<StarRatingProps> = {
  render: ({ ...args }) => (
    <form>
      <StarRating {...args} />
    </form>
  ),
};

export const Default: StoryObj<StarRatingProps> = {
  ...Template,
  args: {
    disabled: false,
    labels: { 1: 'Terrible', 2: 'Poor', 3: 'Average', 4: 'Good', 5: 'Excellent' },
    loading: false,
    onSubmit: (rating) => alert(`Rating submitted: ${rating}`),
    placeholder: 'Click to rate',
    title: 'How was your experience?',
  },
};

export const Loading: StoryObj<StarRatingProps> = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Disabled: StoryObj<StarRatingProps> = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
    title: 'Keyboard navigation does not focus this fieldset when it is disabled',
  },
};

export const LongText: StoryObj<StarRatingProps> = {
  ...Default,
  args: {
    ...Default.args,
    disabled: false,
    labels: {
      1: 'Terrible, super very ultra long label for star 1, they should never be this long or the users will be confused',
      2: 'Poor, super very ultra long label for star 2, they should never be this long or the users will be confused',
      3: 'Average, super very ultra long label for star 3, they should never be this long or the users will be confused',
      4: 'Good, super very ultra long label for star 4, they should never be this long or the users will be confused',
      5: 'Excellent, super very ultra long label for star 5, they should never be this long or the users will be confused',
    },
    loading: false,
    onSubmit: (rating) => alert(`Rating submitted: ${rating}`),
    placeholder:
      'Please select one of the ratings displayed above this label, otherwise the user will not be able to submit the rating, and forward their opinion to us in order for us to improve our services',
    title:
      'How was your experience? Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
  },
};
