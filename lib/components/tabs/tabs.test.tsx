import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import listStyles from '../tabsList/tabsList.module.css';
import { Tabs, type TabsProps } from './tabs';

const renderTabs = (props: TabsProps) => {
  return render(<Tabs {...props} />);
};

describe('Tabs Component', () => {
  it('renders the tabs with correct labels', () => {
    renderTabs({
      items: [
        {
          content: 'Content 1',
          label: 'Segment 1',
          value: 'segment01',
        },
        {
          content: 'Content 2',
          label: 'Segment 2',
          value: 'segment02',
        },
      ],
    });
    expect(screen.getByText('Segment 1')).toBeInTheDocument();
    expect(screen.getByText('Segment 2')).toBeInTheDocument();
  });

  // checks if the tabs are toggled correctly when clicked
  it('successfully toggles between tabs when clicked', async () => {
    renderTabs({
      defaultValue: 'segment01',
      items: [
        {
          content: 'segment01content',
          label: 'Segment 1',
          value: 'segment01',
        },
        {
          content: 'segment02content',
          label: 'Segment 2',
          value: 'segment02',
        },
      ],
    });

    const user = userEvent.setup();

    const tabTrigger1 = screen.getByText('Segment 1');
    const tabTrigger2 = screen.getByText('Segment 2');
    const tabContent1 = screen.getByText('segment01content');

    // Check initial state
    expect(tabTrigger1).toHaveAttribute('aria-selected', 'true');
    expect(tabTrigger2).toHaveAttribute('aria-selected', 'false');
    expect(tabContent1).toBeVisible();

    await user.click(tabTrigger2);

    const tabContent2 = screen.getByText('segment02content');
    expect(tabTrigger1).toHaveAttribute('aria-selected', 'false');
    expect(tabTrigger2).toHaveAttribute('aria-selected', 'true');
    expect(tabContent1).not.toBeVisible();
    expect(tabContent2).toBeVisible();
  });

  // passes additional props to the tabs subcomponents
  it('passes additional props (data-testid) to the tabs subcomponents', () => {
    renderTabs({
      items: [
        {
          content: 'Content 1',
          label: 'Segment 1',
          value: 'segment01',
        },
      ],
      tabsContentProps: {
        'data-testid': 'contentTest-id',
      },
      tabsListProps: {
        'data-testid': 'listTest-id',
      },
      tabsTriggerProps: {
        'data-testid': 'triggerTest-id',
      },
    });

    const tabList = screen.getByTestId('listTest-id');
    const tabTrigger = screen.getByTestId('triggerTest-id');
    const tabContent = screen.getByTestId('contentTest-id');

    expect(tabList).toHaveAttribute('data-testid', 'listTest-id');
    expect(tabTrigger).toHaveAttribute('data-testid', 'triggerTest-id');
    expect(tabContent).toHaveAttribute('data-testid', 'contentTest-id');
  });

  // check if disabled tabs are not clickable
  it('passes down disabled prop to the tabsTrigger correctly', async () => {
    renderTabs({
      items: [
        {
          content: 'Content 1',
          disabled: true,
          label: 'Segment 1',
          value: 'segment01',
        },
      ],
    });

    const tabTrigger = screen.getByText('Segment 1');
    expect(tabTrigger).toBeDisabled();
  });

  // changes size of the tabs
  it('changes size of the tabs correctly', () => {
    renderTabs({
      items: [
        {
          content: 'Content 1',
          label: 'Segment 1',
          value: 'segment01',
        },
      ],
      tabsListProps: {
        'data-testid': 'listest-id-2',
      },
    });

    const tabsList = screen.getByTestId('listest-id-2');
    expect(tabsList).toHaveClass(listStyles['tabs-list--small']);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderTabs({
      defaultValue: 'segment01',
      items: [
        { content: 'Content 1', label: 'Segment 1', value: 'segment01' },
        { content: 'Content 2', label: 'Segment 2', value: 'segment02' },
      ],
      tabsListProps: { 'aria-label': 'Sections' },
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
