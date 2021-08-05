import Link from 'next/link';
import Nav from './Nav';
export default function Header() {
  return (
    <div>
      <header>Header Here</header>
      <div className="bar">
        <Link href="/">
          <a>logo</a>
        </Link>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </div>
  );
}
