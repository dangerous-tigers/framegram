import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea } from './ScrollArea';

const meta = {
  title: 'shared/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: { type: 'object' },
      description: 'OverlayScrollbars options',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class name',
    },
    style: {
      control: { type: 'object' },
      description: 'Inline styles',
    },
    onScroll: {
      action: 'scrolled',
      description: 'Callback fired when scrolling',
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <div
        style={{
          width: '300%',
          height: '200%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            <svg
              width='250'
              height='230'
              viewBox='-11.5 -10.23174 23 20.46348'
              style={{ margin: '20px', color: '#61DAFB' }}
            >
              <circle
                cx='0'
                cy='0'
                r='2.05'
                fill='currentColor'
              />
              <g
                stroke='currentColor'
                strokeWidth='1'
                fill='none'
              >
                <ellipse
                  rx='11'
                  ry='4.2'
                />
                <ellipse
                  rx='11'
                  ry='4.2'
                  transform='rotate(60)'
                />
                <ellipse
                  rx='11'
                  ry='4.2'
                  transform='rotate(120)'
                />
              </g>
            </svg>
            <h2 style={{ color: '#20acecff', margin: '10px' }}>React Logo</h2>
          </div>
          <p style={{ color: '#2197dbff', margin: '10px', textAlign: 'center' }}>
            This is a scrollable area with React logo
          </p>
          <div style={{ display: 'flex', width: '400%', marginTop: '20px' }}>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  margin: '0 10px',
                  color: '#aaa',
                  border: '1px solid #555',
                  minWidth: '150px',
                }}
              >
                Horizontal content {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    style: { width: '900px', height: '400px', border: '1px solid #444' },
  },
};

export const WithCustomOptions: Story = {
  args: {
    children: (
      <div style={{ width: '300%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            <svg
              width='200'
              height='180'
              viewBox='-11.5 -10.23174 23 20.46348'
              style={{ margin: '20px', color: '#61DAFB' }}
            >
              <circle
                cx='0'
                cy='0'
                r='2.05'
                fill='currentColor'
              />
              <g
                stroke='currentColor'
                strokeWidth='1'
                fill='none'
              >
                <ellipse
                  rx='11'
                  ry='4.2'
                />
                <ellipse
                  rx='11'
                  ry='4.2'
                  transform='rotate(60)'
                />
                <ellipse
                  rx='11'
                  ry='4.2'
                  transform='rotate(120)'
                />
              </g>
            </svg>
            <h3 style={{ color: '#218fe9ff', margin: '10px' }}>React Components</h3>
          </div>
          <div style={{ display: 'flex', width: '350%', marginTop: '20px' }}>
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                style={{
                  padding: '15px',
                  margin: '0 10px',
                  background: '#6b6767ff',
                  borderRadius: '4px',
                  minWidth: '200px',
                  textAlign: 'center',
                }}
              >
                Component {index + 1}
              </div>
            ))}
          </div>
          <div style={{ padding: '20px', color: '#999', width: '100%', textAlign: 'center' }}>
            End of scrollable content
          </div>
        </div>
      </div>
    ),
    options: {
      scrollbars: {
        autoHide: 'move',
        autoHideDelay: 800,
        dragScroll: true,
        clickScroll: true,
      },
    },
    style: { width: '700px', height: '500px', border: '1px solid #444', padding: '10px' },
  },
};
