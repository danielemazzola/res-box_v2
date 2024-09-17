export const getRandomBackgroundColor = () => {
  const colors = [
    'var(--br-bg-boxes-1)',
    'var(--br-bg-boxes-2)',
    'var(--br-bg-boxes-3)',
    'var(--br-bg-boxes-4)',
    'var(--br-bg-boxes-5)',
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return randomColor;
};