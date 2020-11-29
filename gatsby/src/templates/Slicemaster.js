import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function SlicemasterPage({ data: { person } }) {
    return (
      <>
      <SEO title={person.name} image={person.image.asset.src}/>
      <div className="center">
        <Img fluid={person.image.asset.fluid} />
        <div>
            <h2 className="mark">{person.name}</h2>
            <p>
                {person.description}
            </p>
        </div>
      </div>
      </>
    )};

//This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
    query($slug: String!) {
        person: sanityPerson(slug: {current: {eq: $slug}}) {
    slug {
      current
    }
    name
    id
    description
    image {
      asset {
        fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
        }
      }
    }
  }
}
`;