import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '../components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부 텍스트',
    },
    icon: {
      control: 'text',
      description: '버튼 아이콘',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '버튼',
  },
};

// 아이콘이 있는 버튼
export const WithIcon: Story = {
  args: {
    icon: '🎬',
    children: '영화 보기',
  },
};

// 아이콘만 있는 버튼
export const IconOnly: Story = {
  args: {
    icon: '▶',
  },
};

// 비활성화 버튼
export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
};

// 비활성화 + 아이콘 버튼
export const DisabledWithIcon: Story = {
  args: {
    icon: '🔒',
    children: '잠김',
    disabled: true,
  },
};

// 캐러셀 네비게이션 버튼 (이전)
export const CarouselPrev: Story = {
  args: {
    children: '‹',
    className: 'slider-button slider-button-prev',
    'aria-label': '이전 슬라이드',
  },
  render: (args: any) => (
    <div style={{ position: 'relative', width: '60px', height: '60px' }}>
      <Button {...args} />
      <style>{`
        .slider-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slider-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        .slider-button-prev {
          left: 0;
        }
      `}</style>
    </div>
  ),
};

// 캐러셀 네비게이션 버튼 (다음)
export const CarouselNext: Story = {
  args: {
    children: '›',
    className: 'slider-button slider-button-next',
    'aria-label': '다음 슬라이드',
  },
  render: (args: any) => (
    <div style={{ position: 'relative', width: '60px', height: '60px' }}>
      <Button {...args} />
      <style>{`
        .slider-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slider-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        .slider-button-next {
          right: 0;
        }
      `}</style>
    </div>
  ),
};

// 커스텀 스타일 버튼
export const CustomStyle: Story = {
  args: {
    children: '커스텀 버튼',
    style: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
  },
};

// 여러 버튼 그룹
export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button
        style={{
          padding: '8px 16px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Primary
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Secondary
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Success
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Danger
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#ffc107',
          color: 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Warning
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Info
      </Button>
    </div>
  ),
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Button
        style={{
          padding: '4px 8px',
          fontSize: '12px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Small
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Medium
      </Button>
      <Button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Large
      </Button>
      <Button
        style={{
          padding: '16px 32px',
          fontSize: '18px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Extra Large
      </Button>
    </div>
  ),
};
