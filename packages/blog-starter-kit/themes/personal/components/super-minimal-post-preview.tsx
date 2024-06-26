import Link from 'next/link';
import { User } from '../generated/graphql';
import { DateFormatter } from './date-formatter';

type Author = Pick<User, 'name'>;

type Props = {
    title: string;
    date: string;
    author: Author;
    slug: string;
    commentCount: number;
};

export const SuperMinimalPostPreview = ({ title, date, slug, commentCount }: Props) => {
    const postURL = `/${slug}`;

    return (
        <>
            <h2
                style={{
                    fontSize: '16px',
                    fontWeight: 500,
                }}
            >
                <DateFormatter dateString={date} />
                <Link
                    style={{
                        textDecoration: 'underline',
                        marginLeft: '10px',
                        color: '#000',
                    }}
                    href={postURL}
                >
                    {title}
                </Link>
            </h2>
        </>
    );
};
