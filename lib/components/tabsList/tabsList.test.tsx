import TabsRoot from '@components/TabsRoot';
import TabsContent from '@components/tabsContent';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TabsList } from '../tabsList/tabsList';
import { TabsTrigger } from '../tabsTrigger/tabsTrigger';

import listStyles from './tabsList.module.css';

describe('TabsList Component', () => {
  it('renders small size variant correctly by default', () => {
    render(
      <TabsRoot>
        <TabsList>
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
          <TabsTrigger value="segment02">Segment 2</TabsTrigger>
        </TabsList>
      </TabsRoot>,
    );
    const tabList = screen.getByRole('tablist');
    expect(tabList).toBeInTheDocument();
    expect(tabList).toHaveClass(listStyles['tabs-list--small']);
  });

  it('renders large size variant correctly', () => {
    render(
      <TabsRoot>
        <TabsList size="large">
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
          <TabsTrigger value="segment02">Segment 2</TabsTrigger>
        </TabsList>
      </TabsRoot>,
    );
    const tabList = screen.getByRole('tablist');
    expect(tabList).toBeInTheDocument();
    expect(tabList).toHaveClass(listStyles['tabs-list--large']);
  });

  // it accepts custom classNames and renders them correctly
  it('accepts custom classNames and renders them correctly', () => {
    const customClassName = 'custom-class';
    render(
      <TabsRoot>
        <TabsList className={customClassName}>
          <TabsTrigger value="segment01">Segment 1</TabsTrigger>
          <TabsTrigger value="segment02">Segment 2</TabsTrigger>
        </TabsList>
      </TabsRoot>,
    );
    const tabList = screen.getByRole('tablist');
    expect(tabList).toBeInTheDocument();
    expect(tabList).toHaveClass(customClassName);
  });

  it('renders the default tab variant and content correctly', () => {
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
    const selectedTabTrigger = screen.getByText('Segment 1');
    expect(selectedTabTrigger).toBeInTheDocument();
    expect(selectedTabTrigger).toHaveAttribute('aria-selected', 'true');

    const notSelectedTabTrigger = screen.getByText('Segment 2');
    expect(notSelectedTabTrigger).toHaveAttribute('aria-selected', 'false');

    const selectedTabContent = screen.getByText('Content 1');
    expect(selectedTabContent).toBeInTheDocument();
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
