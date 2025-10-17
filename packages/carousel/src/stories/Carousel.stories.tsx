import type { Meta, StoryObj } from '@storybook/react-vite';

import Carousel from '../components/Carousel';
import { CarouselProps, RootProps } from '../types/Carousel';

// 샘플 데이터
const sampleMovies: CarouselProps[] = [
  {
    id: 1,
    rank: 1,
    image: 'https://picsum.photos/200/300?random=1',
    title: '영화 제목 1',
    description: '영화 설명 1',
    href: '/movie/1',
  },
  {
    id: 2,
    rank: 2,
    image: 'https://picsum.photos/200/300?random=2',
    title: '영화 제목 2',
    description: '영화 설명 2',
    href: '/movie/2',
  },
  {
    id: 3,
    rank: 3,
    image: 'https://picsum.photos/200/300?random=3',
    title: '영화 제목 3',
    description: '영화 설명 3',
    href: '/movie/3',
  },
  {
    id: 4,
    rank: 4,
    image: 'https://picsum.photos/200/300?random=4',
    title: '영화 제목 4',
    description: '영화 설명 4',
    href: '/movie/4',
  },
  {
    id: 5,
    rank: 5,
    image: 'https://picsum.photos/200/300?random=5',
    title: '영화 제목 5',
    description: '영화 설명 5',
    href: '/movie/5',
  },
];

const meta = {
  title: 'Components/Carousel',
  component: Carousel.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'number' },
      description: '캐러셀의 높이',
    },
    articleWidth: {
      control: { type: 'number' },
      description: '각 슬라이드의 너비',
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Carousel.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 캐러셀
export const Default: Story = {
  args: {
    height: 400,
    articleWidth: 200,
    slides: sampleMovies,
  } as RootProps,
  render: (args: RootProps) => (
    <div style={{ width: '1000px', position: 'relative' }}>
      <Carousel.Root {...args}>
        <Carousel.LeftButton />
        <Carousel.RightButton />
        <Carousel.Track articleWidth={args.articleWidth}>
          <Carousel.Article articleWidth={args.articleWidth} layout="overlay">
            {(slide) => {
              const movie = slide as CarouselProps;
              return (
                <div style={{ position: 'relative', height: '100%' }}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '10px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      color: 'white',
                    }}
                  >
                    {movie.rank && <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{movie.rank}</div>}
                    <div style={{ fontSize: '16px' }}>{movie.title}</div>
                  </div>
                </div>
              );
            }}
          </Carousel.Article>
        </Carousel.Track>
      </Carousel.Root>
    </div>
  ),
};

// Overlay 레이아웃
export const OverlayLayout: Story = {
  args: {
    height: 400,
    articleWidth: 200,
    slides: sampleMovies,
  } as RootProps,
  render: (args: RootProps) => (
    <div style={{ width: '1000px', position: 'relative' }}>
      <Carousel.Root {...args}>
        <Carousel.LeftButton />
        <Carousel.RightButton />
        <Carousel.Track articleWidth={args.articleWidth}>
          <Carousel.Article articleWidth={args.articleWidth} layout="overlay">
            {(slide) => {
              const movie = slide as CarouselProps;
              return (
                <div style={{ position: 'relative', height: '100%' }}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '10px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                    }}
                  >
                    <div>{movie.title}</div>
                  </div>
                </div>
              );
            }}
          </Carousel.Article>
        </Carousel.Track>
      </Carousel.Root>
    </div>
  ),
};

// Top 레이아웃
export const TopLayout: Story = {
  args: {
    height: 450,
    articleWidth: 200,
    slides: sampleMovies,
  } as RootProps,
  render: (args: RootProps) => (
    <div style={{ width: '1000px', position: 'relative' }}>
      <Carousel.Root {...args}>
        <Carousel.LeftButton />
        <Carousel.RightButton />
        <Carousel.Track articleWidth={args.articleWidth}>
          <Carousel.Article articleWidth={args.articleWidth} layout="top">
            {(slide) => {
              const movie = slide as CarouselProps;
              return (
                <div style={{ height: '100%' }}>
                  <div style={{ padding: '10px', background: '#f5f5f5' }}>
                    {movie.rank && <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{movie.rank}</div>}
                    <div style={{ fontSize: '14px' }}>{movie.title}</div>
                  </div>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{ width: '100%', height: 'calc(100% - 50px)', objectFit: 'cover' }}
                  />
                </div>
              );
            }}
          </Carousel.Article>
        </Carousel.Track>
      </Carousel.Root>
    </div>
  ),
};

// Left 레이아웃
export const LeftLayout: Story = {
  args: {
    height: 300,
    articleWidth: 400,
    slides: sampleMovies,
  } as RootProps,
  render: (args: RootProps) => (
    <div style={{ width: '1000px', position: 'relative' }}>
      <Carousel.Root {...args}>
        <Carousel.LeftButton />
        <Carousel.RightButton />
        <Carousel.Track articleWidth={args.articleWidth}>
          <Carousel.Article articleWidth={args.articleWidth} layout="left">
            {(slide) => {
              const movie = slide as CarouselProps;
              return (
                <div style={{ display: 'flex', height: '100%' }}>
                  <div style={{ width: '150px', flexShrink: 0 }}>
                    <img
                      src={movie.image}
                      alt={movie.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1, padding: '15px', background: '#fff', border: '1px solid #ddd' }}>
                    {movie.rank && (
                      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{movie.rank}</div>
                    )}
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{movie.title}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{movie.description}</div>
                  </div>
                </div>
              );
            }}
          </Carousel.Article>
        </Carousel.Track>
      </Carousel.Root>
    </div>
  ),
};

// None 레이아웃 (정보 없음)
export const NoneLayout: Story = {
  args: {
    height: 300,
    articleWidth: 200,
    slides: sampleMovies,
  } as unknown as RootProps,
  render: (args: RootProps) => (
    <div style={{ width: '1000px', position: 'relative' }}>
      <Carousel.Root {...args}>
        <Carousel.LeftButton />
        <Carousel.RightButton />
        <Carousel.Track articleWidth={args.articleWidth}>
          <Carousel.Article articleWidth={args.articleWidth} layout="none">
            {(slide) => {
              const movie = slide as CarouselProps;
              return (
                <div style={{ height: '100%' }}>
                  <img
                    src={movie.image}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              );
            }}
          </Carousel.Article>
        </Carousel.Track>
      </Carousel.Root>
    </div>
  ),
};

// 데이터 없는 경우
export const NoData: Story = {
  args: {
    height: 400,
    articleWidth: 200,
    slides: [],
    children: <></>,
  } as unknown as RootProps,
  render: (args: RootProps) => (
    <div style={{ width: '1000px', position: 'relative' }}>
      <Carousel.Root {...args}>
        <Carousel.LeftButton />
        <Carousel.RightButton />
        <Carousel.Track articleWidth={args.articleWidth}>
          <Carousel.Article articleWidth={args.articleWidth}>
            {(slide) => {
              const movie = slide as CarouselProps;
              return <div>{movie.title}</div>;
            }}
          </Carousel.Article>
        </Carousel.Track>
      </Carousel.Root>
    </div>
  ),
};
