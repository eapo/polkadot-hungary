import type { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Nav from '../../components/Nav'
import { SimpleGrid, Heading, Box, Text, Grid, GridItem, Image } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import CardComponent, { ITcard } from '../../components/CardBlog';
import { useRouter } from 'next/router';

export interface post {
  id: string;
  createdAtTime:number;
  image: string;
  title: string;
  downvotesCount: number;
  summary: string;
  tagsOriginal: string;
}

export async function getStaticProps(context: { params: any; }) {
  const client = new ApolloClient({
    uri: 'https://squid.subsquid.io/subsocial/graphql',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query MyQuery {
        posts(where: {tagsOriginal_contains: "Parachain", AND: {space: {id_eq: "7218"}}}) {
          id
          createdAtTime
          image
          title
          downvotesCount
          summary
          tagsOriginal
          ownedByAccount {
            id
            profileSpace {
              name
            }
          }
        }
      }
    `
  });

  return {
    props: {
      posts: data.posts
    }
  }
}

function Parachain({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  let router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Head>
        <title>Scopri i topic</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <SimpleGrid px={30} py={20}>
          <Box>
            <Heading as='h1' size={{base: '2xl', md: '4xl'}}>Parachain</Heading>
            <Text>Page in working in progres</Text>
          </Box>
        </SimpleGrid>

        <Grid
         h='200px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(12, 1fr)'
          gap={4} p={30}
        >
          <GridItem colSpan={{base: 12, md: 3}} rowSpan={{base: 1, md: 2}} borderTop='1px' borderColor='gray.200' pt={6}>
              <Box pb={6}>
                <Heading as='h2' fontSize='l' pb={6}>Link Ufficiali</Heading>
                <Text>Coming soon</Text>            
              </Box>
          </GridItem>
          <GridItem colSpan={{base: 12, md: 6}} borderTop='1px' borderColor='gray.200' pt={6}>
            <Heading as='h2' fontSize='l' pb={6}>About Dotsama</Heading>
            <Text>Coming soon</Text>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio minus nam odio cupiditate quam maiores optio deleniti! Quisquam id sapiente cumque non expedita asperiores, voluptatibus itaque reiciendis, illo, repellendus similique.</Text>
          </GridItem>
          <GridItem colSpan={{base: 12, md: 3}} borderTop='1px' borderColor='gray.200' pt={6}>
            <Heading as='h2' fontSize='l' pb={6}>Highlight</Heading>
            <Text>Coming soon</Text>
            <Image boxSize='350px' objectFit='cover' src='/adv_placeholder.jpg' alt='adv'/>
          </GridItem>
          <GridItem colSpan={{base: 12, md: 9}} borderTop='1px' borderColor='gray.200' pt={6}>
          <Heading as='h2' fontSize='l' pb={6}>Tutte le news</Heading>
            <SimpleGrid columns={{base: 1, md: 3}} spacing={6}>
              {posts &&
                (posts as post[]).map((post: JSX.IntrinsicAttributes & ITcard) => 
                <CardComponent {...post} key={post.id}/>                       
              )}
            </SimpleGrid>
          </GridItem>
        </Grid>
    </div>
  )
}

export default Parachain