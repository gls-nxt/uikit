import TabsRoot from '@components/TabsRoot';
import TabsContent from '@components/tabsContent';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { TabsList } from '../tabsList/tabsList';
import { TabsTrigger } from '../tabsTrigger/tabsTrigger';

describe('TabsTrigger Component', () => {
  // it renders the prefix correctly
  it('applies disabled state correctly', () => {
    render(
      <TabsRoot>
        <TabsList>
          <TabsTrigger disabled value="segment01">
            Segment
          </TabsTrigger>
        </TabsList>
      </TabsRoot>,
    );
    const tabTrigger = screen.getByText('Segment');
    expect(tabTrigger).toBeDisabled();
  });

  // checks if the tabs are toggled correctly when clicked
  it('toggles between tabs when clicked', async () => {
    render(
      <TabsRoot defaultValue="segment01">
        <TabsList>
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
          <TabsTrigger value="segment02">Segment 2</TabsTrigger>
        </TabsList>
        <TabsContent value="segment01">segment01content</TabsContent>
        <TabsContent value="segment02">segment02content</TabsContent>
      </TabsRoot>,
    );

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

  it('has no accessibility violations', async () => {
    const { container } = render(
      <TabsRoot defaultValue="segment01">
        <TabsList aria-label="Sections">
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
          <TabsTrigger value="segment02">Segment 2</TabsTrigger>
        </TabsList>
        <TabsContent value="segment01">Content 1</TabsContent>
        <TabsContent value="segment02">Content 2</TabsContent>
      </TabsRoot>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
