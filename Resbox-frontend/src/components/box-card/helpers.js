export const getRandomBackgroundColor = () => {
  const colors = [
    'var(--rb-bg-secondary)',
    'var(--rb-bg-tertiary)',
    'var(--rb-bg-card-img)',
    'var(--rb-bg-green)',
    'var(--rb-bg-options)',
    'var(--rb-bg-light)'
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return randomColor;
};