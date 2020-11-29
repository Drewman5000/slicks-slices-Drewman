import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    siteMetadata: {
        title: `Slicks Slices`,
        siteUrl: `https://gatsby.pizza`,
        description: `The best pizza place in the Bay Area!`,
        twitter:'@SlicksSlices'
    },
    plugins: [
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        {
            // this is the name of the plugin youare adding
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'wppop86n',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
};