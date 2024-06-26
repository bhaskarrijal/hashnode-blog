import { PostFragment } from '../generated/graphql';
import { SuperMinimalPostPreview } from './super-minimal-post-preview';

type Props = {
    posts: PostFragment[];
    context: 'home' | 'series' | 'tag';
};

export const SuperMinimalPosts = ({ posts }: Props) => {
    return (
        <>
            {posts.map((post) => (
                <SuperMinimalPostPreview
                    key={post.id}
                    title={post.title}
                    date={post.publishedAt}
                    author={{
                        name: post.author.name,
                    }}
                    slug={'/blog/' + post.slug}
                    commentCount={post.comments?.totalDocuments}
                />
            ))}
        </>
    );
};
