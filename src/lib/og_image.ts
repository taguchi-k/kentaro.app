const baseUrl = 'https://og-image-lake-nine.vercel.app/';

export function getOgImageUrl({
  title,
  fontSize,
}: {
  title: string;
  fontSize: number;
}): string {
  return `${baseUrl}${encodeURI(title)}.png?md=1&fontSize=${fontSize}px`;
}
