import Link from 'next/link';
import { PostFragment } from '../generated/graphql';

type Props = {
    context: string;
    posts: PostFragment[];
};

export function SuperMinimalPosts({ context, posts }: Props) {
    return (
        <div style={{ paddingBottom: '1em' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id}>
                            <td
                                style={{
                                    paddingRight: '20px',
                                    whiteSpace: 'nowrap',
                                    verticalAlign: 'top',
                                    paddingTop: index === 0 ? '1em' : '0',
                                    width: '1%',
                                }}
                            >
                                [{new Date(post.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}]
                            </td>
                            <td style={{ paddingTop: index === 0 ? '1em' : '0' }}>
                                <Link href={`/blog/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
