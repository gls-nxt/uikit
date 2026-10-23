import { MenuItem } from '@components/menuItem';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createPortal } from 'react-dom';
import { describe, expect, it, vi } from 'vitest';

import Dialog from '../dialog';

import { Menu } from './menu';

vi.mock('@radix-ui/react-dropdown-menu', () => {
  const actual = vi.importActual('@radix-ui/react-dropdown-menu');
  return {
    ...actual,
    Content: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props} role="menu">
        {children}
      </div>
    ),
    Group: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    Item: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props} role="menuitem" tabIndex={-1}>
        {children}
      </div>
    ),
    Label: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    Portal: ({
      children,
      container,
    }: {
      children: React.ReactNode;
      container?: HTMLElement | null;
    }) => (container ? createPortal(children, container) : <div>{children}</div>),
    Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Trigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

describe('Menu component', () => {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  const renderMenu = (props = {}) => {
    return render(
      <Menu items={items} trigger={<button type="button">toggle</button>} {...props} />,
    );
  };

  it('renders trigger button', () => {
    renderMenu();
    expect(screen.getByText('toggle')).toBeInTheDocument();
  });

  it('should open menu when the trigger is clicked', () => {
    renderMenu({ 'data-testid': 'menu-content' });
    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('menu-content')).toBeInTheDocument();
  });

  it('should render the menu items when open', () => {
    renderMenu({ 'data-testid': 'menu-content' });
    fireEvent.click(screen.getByText('toggle'));
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders children when items prop is not provided', () => {
    renderMenu({
      children: (
        <>
          {items.map((item) => (
            <MenuItem key={item} label={item} />
          ))}
        </>
      ),
      items: undefined,
    });
    fireEvent.click(screen.getByText('toggle'));
    items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-menu-class';
    renderMenu({ className: customClass });

    fireEvent.click(screen.getByText('toggle'));
    const content = screen.getByRole('menu');
    expect(content).toHaveClass(customClass);
  });

  test('renders with data-testid', async () => {
    const testId = 'menu-item-test-id';
    renderMenu({ 'data-testid': testId });
    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('renders inside the provided portal container', () => {
    const portalContainer = document.createElement('div');
    document.body.appendChild(portalContainer);

    renderMenu({ 'data-testid': 'menu-content', portalProps: { container: portalContainer } });
    fireEvent.click(screen.getByText('toggle'));

    expect(portalContainer.querySelector('[data-testid="menu-content"]')).toBeInTheDocument();

    portalContainer.remove();
  });

  it('renders inside the native dialog when used in Dialog.Content', () => {
    const { container } = render(
      <Dialog.Root id="menu-dialog">
        <Dialog.Content aria-labelledby="menu-dialog-title">
          <Dialog.Title id="menu-dialog-title">Dialog title</Dialog.Title>
          <Menu
            data-testid="menu-content"
            items={items}
            trigger={<button type="button">toggle</button>}
          />
        </Dialog.Content>
      </Dialog.Root>,
    );

    container.querySelector('dialog')?.setAttribute('open', '');
    fireEvent.click(screen.getByText('toggle'));

    expect(container.querySelector('dialog')).toContainElement(screen.getByTestId('menu-content'));
  });

  describe('compound API', () => {
    const renderCompound = (portalProps = {}) =>
      render(
        <Menu.Root>
          <Menu.Trigger>
            <button type="button">toggle</button>
          </Menu.Trigger>
          <Menu.Portal {...portalProps}>
            <Menu.Content data-testid="menu-content">
              <Menu.Group>
                <Menu.Heading label="Group" />
                <Menu.Item label="Item 1" />
                <Menu.Item label="Item 2" />
              </Menu.Group>
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>,
      );

    it('renders the segments composed by hand', () => {
      renderCompound();
      fireEvent.click(screen.getByText('toggle'));

      expect(screen.getByTestId('menu-content')).toBeInTheDocument();
      expect(screen.getByText('Group')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('honours a container on Menu.Portal', () => {
      const portalContainer = document.createElement('div');
      document.body.appendChild(portalContainer);

      renderCompound({ container: portalContainer });
      fireEvent.click(screen.getByText('toggle'));

      expect(portalContainer.querySelector('[data-testid="menu-content"]')).toBeInTheDocument();

      portalContainer.remove();
    });

    it('exposes every segment on the Menu object', () => {
      expect([
        Menu.Root,
        Menu.Trigger,
        Menu.Portal,
        Menu.Content,
        Menu.Group,
        Menu.Heading,
        Menu.Item,
      ]).not.toContain(undefined);
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = renderMenu();
    fireEvent.click(screen.getByText('toggle'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
