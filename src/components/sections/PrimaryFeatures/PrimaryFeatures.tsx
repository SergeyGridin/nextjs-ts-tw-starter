import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import ExportedImage from 'next-image-export-optimizer';
import { useEffect, useState } from 'react';

import { Container } from '@/components/elements';

const features = [
  {
    title: 'Payroll',
    description:
      "Keep track of everyone's salaries and whether or not they've been paid. Direct deposit not supported.",
    image:
      'https://salient.tailwindui.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpayroll.517af4e7.png&w=2048&q=75',
  },
  {
    title: 'Claim expenses',
    description:
      "All of your receipts organized into one place, as long as you don't mind typing in the data by hand.",
    image: '/assets/images/screenshots/expenses.png',
  },
  {
    title: 'VAT handling',
    description:
      "We only sell our software to companies who don't deal with VAT at all, so technically we do all the VAT stuff they need.",
    image: '/assets/images/screenshots/vat-returns.png',
  },
  {
    title: 'Reporting',
    description:
      'Easily export your data into an Excel spreadsheet where you can do whatever the hell you want with it.',
    image: '/assets/images/screenshots/reporting.png',
  },
];

export function PrimaryFeatures() {
  const [tabOrientation, setTabOrientation] = useState('horizontal');

  useEffect(() => {
    const lgMediaQuery = window.matchMedia('(min-width: 1024px)');

    function onMediaQueryChange({
      matches,
    }: {
      matches: MediaQueryListEvent['matches'];
    }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal');
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener('change', onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32"
    >
      <div className="absolute top-1/2 left-1/2 translate-x-[-44%] translate-y-[-42%]">
        <ExportedImage
          src={'assets/images/background-features.jpg'}
          alt=""
          width={2245}
          height={1636}
          layout="fixed"
        />
      </div>
      <Container className="relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2
            id="features-title"
            className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Everything you need to run your books.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Well everything you need if you aren’t that picky about minor
            details like tax compliance.
          </p>
        </div>
        <Tab.Group
          as="div"
          className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
                <Tab.List className="relative z-10 flex space-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:space-y-1 lg:space-x-0 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <Tab
                      className={clsx(
                        '[&:not(:focus-visible)]:focus:outline-none font-display text-lg',
                        {
                          'text-blue-600 lg:text-white':
                            selectedIndex === featureIndex,
                          'text-blue-100 hover:text-white lg:text-white':
                            selectedIndex !== featureIndex,
                        }
                      )}
                      key={feature.title}
                      as="div"
                    >
                      <div
                        className={clsx(
                          'group relative rounded-full py-1 px-4 lg:rounded-r-none lg:rounded-l-xl lg:p-6',
                          {
                            'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10':
                              selectedIndex === featureIndex,
                            'hover:bg-white/10 lg:hover:bg-white/5':
                              selectedIndex !== featureIndex,
                          }
                        )}
                      >
                        <h3>
                          <span className="absolute inset-0 rounded-full lg:rounded-r-none lg:rounded-l-xl" />
                          {feature.title}
                        </h3>
                        <p
                          className={clsx('mt-2 hidden text-sm lg:block', {
                            'text-white': selectedIndex === featureIndex,
                            'text-blue-100 group-hover:text-white':
                              selectedIndex !== featureIndex,
                          })}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="lg:col-span-7">
                {features.map((feature) => (
                  <Tab.Panel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 top-[6.5rem] bottom-[4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                        {feature.description}
                      </p>
                    </div>
                    <div className="relative mt-10 aspect-[1085/730] w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                      <ExportedImage
                        src={feature.image}
                        alt=""
                        layout="fill"
                        priority
                        sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                      />
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
