import Image from 'next/image';
import Link from './Link';
import { RoughNotation } from 'react-rough-notation';
import { useRandomColorPair } from '@/lib/hooks/useRandomColorPair';

function Card({
  title,
  shortDescription,
  banner,
  href,
  repository,
  deployment,
}): React.ReactElement {
  const image = (
    <Image
      alt={title}
      src={banner}
      className='object-cover object-center md:h-36 lg:h-48'
      width={700}
      height={306}
    />
  );
  const [repositoryColor, demoColor] = useRandomColorPair();
  return (
    <div className='md p-4 md:w-1/2' style={{ maxWidth: '544px' }}>
      <div
        className={`${
          banner && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-100 border-opacity-60 dark:border-gray-800`}
      >
        {banner &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {image}
            </Link>
          ) : (
            image
          ))}
        <div className='p-6'>
          <h2 className='mb-3 text-2xl font-bold leading-8 tracking-tight'>
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className='prose mb-3 line-clamp-2 max-w-none text-gray-500 dark:text-gray-400'>
            {shortDescription}
          </p>
          <div className='flex items-center justify-center gap-20'>
            {deployment && (
              <a
                className='!font-normal !text-black !no-underline dark:!text-white'
                href={deployment}
                target='_blank'
                rel='noreferrer'
              >
                <RoughNotation
                  show
                  type='box'
                  animationDelay={250}
                  animationDuration={2000}
                  strokeWidth={2}
                  color={demoColor}
                >
                  Demo
                </RoughNotation>
              </a>
            )}

            {repository && (
              <a
                className='!font-normal !text-black !no-underline dark:!text-white'
                href={repository}
                target='_blank'
                rel='noreferrer'
              >
                <RoughNotation
                  show
                  type='box'
                  animationDelay={250}
                  animationDuration={2000}
                  strokeWidth={2}
                  color={repositoryColor}
                >
                  Source
                </RoughNotation>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
