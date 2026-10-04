import Image from "next/image";
import { assetPath } from "@/lib/config";

export default function EditorialBackdrop({ src }: { src: string }) {
  return (
    <div className="editorial-backdrop" aria-hidden="true">
      <Image src={assetPath(src)} alt="" fill sizes="100vw" preload className="editorial-backdrop-image" />
    </div>
  );
}
