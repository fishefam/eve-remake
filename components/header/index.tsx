import Nav from './nav'

export default async function Header() {
  return (
    <header className="top-0 z-[2] py-6 transition-all duration-200">
      <Nav />
    </header>
  )
}
