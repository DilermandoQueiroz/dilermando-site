import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { getPageProperty } from 'notion-utils';

import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'katex/dist/katex.min.css'

import { Code } from 'react-notion-x/build/third-party/code'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Modal } from 'react-notion-x/build/third-party/modal'
import { Pdf } from 'react-notion-x/build/third-party/pdf'
import Navigation from "@/components/Navigation";

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

    return {
        props: {
            recordMap: recordMap,
        },
        revalidate: 10,
    }
}

export default function NotionPage({ recordMap }: { recordMap: any }) {
    return (
        <>
        <Navigation/>
        <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} disableHeader={true} />
        </>
    );
}
