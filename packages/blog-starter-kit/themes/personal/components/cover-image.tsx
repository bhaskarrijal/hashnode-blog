import Image from 'next/image';
import Link from 'next/link';

type Props = {
	title: string;
	src: string;
	slug?: string;
	priority?: boolean;
};

export const CoverImage = ({ title, src, slug, priority = false }: Props) => {
	const postURL = `/${slug}`;

	const image = (
		<div
			style={{
				width: 'full',
				height: '100%',
				// position: 'relative',
				overflow: 'hidden',
				borderRadius: '0.375rem',
			}}
		>
			<Image
				src={src}
				alt={`Cover Image for ${title}`}
				className="object-cover w-full border rounded-md hover:opacity-90 dark:border-neutral-800"
				fill
				unoptimized
				priority={priority}
			/>
		</div>
	);
	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={postURL} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
};
