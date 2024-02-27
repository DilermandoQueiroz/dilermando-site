import Navigation from "@/components/Navigation";
import Title from "@/components/Title";
import Publication from "@/components/Publication";

import { NotionAPI } from 'notion-client';

import { getBlockTitle, getPageProperty } from 'notion-utils';
import { getDateStr } from "@/lib/blog-helpers";

export async function getStaticProps({ }) {
  const notion = new NotionAPI({
      activeUser: process.env.NOTION_ACTIVE_USER,
      authToken: process.env.NOTION_TOKEN
  });
  
  const blogIndexId = process.env.BLOG_INDEX_ID || ""

  const recordMap = await notion.getPage(blogIndexId);

  const collectionQuery = recordMap.collection_query;

  const firstCollectionId = Object.keys(collectionQuery)[0];
  const firstViewId = Object.keys(collectionQuery[firstCollectionId])[0];
  const queryResults = collectionQuery[firstCollectionId][firstViewId];
  const blockIds = queryResults.collection_group_results?.blockIds || [];
  
  let posts: { id: string; title: any; author: any; date: any}[] = [];

  blockIds.forEach(async (blockId: string) => {
      const block = recordMap.block[blockId].value;
        const title = getBlockTitle(block, recordMap);
        const date = getPageProperty('Date', block, recordMap)
        const published = getPageProperty('Published', block, recordMap)
        const name = getPageProperty('Authors', block, recordMap)
        // remove - from the name
        const pageId = blockId.replace(/-/g, ''); 
        
        if(published) {
          posts.push({
            id: pageId,
            title: title,
            author: name,
            date: date,
          });
        }
  });

  return {
      props: {
          posts: posts,
          recordMap,
      },
      revalidate: 10,
  };
}

export default function Home({ posts, recordMap }: { posts: any[]; recordMap: any }) {
  return (
    <>
      <Navigation />
      <Title />
      {posts.length === 0 ? (
        <p className="w-full h-full flex justify-center items-center">There are no posts yet</p>
      ) : (
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((post: { id: string; title: string; date: string | number | Date; }) => (
            <Publication
              id={post.id}
              title={post.title}
              date={getDateStr(post.date)}
            />
          ))
      )}
    </>
  );
}
