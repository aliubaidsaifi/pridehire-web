Drop real project screenshots here (e.g. modora.webp, salonflow.webp).
Then in components/Portfolio.js and app/work/page.js, replace the gradient
placeholder <div> with:

  import Image from 'next/image';
  ...
  <Image src="/work/modora.webp" alt="Modora Élan" fill sizes="(max-width:1024px) 90vw, 40vw"
         className="object-cover" />

Use .webp/.avif at ~1600px wide for crisp, fast-loading cards.
