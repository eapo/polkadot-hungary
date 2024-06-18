import { gql } from '@apollo/client';
import { allSpaces } from '../../whitelist';
import { filterIds, spaceData } from '../utils';
import { graphqlQuery } from '../query';

export const polkadotPageQuery = async () => {
   return await graphqlQuery({
      query: gql`
         ${showPolkadotFeed()}
      `,
   });
};

export function showPolkadotFeed(): string {
   const spaceFilter = filterIds(allSpaces);
   return `query MyQuery {
      posts(
         where: {
            OR: [
               { tagsOriginal_contains: "Polkadot" },
               { title_contains: "Polkadot" }
            ],
            AND: [
               { space_in: [${spaceFilter}] },
               { kind_eq: RegularPost },
               { hidden_eq: false }
            ]
         },
         orderBy: createdAtTime_DESC
      ) {
         ${spaceData()}
      }
   }`;
}
