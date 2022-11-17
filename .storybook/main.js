module.exports = {
    stories: ['../**/*.stories.@(js|ts)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/html',
    core: {
        builder: '@storybook/builder-webpack5',
    },
};
