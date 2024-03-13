import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { getPageProperty, getPageTitle } from 'notion-utils';
import Image from 'next/image'
import Link from 'next/link'


import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'

import { Code } from 'react-notion-x/build/third-party/code'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Modal } from 'react-notion-x/build/third-party/modal'
import { Pdf } from 'react-notion-x/build/third-party/pdf'
import Navigation from "@/components/Navigation";
import Title from "@/components/Title";
import { getDateStr } from "@/lib/blog-helpers";

export async function getStaticPaths() {
    const notion = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN
      });

  const blogIndexId = process.env.BLOG_INDEX_ID || "";
  const recordMap = await notion.getPage(blogIndexId);
  const collectionQuery = recordMap.collection_query;

  if (!collectionQuery) {
    // Trate o caso de não haver coleção ou consulta disponível
    return { paths: [], fallback: 'blocking' };
  }

  const firstCollectionId = Object.keys(collectionQuery)[0];
  const firstViewId = Object.keys(collectionQuery[firstCollectionId])[0];
  const queryResults = collectionQuery[firstCollectionId][firstViewId];
  const blockIds = queryResults.collection_group_results?.blockIds || [];

  const paths = await Promise.all(blockIds.map(async (blockId) => {
    const block = recordMap.block[blockId]?.value;
    if (!block) {
      return null;
    }
    const published = getPageProperty('Published', block, recordMap);

    if (published) {
      // Aqui presumimos que 'Published' é um booleano indicando se o post deve ser gerado
      const pageId = blockId.replace(/-/g, ''); // Removendo os hifens para normalizar o ID
      return {
        params: { id: pageId },
      };
    }

    return null;
  }));

  // Filtrar quaisquer valores nulos que possam ter sido retornados
  return { paths: paths.filter(Boolean), fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: any }) {
  const { id } = params;

  const notion = new NotionAPI({
      activeUser: process.env.NOTION_ACTIVE_USER,
      authToken: process.env.NOTION_TOKEN
  });

  const recordMap = await notion.getPage(id);
  const title = getPageTitle(recordMap);

  const blogIndexId = process.env.BLOG_INDEX_ID || ""
  const recordMapTable = await notion.getPage(blogIndexId);
  const collectionQuery = recordMapTable.collection_query;
  const firstCollectionId = Object.keys(collectionQuery)[0];
  const firstViewId = Object.keys(collectionQuery[firstCollectionId])[0];
  const queryResults = collectionQuery[firstCollectionId][firstViewId];
  const blockIds = queryResults.collection_group_results?.blockIds || [];

  let authors = '';
  let date = '';
  let paperLink = '';

  for (const blockId of blockIds) {
    const block = recordMapTable.block[blockId]?.value;
    const pageId = blockId.replace(/-/g, '');

    if (pageId === id) {
      authors = getPageProperty('Authors', block, recordMapTable);
      date = getPageProperty('Date', block, recordMapTable);
      paperLink = getPageProperty('PaperLink', block, recordMapTable);
      break;
    }
  }

  return {
    props: {
      recordMap: recordMap,
      title: title,
      authors: authors,
      date: date,
      paperLink: paperLink
    },
    revalidate: 10,
  }
}


export default function NotionPage({ recordMap, title, authors, date, paperLink }: { recordMap: any; title: string, authors: string, date: string, paperLink: string}) {
    return (
        <>
        <Navigation/>
        <Title title={title} authors={authors} date={getDateStr(date)} paperLink={paperLink}/>
        <div className="text-justify">
          <NotionRenderer 
          recordMap={recordMap}
          fullPage={false}
          darkMode={false}
          disableHeader={true}
          components={{
            nextImage: Image,
            nextLink: Link
          }}/>
        </div>
        </>
    );
}
