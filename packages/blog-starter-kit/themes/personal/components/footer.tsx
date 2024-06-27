import { useAppContext } from './contexts/appContext';

export const Footer = () => {
	const { publication } = useAppContext();

	return (
		<footer>
			&copy; {new Date().getFullYear()} {publication.title}
		</footer>
	);
};
