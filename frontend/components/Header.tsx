import Link from 'next/link';

export default function Header() {
  return (
    <div>
      <header>Header Here</header>
      <div className="bar">
        <Link href="/">
          <a>logo</a>
        </Link>
      </div>
      <div className="sub-bar"></div>
    </div>
  );
}
