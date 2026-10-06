export const basePath=process.env.NEXT_PUBLIC_BASE_PATH||'';
export const asset=(name:string)=>`${basePath}/images/${name}.webp`;
export const absolute=(route:string)=>`${process.env.NEXT_PUBLIC_SITE_URL||'https://hongjaang-star.github.io'}${basePath}${route}`;
