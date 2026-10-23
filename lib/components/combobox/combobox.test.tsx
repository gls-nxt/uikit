import { fireEvent, render, renderHook, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import Dialog from '../dialog';

import { Combobox, type ComboboxProps } from './combobox';

const defaultProps = {
  onSelect: () => {},
  options: [
    { id: '1', value: 'child-1' },
    { id: '2', value: 'child-2' },
  ],
};

function setup(props?: Partial<ComboboxProps>) {
  return render(<Combobox {...defaultProps} {...props} />);
}

describe('Combobox', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('sets input role to "combobox"', () => {
    const { getByRole } = setup();

    getByRole('combobox');
  });

  it('passes input ref to input', () => {
    const {
      result: { current: inputRef },
    } = renderHook(() => useRef<HTMLInputElement>(null));

    setup({ inputRef });
    expect(inputRef.current).not.toBeNull();
  });

  it('opens on input click', async () => {
    const { getByRole } = setup();

    const input = getByRole('combobox');
    await waitFor(() => input.click());

    getByRole('listbox');
  });

  it('does not open on input focus', () => {
    const { getByRole, queryByRole } = setup();

    getByRole('combobox').focus();

    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens on arrow down press', async () => {
    const { queryByRole, getByRole } = setup();

    getByRole('combobox').focus();
    await userEvent.keyboard('{arrowDown}');
    await userEvent.keyboard('{enter}');
    expect(queryByRole('listbox')).not.toBeInTheDocument();

    await userEvent.keyboard('{arrowDown}');
    getByRole('listbox');
  });

  it('sets aria-expanded to "true" when opened', () => {
    const { getByRole } = setup();

    const input = getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-autocomplete to "list"', () => {
    const { getByRole } = setup();

    expect(getByRole('combobox')).toHaveAttribute('aria-autocomplete', 'list');
  });

  it('sets aria-controls to list id value', () => {
    const { getByRole } = setup({ options: [{ id: 'id', value: 'label' }] });

    const input = getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const listId = getByRole('listbox').getAttribute('id');
    expect(getByRole('combobox')).toHaveAttribute('aria-controls', listId);
  });

  it('sets aria-describedby to assistive hint id if assistiveHint passed', () => {
    const { getByText, getByRole } = setup({ assistiveHint: 'hint' });

    const input = getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const hintId = getByText('hint').getAttribute('id');
    expect(getByRole('combobox')).toHaveAttribute('aria-describedby', hintId);
  });

  it('passes input id as aria-labelledby to ListBox', () => {
    const { getByRole } = setup({ options: [{ id: 'id', value: 'label' }] });

    const input = getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const inputId = getByRole('combobox').getAttribute('id');
    expect(getByRole('listbox')).toHaveAttribute('aria-labelledby', inputId);
  });

  it('renders assistive status message if passed', () => {
    const { getByRole, getByText } = setup({ assistiveStatusMessage: 'message' });

    const input = getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const message = getByText('message');

    expect(message).toHaveRole('status');
    expect(message).toHaveAttribute('aria-live', 'polite');
    expect(message).toHaveAttribute('aria-atomic', 'true');
  });

  it('renders empty state if passed and options are empty', () => {
    const { getByRole, getByText } = setup({ emptyListPlaceholder: 'empty state', options: [] });

    const input = getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    getByText('empty state');
  });

  it('handles focus on arrow presses', async () => {
    const { getByRole, getAllByRole } = setup();

    const input = getByRole('combobox');
    input.focus();

    await userEvent.keyboard('{arrowDown}');
    const options = getAllByRole('option');

    expect(options[0]).toHaveFocus();
    await userEvent.keyboard('{arrowDown}');
    expect(options[1]).toHaveFocus();
    await userEvent.keyboard('{arrowDown}');
    expect(options[1]).toHaveFocus();
    await userEvent.keyboard('{arrowUp}');
    expect(options[0]).toHaveFocus();
    await userEvent.keyboard('{arrowUp}');
    expect(input).toHaveFocus();
    await userEvent.keyboard('{arrowUp}');
    expect(input).toHaveFocus();
  });

  it('closes and loses focus after pressing tab', async () => {
    const { getByRole, queryByRole } = setup();

    const input = getByRole('combobox');

    input.focus();
    await userEvent.tab();
    expect(input).not.toHaveFocus();

    input.focus();
    await userEvent.keyboard('{arrowDown}');
    await userEvent.tab();

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    expect(input).not.toHaveFocus();
  });

  it('closes list and keeps focus on the input after pressing escape', async () => {
    const { getByRole, queryByRole } = setup();

    const input = getByRole('combobox');
    input.focus();

    await userEvent.keyboard('{arrowDown}');
    await userEvent.keyboard('{escape}');

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('calls onSelect and sets focus to the input after selecting value with keyboard', async () => {
    const onSelect = vi.fn();

    const { getByRole, queryByRole } = setup({ onSelect });

    const input = getByRole('combobox');
    input.focus();

    await userEvent.keyboard('{arrowDown}');
    await userEvent.keyboard('{enter}');

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    expect(onSelect).toBeCalledTimes(1);
    expect(input).toHaveFocus();
  });

  it('calls onSelect and sets focus to the input after selecting value with mouse', async () => {
    const onSelect = vi.fn();

    const { getByRole, getAllByRole, queryByRole } = setup({ onSelect });

    const input = getByRole('combobox');
    input.focus();

    await userEvent.keyboard('{arrowDown}');
    await waitFor(() => getAllByRole('option')[0].click());

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    expect(onSelect).toBeCalledTimes(1);
    expect(input).toHaveFocus();
  });

  it('moves focus to the input when any key pressed, except enter, arrow up and arrow down', async () => {
    const { getByRole } = setup();

    const input = getByRole('combobox');
    input.focus();

    await userEvent.keyboard('{arrowDown}');
    await userEvent.keyboard('c');

    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('value', 'c');
  });

  it('filters options correctly based on user inputs', () => {
    const { getByText, getByRole, queryByText } = setup({
      options: [
        { id: '1', value: 'Apple' },
        { id: '2', value: 'Banana' },
        { id: '3', value: 'Cherry' },
        { id: '4', value: 'Apricot' },
        { id: '5', value: 'Avocado' },
      ],
    });

    const input = getByRole('combobox');
    input.focus();

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    fireEvent.change(input, { target: { value: 'ap' } });
    expect(getByText('Apple')).toBeInTheDocument();
    expect(getByText('Apricot')).toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
    expect(queryByText('Cherry')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'APP' } });
    expect(getByText('Apple')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Grape' } });
    expect(queryByText('Apple')).not.toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
    expect(queryByText('Cherry')).not.toBeInTheDocument();
    expect(queryByText('Apricot')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'ap' } });
    expect(getByText('Apple')).toBeInTheDocument();
    expect(getByText('Apricot')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
    expect(queryByText('Apple')).toBeInTheDocument();
    expect(queryByText('Banana')).toBeInTheDocument();
    expect(queryByText('Cherry')).toBeInTheDocument();
    expect(queryByText('Apricot')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'a' } });
    expect(getByText('Apple')).toBeInTheDocument();
    expect(getByText('Banana')).toBeInTheDocument();
    expect(getByText('Avocado')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Ba' } });
    expect(getByText('Banana')).toBeInTheDocument();
  });

  it('updates options if options prop changes', async () => {
    const { rerender, getByRole, getByText } = setup();

    rerender(
      <Combobox
        {...defaultProps}
        options={[
          { id: '3', value: 'child-3' },
          { id: '4', value: 'child-4' },
        ]}
      />,
    );

    await waitFor(() => getByRole('combobox').click());

    expect(getByText('child-3')).toBeInTheDocument();
    expect(getByText('child-4')).toBeInTheDocument();
  });

  it('prevents default action when Enter key is pressed in the list', async () => {
    const onSubmit = vi.fn();

    const { getByRole } = render(
      <form onSubmit={onSubmit}>
        <Combobox {...defaultProps} />
      </form>,
    );

    getByRole('combobox').focus();
    await userEvent.keyboard('{arrowDown}');
    await userEvent.keyboard('{enter}');

    expect(onSubmit).not.toBeCalled();
  });

  it('calls onOpenChange when opens and closes', async () => {
    const onOpenChange = vi.fn();

    const { getByRole } = setup({ onOpenChange });

    await waitFor(() => getByRole('combobox').click());

    await userEvent.keyboard('{arrowDown}');
    expect(onOpenChange).toBeCalledWith(true);

    await userEvent.keyboard('{enter}');
    expect(onOpenChange).toBeCalledWith(false);
  });

  it('renders the popover inside the provided portal container', async () => {
    const portalContainer = document.createElement('div');
    document.body.appendChild(portalContainer);

    const { getByRole, unmount } = setup({ portalProps: { container: portalContainer } });

    fireEvent.click(getByRole('combobox'));

    await waitFor(() => {
      expect(portalContainer.querySelector('[role="listbox"]')).toBeInTheDocument();
    });

    unmount();
    portalContainer.remove();
  });

  it('renders the popover inside the native dialog when used in Dialog.Content', async () => {
    const { container, getByRole } = render(
      <Dialog.Root id="combobox-dialog">
        <Dialog.Content aria-labelledby="combobox-dialog-title">
          <Dialog.Title id="combobox-dialog-title">Dialog title</Dialog.Title>
          <Combobox {...defaultProps} />
        </Dialog.Content>
      </Dialog.Root>,
    );

    container.querySelector('dialog')?.setAttribute('open', '');
    fireEvent.click(getByRole('combobox'));

    await waitFor(() => {
      expect(container.querySelector('dialog')).toContainElement(getByRole('listbox'));
    });
  });

  it('has no accessibility violations', async () => {
    const { container } = setup({ inputProps: { 'aria-label': 'Search' } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
