import TabsRoot from '@components/TabsRoot';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { TabsList } from '../tabsList/tabsList';
import { TabsTrigger } from '../tabsTrigger/tabsTrigger';
import { TabsContent } from './tabsContent';

describe('TabsContent Component', () => {
  it('renders the content for the active tab', () => {
    render(
      <TabsRoot defaultValue="segment01">
        <TabsList>
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
          <TabsTrigger value="segment02">Segment 2</TabsTrigger>
        </TabsList>
        <TabsContent value="segment01">Content 1</TabsContent>
        <TabsContent value="segment02">Content 2</TabsContent>
      </TabsRoot>,
    );

    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches visible content when a different tab is selected', async () => {
    const user = userEvent.setup();
    render(
      <TabsRoot defaultValue="segment01">
        <TabsList>
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
          <TabsTrigger value="segment02">Segment 2</TabsTrigger>
        </TabsList>
        <TabsContent value="segment01">Content 1</TabsContent>
        <TabsContent value="segment02">Content 2</TabsContent>
      </TabsRoot>,
    );

    await user.click(screen.getByText('Segment 2'));

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('applies a custom className', () => {
    const customClassName = 'custom-content-class';
    render(
      <TabsRoot defaultValue="segment01">
        <TabsList>
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
        </TabsList>
        <TabsContent className={customClassName} value="segment01">
          Content 1
        </TabsContent>
      </TabsRoot>,
    );

    expect(screen.getByRole('tabpanel')).toHaveClass(customClassName);
  });

  it('forwards the data-testid prop', () => {
    render(
      <TabsRoot defaultValue="segment01">
        <TabsList>
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
        </TabsList>
        <TabsContent data-testid="content-1" value="segment01">
          Content 1
        </TabsContent>
      </TabsRoot>,
    );

    expect(screen.getByTestId('content-1')).toBeInTheDocument();
  });

  it('associates the content with its trigger via aria-labelledby', () => {
    render(
      <TabsRoot defaultValue="segment01">
        <TabsList>
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
        </TabsList>
        <TabsContent value="segment01">Content 1</TabsContent>
      </TabsRoot>,
    );

    const trigger = screen.getByRole('tab');
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', trigger.id);
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
