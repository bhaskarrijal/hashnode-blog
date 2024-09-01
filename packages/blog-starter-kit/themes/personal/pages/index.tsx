import { addPublicationJsonLd } from '@starter-kit/utils/seo/addPublicationJsonLd';
import { getAutogeneratedPublicationOG } from '@starter-kit/utils/social/og';
import request from 'graphql-request';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { Container } from '../components/container';
import { AppProvider } from '../components/contexts/appContext';
import { Footer } from '../components/footer';
import { Layout } from '../components/layout';
import { MinimalPosts } from '../components/minimal-posts';
import { PersonalHeader } from '../components/personal-theme-header';
import {
	MorePostsByPublicationDocument,
	MorePostsByPublicationQuery,
	MorePostsByPublicationQueryVariables,
	PageInfoFragment,
	PostFragment,
	PostsByPublicationDocument,
	PostsByPublicationQuery,
	PostsByPublicationQueryVariables,
	PublicationFragment,
} from '../generated/graphql';
import { SuperMinimalPosts } from '../components/super-minimal-posts';
import Link from 'next/link';

const GQL_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT;

type Props = {
	publication: PublicationFragment;
	initialPosts: PostFragment[];
	initialPageInfo: PageInfoFragment;
};

export default function Index({ publication, initialPosts, initialPageInfo }: Props) {
	const [posts, setPosts] = useState<PostFragment[]>(initialPosts);
	const [pageInfo, setPageInfo] = useState<Props['initialPageInfo']>(initialPageInfo);
	const [loadedMore, setLoadedMore] = useState(false);

	const loadMore = async () => {
		const data = await request<MorePostsByPublicationQuery, MorePostsByPublicationQueryVariables>(
			GQL_ENDPOINT,
			MorePostsByPublicationDocument,
			{
				first: 20,
				host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
				after: pageInfo.endCursor,
			},
		);
		if (!data.publication) {
			return;
		}
		const newPosts = data.publication.posts.edges.map((edge) => edge.node);
		setPosts([...posts, ...newPosts]);
		setPageInfo(data.publication.posts.pageInfo);
		setLoadedMore(true);
	};
	return (
		<AppProvider publication={publication}>
			<Head>
				<title>{publication.title}</title>
				<meta
					name="description"
					content={
						publication.descriptionSEO || publication.title || `${publication.author.name}'s Blog`
					}
				/>
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content={publication.displayTitle || publication.title || 'Hashnode Blog Starter Kit'} />
				<meta property="twitter:description" content={publication.descriptionSEO || publication.title || `${publication.author.name}'s Blog`} />
				<meta
					property="og:image"
					content={publication.ogMetaData.image || getAutogeneratedPublicationOG(publication)}
				/>
				<meta
					property="twitter:image"
					content={publication.ogMetaData.image || getAutogeneratedPublicationOG(publication)}
				/>
				<link rel="stylesheet" href="https://hashnode-blog-bay.vercel.app/styles/index.css" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(addPublicationJsonLd(publication)),
					}}
				/>
				<style>{`
					body {
						line-height: 1.5;
						font-size: 16px;
						margin: 50px auto;
						max-width: 590px;
						padding: 0 16px;
					}
				`}</style>
			</Head>
			<div id="main" style={{ marginTop: '70px' }}>
				<header>
					<h1 style={{ fontSize: "25px", marginBottom: 0 }}>{publication.title}</h1>
					<p style={{ marginTop: 0 }}>
						thoughts, opinions, ideas and experiences
					</p>
				</header>
				<nav>
					<Link href="/">home</Link>{'/ '}
					<Link href="/blog">blog</Link>{'/ '}
					<Link href="/philosophy">philosophy</Link>{'/ '}
				</nav>
				{posts.length > 0 && <SuperMinimalPosts context="home" posts={posts} />}
				<footer>
					<details>
						<summary>social</summary>
						<nav>
							<a href="https://www.linkedin.com/in/bhaskarrijal" target="_blank" rel="noopener">linkedin</a>{'/ '}
							<a href="https://github.com/bhaskarrijal" target="_blank" rel="noopener">github</a>{'/ '}
							<a href="https://twitter.com/bhaskarijal" target="_blank" rel="noopener">twitter</a>{'/ '}
							<a href="https://orcid.org/0009-0003-6186-0397" target="_blank" rel="noopener">orcid</a>{'/ '}
							<a href="https://www.researchgate.net/profile/Bhaskar-Rijal" target="_blank" rel="noopener">researchgate</a>{'/ '}
							<a href="https://spacehey.com/sun69" target="_blank" rel="noopener">spacehey</a>{'/ '}
						</nav>
					</details>
					<p style={{ fontSize: "12px" }}>
						bhaskar rijal &copy; 1999
					</p>
				</footer>
			</div>
		</AppProvider>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const data = await request<PostsByPublicationQuery, PostsByPublicationQueryVariables>(
		GQL_ENDPOINT,
		PostsByPublicationDocument,
		{
			first: 20,
			host: process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST,
		},
	);

	const publication = data.publication;
	if (!publication) {
		return {
			notFound: true,
		};
	}
	const initialPosts = (publication.posts.edges ?? []).map((edge) => edge.node);

	return {
		props: {
			publication,
			initialPosts,
			initialPageInfo: publication.posts.pageInfo,
		},
		revalidate: 1,
	};
};
