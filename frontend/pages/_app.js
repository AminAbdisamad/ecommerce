import Header from '../components/Header';

export default function MyApp({ component, pageprops }) {
  return (
    <Header>
      <component {...pageprops} />
    </Header>
  );
}
