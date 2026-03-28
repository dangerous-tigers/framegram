import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Modal } from './BaseModal';

describe('Modal', () => {
  it('render children when open', () => {
    render(
      <Modal open>
        <div>Modal content</div>
      </Modal>,
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders header and content', () => {
    render(
      <Modal
        open
        header='Modal header'
      >
        <div>Content</div>
      </Modal>,
    );

    expect(screen.getByText('Modal header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
  it('renders devider', () => {
    render(
      <Modal
        open
        header='Modal header'
        showDivider={true}
      >
        <div>Content</div>
      </Modal>,
    );

    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });
  it('renders divider', () => {
    render(
      <Modal
        open
        header='Modal header'
        showDivider={true}
      >
        <div>Content</div>
      </Modal>,
    );

    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });
  it('renders not divider', () => {
    render(
      <Modal
        open
        header='Modal header'
        showDivider={false}
      >
        <div>Content</div>
      </Modal>,
    );

    expect(screen.queryByTestId('divider')).toBeNull();
  });
});
