import Link from 'next/link';
import OBMLogo from './OBMLogo';
import { GlobalData } from '../../lib/types';
import PngLogo from "./alivemachineslogo.png";

export default function SiteLogo({
  siteData,
}: {
  siteData: GlobalData;
}): JSX.Element {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between px-4 py-4 md:flex-row lg:px-0">
      <h1 className="flex space-x-2" style={{
        alignItems: 'center'
      }}>
        <img src={PngLogo.src} style={{
          width: 50
        }} />
        <Link
          href="/"
          className="bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tighter text-zinc-500 dark:text-zinc-200"
          style={{
            fontWeight: 200,
            letterSpacing: 0.3
          }}
        >
          {siteData.metadata.site_title}
        </Link>
      </h1>
      <span className="relative hidden text-lg tracking-wide text-zinc-500 dark:text-zinc-200 md:flex">
        {siteData.metadata.site_tag}
      </span>
    </div>
  );
}
