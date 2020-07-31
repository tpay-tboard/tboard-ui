module.exports = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-storysource',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
  ],
};
