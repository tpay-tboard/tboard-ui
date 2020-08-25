module.exports = {
  stories: ['../packages/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-storysource',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
    '@storybook/addon-docs',
  ],
};
