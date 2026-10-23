import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import type { ComponentProps, RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ListBox, ListBoxItem, type ListBoxProps } from './listBox';

function setup(props?: Partial<ListBoxProps>) {
  return render(
    <ListBox
      id="id"
      onSelect={() => {}}
      options={[
        { id: '1', value: 'child-1' },
        { id: '2', value: 'child-2' },
      ]}
      {...props}
    />,
  );
}

describe('ListBox', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('has role "listbox"', () => {
    const { getByRole } = setup();

    getByRole('listbox');
  });

  it('passes correct aria-posinset attribute to items', () => {
    const { getAllByRole } = setup();

    const options = getAllByRole('option');

    expect(options[0].getAttribute('aria-posinset')).toBe('1');
    expect(options[1].getAttribute('aria-posinset')).toBe('2');
  });

  it('passes correct aria-setsize attribute to items', () => {
    const { getAllByRole } = setup();

    const options = getAllByRole('option');

    expect(options[0].getAttribute('aria-setsize')).toBe(options.length.toString());
    expect(options[1].getAttribute('aria-setsize')).toBe(options.length.toString());
  });

  it('sets passed id', () => {
    const { getByRole } = setup({ id: 'listbox-id' });

    expect(getByRole('listbox').getAttribute('id')).toBe('listbox-id');
  });

  it('sets isSelected to true for an item with the "selected" id', () => {
    const { getByText } = setup({
      selected: '2',
    });

    expect(getByText('child-2').getAttribute('aria-selected')).toBe('true');
  });

  it('handles focus when on arrows presses', async () => {
    const { getByRole, getAllByRole } = setup();

    const listbox = getByRole('listbox');
    const options = getAllByRole('option');

    await waitFor(() => listbox.focus());

    expect(options[0]).toHaveFocus();
    await userEvent.keyboard('{arrowDown}');
    expect(options[1]).toHaveFocus();
    await userEvent.keyboard('{arrowDown}');
    expect(options[1]).toHaveFocus();
    await userEvent.keyboard('{arrowUp}');
    expect(options[0]).toHaveFocus();
    await userEvent.keyboard('{arrowUp}');
  });

  it('moves focus to anchorRef element if provided on arrow up press', async () => {
    const focus = vi.fn();

    const { getByRole } = setup({
      anchorRef: { current: { focus } } as unknown as RefObject<HTMLElement>,
    });

    const listbox = getByRole('listbox');
    await waitFor(() => listbox.focus());
    await userEvent.keyboard('{arrowUp}');

    expect(focus).toBeCalledTimes(1);
  });

  it('moves focus to anchorRef element if provided on tab press', async () => {
    const focus = vi.fn();

    const { getByRole } = setup({
      anchorRef: { current: { focus } } as unknown as RefObject<HTMLElement>,
    });

    const listbox = getByRole('listbox');
    await waitFor(() => listbox.focus());
    await userEvent.keyboard('{tab}');

    expect(focus).toBeCalledTimes(1);
  });

  it('calls scrollIntoView when focused and scrollToSelected is true', async () => {
    const scrollIntoView = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

    const { getByRole } = setup();

    const listbox = getByRole('listbox');
    await waitFor(() => listbox.focus());

    expect(scrollIntoView).toBeCalledTimes(1);
  });

  it('calls scrollIntoView when selected changed scrollToSelected is true', () => {
    const scrollIntoView = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

    const { rerender } = setup({ selected: '1' });

    rerender(
      <ListBox
        id="id"
        onSelect={() => {}}
        options={[
          { id: '1', value: 'child-1' },
          { id: '2', value: 'child-2' },
        ]}
        selected="2"
      />,
    );

    expect(scrollIntoView).toBeCalledTimes(2);
  });

  it('has no accessibility violations', async () => {
    const { container } = setup({ 'aria-label': 'Items' } as Partial<ListBoxProps>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

function setupItem(props: Partial<ComponentProps<typeof ListBoxItem>>) {
  return render(
    <ListBoxItem
      hasFocus={false}
      isSelected={false}
      onFocus={() => {}}
      onSelect={() => {}}
      option={{ id: 'id', value: 'label' }}
      {...props}
    />,
  );
}

describe('ListBoxItem', () => {
  it('has role "option"', () => {
    const { getByRole } = setupItem({});

    getByRole('option');
  });

  it('renders option label', () => {
    const { getByText } = setupItem({ option: { id: 'id', value: 'test' } });

    getByText('test');
  });

  it('renders option value by default', () => {
    const { getByText } = setupItem({
      option: { id: 'id', value: 'test value' },
    });

    getByText('test value');
  });

  it('renders children function', () => {
    const { getByText } = setupItem({
      children: () => 'test child',
      option: { id: 'id', value: 'test' },
    });

    getByText('test child');
  });

  it('has tab index -1 if not focused', () => {
    const { getByRole } = setupItem({ hasFocus: false });

    expect(getByRole('option').getAttribute('tabindex')).toBe('-1');
  });

  it('has tab index 0 if focused', () => {
    const { getByRole } = setupItem({ hasFocus: true });

    expect(getByRole('option').getAttribute('tabindex')).toBe('0');
  });

  it('has aria-selected=true when isSelected is true', () => {
    const { getByRole } = setupItem({ isSelected: true });

    expect(getByRole('option').getAttribute('aria-selected')).toBe('true');
  });

  it('has aria-selected=false when isSelected is false', () => {
    const { getByRole } = setupItem({ isSelected: false });

    expect(getByRole('option').getAttribute('aria-selected')).toBe('false');
  });

  it('passes ref', () => {
    const ref = vi.fn();

    setupItem({ ref });
    expect(ref).toBeCalledTimes(1);
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();

    const { getByRole } = setupItem({ onSelect });

    getByRole('option').click();
    expect(onSelect).toBeCalledTimes(1);
  });

  it('prevents the pointerdown default so focus stays on the anchor element', () => {
    const { getByRole } = setupItem({});

    const event = new PointerEvent('pointerdown', { bubbles: true, cancelable: true });
    getByRole('option').dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('prevents the mousedown default so focus stays on the anchor element', () => {
    const { getByRole } = setupItem({});

    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    getByRole('option').dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('prevents the mousedown default when it originates in a child element', () => {
    const { getByText } = setupItem({
      children: (option) => <div>{option.value}</div>,
      option: { id: 'id', value: 'nested label' },
    });

    const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
    getByText('nested label').dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('does not prevent the click default, so selection still happens', () => {
    const onSelect = vi.fn();

    const { getByRole } = setupItem({ onSelect });

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    getByRole('option').dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(onSelect).toBeCalledTimes(1);
  });

  it('keeps focus on the input on pointerdown and still selects on click', async () => {
    const onSelect = vi.fn();

    const { getByRole } = render(
      <>
        <input aria-label="anchor" />
        <ListBoxItem
          hasFocus={false}
          isSelected={false}
          onFocus={() => {}}
          onSelect={onSelect}
          option={{ id: 'id', value: 'label' }}
        />
      </>,
    );

    const input = getByRole('textbox');
    input.focus();

    await userEvent.click(getByRole('option'));

    expect(input).toHaveFocus();
    expect(onSelect).toBeCalledTimes(1);
  });

  it('calls onSelect when enter pressed', async () => {
    const onSelect = vi.fn();

    const { getByRole } = setupItem({ onSelect });
    getByRole('option').focus();

    await userEvent.keyboard('{enter}');
    expect(onSelect).toBeCalledTimes(1);
  });
});
