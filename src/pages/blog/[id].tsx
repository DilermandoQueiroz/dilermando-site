import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";

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
    // Fetch your list of pages from Notion or define static paths
    const paths = [{ params: { id: 'your-notion-page-id' } }]; // Replace with actual page IDs

    return {
        paths,
        fallback: 'blocking', // or true, depending on your requirement
    };
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
