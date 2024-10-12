import Image from 'next/image'

export default function Acknowledgement() {
  const items = [
    {
      alt: 'Microsoft Partner',
      height: 553,
      img: '/Finalist-Logo.png',
      text: 'Evenica is honoured to be named a finalist for the Dynamics 365 Commerce 2022 Microsoft Partner of the Year Award. This award recognizes partners that excel at providing innovative and unique customer solutions centered on Microsoft Dynamics 365 Commerce.',
      title: 'Partner of the Year Finalist',
      width: 1321,
    },
    {
      alt: 'Deloitte Fast 50',
      height: 515,
      img: '/Deloitte.png',
      text: 'Evenica was presented the Deloitte Technology Fast 50TM program award in 2020 for our rapid revenue growth, entrepreneurial spirit and bold innovation. The program recognizes technology companies with the highest revenue-growth percentage over the past four years. Evenica earned this recognition with 420% revenue growth from 2016 and 2019.',
      title: 'Recognized For Our Rapid Growth',
      width: 1590,
    },
  ] as const
  return (
    <section className="mb-20 grid gap-12 md:grid-cols-2">
      {items.map(({ alt, height, img, text, title, width }) => (
        <div key={title}>
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{text}</p>
          <Image
            alt={alt}
            className="w-2/3 rounded bg-white object-cover shadow"
            height={height}
            src={img}
            width={width}
          />
        </div>
      ))}
    </section>
  )
}
